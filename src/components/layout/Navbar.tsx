import { Button } from "../ui/button";
import {
  AccountBookOutlined,
  AppstoreOutlined,
  HomeFilled,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import sedan from "../../assets/sedan.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logOut, useCurentToken } from "@/redux/auth/authSlice";
import { useEffect, useState } from "react";
import { varifyToken } from "@/utils/verifyToken";
import { Menu, MenuProps } from "antd";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurentToken);
  const user = token ? varifyToken(token) : null;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogIn = () => {
    navigate("/login");
  };

  const handleLogOut = () => {
    dispatch(logOut());
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const items: MenuProps["items"] = [
    {
      key: "home",
      icon: <HomeFilled></HomeFilled>,
      label: <NavLink to="/">Home</NavLink>,
    },
    {
      key: "allCars",
      icon: <AppstoreOutlined />,
      label: <NavLink to="/all-cars">All Cars</NavLink>,
    },
    {
      key: "about",
      icon: <AccountBookOutlined></AccountBookOutlined>,
      label: <NavLink to="/about">About</NavLink>,
    },
    {
      key: "dashboard",
      icon: <AccountBookOutlined></AccountBookOutlined>,
      label: <NavLink to={`/${user?.role}/dashboard`}>Dashboard</NavLink>,
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("Menu clicked:", e);
  };

  return (
    <div className="bg-colorsa-background">
      <div className="flex flex-col md:flex-row  lg:flex-row justify-between items-center container mx-auto p-4">
      <NavLink to={"/"}>
      <div className="flex items-center gap-2">
          <img src={sedan} alt="logo" className="h-10 w-10" />
          <p className="text-2xl font-bold text-colorsa-text">
            <span className="text-colorsa-primary">CAR</span>SPOT
          </p>
        </div>
      </NavLink>

        {/* AntD Menu */}
        <Menu
          onClick={onClick}
          className="md:w-[200px] lg:w-[400px] lg:my-0 my-5 "
          mode="horizontal"
          items={items}
          overflowedIndicator={<AppstoreOutlined />}
        />

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
              className="bg-colorsa-primary hover:bg-colorsa-background text-colorsa-text"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
