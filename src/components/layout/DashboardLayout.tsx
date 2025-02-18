import { Outlet } from "react-router";
import SideVar from "../components/sidebar/SideVar";
import Navbar from "./Navbar";

const DashboardLayout = () => {
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div>
        <div className="flex">
          <SideVar></SideVar>
         <div className="flex-1 ">
         <Outlet></Outlet>
         </div>
        </div>
    
      </div>
    </div>
  );
};

export default DashboardLayout;
