import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "@/pages/Footer";



const MainLayout = () => {
  return (
    // <div className="bg-colorsa-background">
    //   {/* ✅ Navbar always stays */}
    //   <Navbar />

    //   {/* ✅ Show only on Home Page */}
    //   {location.pathname === "/" && (
    //     <>
    //       <div className="w-full h-[90vh]">
    //         <Carousel slides={SLIDES} options={OPTIONS} />
    //       </div>
    //       <div className="mt-20">
    //         <Featured />
    //       </div>
    //       <div className="w-full mt-20">
    //         <Dealership />
    //       </div>
    //     </>
    //   )}

    //   {/* ✅ Dynamic Pages like "All Cars" */}
    //   <div className="container mx-auto mt-10">
    //     <Outlet />
    //   </div>
    // </div>
    <div>
      <div className="bg-colorsa-background">
        <Navbar></Navbar>
      </div >
      <div className="bg-colorsa-background">
      <Outlet></Outlet>
      </div>
      
      <div className="bg-colorsa-background">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default MainLayout;
