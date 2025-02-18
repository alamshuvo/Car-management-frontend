import { Outlet } from "react-router";
import Carousel from "../components/carosul/Carosul";
import { EmblaOptionsType } from "embla-carousel";
import Dealership from "../components/carDealership/Dealership";


const OPTIONS: EmblaOptionsType = { loop: true, duration: 30 };

const SLIDES = [
    "https://carspot.scriptsbundle.com/car-dealer-wordpress-theme/images/banner-5.jpg",
    "https://carspot.scriptsbundle.com/car-dealer-wordpress-theme/images/hero-image.jpg",
    "https://carz.ancorathemes.com/wp-content/uploads/2024/07/image-59-1290x725.jpg",
    "https://carz.ancorathemes.com/wp-content/uploads/2024/08/slider-6-slide-1.jpg",
    "https://carz.ancorathemes.com/wp-content/uploads/2024/08/slider-6-slide-2.jpg"
  ];
const MainLayout = () => {
 
  return (
    <div className="bg-colorsa-background">
      <div>
        <div className="w-full h-[100vh]">
          <Carousel slides={SLIDES} options={OPTIONS}></Carousel>
        </div>
        <div className="w-full">
            <Dealership></Dealership>
        </div>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;
