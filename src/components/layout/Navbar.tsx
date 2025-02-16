import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import sedan from "../../assets/sedan.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hook";
import { logOut } from "@/redux/auth/authSlice";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  const dispatch = useAppDispatch();
  
  const navigate = useNavigate();
  const handleLogIn = () => {
    navigate("/login")
  };
  useEffect(()=>{
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token)

  },[])
  const handleLogOut = () => {
    dispatch(logOut());
    localStorage.removeItem("token")
    setIsLoggedIn(false)
  };
  return (
    <div className="flex justify-between items-center   p-5 ">
      <div className="flex items-center gap-2">
        <img src={sedan} alt="kk" className="h-10 w-10" />
        <p className="text-2xl font-bold text-[#38d8a9] ">
          <span className="text-[#e1657d]">CAR</span>SPOT
        </p>
      </div>

      <NavigationMenu>
        <NavigationMenuList>
        <NavigationMenuItem>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#e1657d] text-white px-4 py-2 rounded-md" 
                  : "bg-[#38d8a9] text-black px-4 py-2 rounded-md" 
              }
            >
              Home
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavLink
              to="/car"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#e1657d] text-white px-4 py-2 rounded-md" 
                  : "bg-[#38d8a9] text-black px-4 py-2 rounded-md" 
              }
            >
              All Car
            </NavLink>
          </NavigationMenuItem>
           <NavigationMenuItem>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#e1657d] text-white px-4 py-2 rounded-md" 
                  : "bg-[#38d8a9] text-black px-4 py-2 rounded-md" 
              }
            >
              About
            </NavLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div>
        {isLoggedIn ? (
          <Button onClick={handleLogOut} className="bg-red-500 text-white">
            Logout
          </Button>
        ) : (
          <Button onClick={handleLogIn} className="bg-[#38d8a9] text-black">
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
