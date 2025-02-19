import Dealership from "./components/components/carDealership/Dealership";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "./components/components/carosul/Carosul";
import Featured from "./components/components/Featured/Featured";

const App = () => {
  const OPTIONS: EmblaOptionsType = { loop: true, duration: 30 };

  const SLIDES = [
    "https://carspot.scriptsbundle.com/car-dealer-wordpress-theme/images/banner-5.jpg",
    "https://carspot.scriptsbundle.com/car-dealer-wordpress-theme/images/hero-image.jpg",
    "https://carz.ancorathemes.com/wp-content/uploads/2024/07/image-59-1290x725.jpg",
    "https://carz.ancorathemes.com/wp-content/uploads/2024/08/slider-6-slide-1.jpg",
    "https://carz.ancorathemes.com/wp-content/uploads/2024/08/slider-6-slide-2.jpg",
  ];
  return (
    <div className="bg-colorsa-background">

      <div className="container mx-auto">
        <div className="w-full  h-[90vh]">
          <EmblaCarousel slides={SLIDES} options={OPTIONS}></EmblaCarousel>
        </div>
        <div className="mt-20">
          <Featured></Featured>
        </div>
        <div className="w-full mt-20">
          <Dealership></Dealership>
        </div>
      </div>
    </div>
  );
};

export default App;
