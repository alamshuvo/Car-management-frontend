import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import sedan from "../../assets/sedan.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logOut, useCurentToken } from "@/redux/auth/authSlice";
import { useEffect, useState } from "react";
import { varifyToken } from "@/utils/verifyToken";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurentToken);
  let user;
  if (token) {
    user = varifyToken(token);
  }
  console.log(user);
  const navigate = useNavigate();
  const handleLogIn = () => {
    navigate("/login");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
  const handleLogOut = () => {
    dispatch(logOut());
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  return (
    <div className="flex justify-between items-center bg-colorsa-background  p-5 ">
      <div className="flex items-center gap-2">
        <img src={sedan} alt="kk" className="h-10 w-10" />
        <p className="text-2xl font-bold text-colorsa-text ">
          <span className="text-colorsa-primary">CAR</span>SPOT
        </p>
      </div>

      <NavigationMenu>
        <NavigationMenuList className="flex gap-4">
          <NavigationMenuItem>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-colorsa-secondary text-colorsa-text px-4 py-2 rounded-md"
                  : "bg-colorsa-primary text-colorsa-text px-4 py-2 rounded-md"
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
                  ? "bg-colorsa-secondary text-colorsa-text px-4 py-2 rounded-md"
                  : "bg-colorsa-primary text-colorsa-text px-4 py-2 rounded-md"
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
                  ? "bg-colorsa-secondary text-colorsa-text px-4 py-2 rounded-md"
                  : "bg-colorsa-primary text-colorsa-text px-4 py-2 rounded-md"
              }
            >
              About
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            {isLoggedIn ? (
              <NavLink
                to={`/${user?.role}/dashboard`}
                className={({ isActive }) =>
                  isActive
                    ? "bg-colorsa-secondary text-colorsa-text px-4 py-2 rounded-md"
                    : "bg-colorsa-primary text-colorsa-text px-4 py-2 rounded-md"
                }
              >
                Dahsboard
              </NavLink>
            ) : (
              ""
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div>
        {isLoggedIn ? (
          <Button
            onClick={handleLogOut}
            className="bg-colorsa-accent text-white"
          >
            Logout
          </Button>
        ) : (
          <Button
            onClick={handleLogIn}
            className="bg-colorsa-primary  hover:bg-colorsa-background text-colorsa-text"
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
