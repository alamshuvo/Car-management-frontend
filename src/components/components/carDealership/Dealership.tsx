import { Separator } from "@/components/ui/separator";
import dealer from "./dealrimg/dealership.png";
import engine from "./dealrimg/engineering.png";
import security from "./dealrimg/encrypted.png";
import d from "./dealrimg/weakness.png";
const Dealership = () => {
  return (
    <div className=" p-4">
      <div className="flex lg:flex-row flex-col justify-between ">
        <div className="lg:w-[50%] space-y-4">
          <h1 className="text-3xl text-colorsa-text lg:text-start text-center">
            About <span className="text-colorsa-primary">Car Spot</span>{" "}
            Dealership
          </h1>
          <Separator className="mt-4  mb-4 font-bold "></Separator>
          <h2 className="text-2xl justify text-colorsa-text">
            Everything you need to build an amazing dealership automotive
            responsive website
          </h2>
          <p className="text-xl text-colorsa-text">
            Carspot is not only a hub where buyers and sellers can interact, it
            is also a comprehensive automotive portal with a forum dedicated to
            all automotive discussions, a blog that keeps the users up to date
            with the latest happenings in the automotive industry.
          </p>
        </div>
        <div className="lg:w-[50%]">
          <img
            src="https://carspot.scriptsbundle.com/wp-content/uploads/2017/06/gtr.png"
            alt="car"
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        <div className="flex justify-start items-start flex-col my-5 space-y-3 hover:border-2 hover:translate-5 hover:cursor-pointer transition-all duration-300 ease-in-out p-2">
          <img
            src={dealer}
            alt=""
            className="w-20 transition-all duration-300 ease-in-out"
          />
          <p className="text-2xl text-colorsa-text hover:text-colorsa-primary transition-colors duration-300 ease-in-out">
            Dealership
          </p>
          <p className="text-colorsa-text transition-all duration-300 ease-in-out">
            We have the right caring, experience <br /> and dedicated
            professional for you.
          </p>
        </div>
        <div className="flex justify-start items-start flex-col my-5 space-y-3 hover:border-2 hover:translate-5 hover:cursor-pointer transition-all duration-300 ease-in-out p-2">
          <img src={engine} alt="" className="w-20 transition-all duration-300 ease-in-out"/>
          <p className="text-2xl text-colorsa-text hover:text-colorsa-primary transition-colors duration-300 ease-in-out">Engine Upgrade</p>
          <p className="">
            We have the right caring, experience and dedicated professional for
            you.
          </p>
        </div>
        <div className="flex justify-start items-start flex-col my-5 space-y-3 hover:border-2 hover:translate-5 hover:cursor-pointer transition-all duration-300 ease-in-out p-2">
          <img src={security} alt="" className="w-20 transition-all duration-300 ease-in-out"/>
          <p className="text-2xl text-colorsa-text hover:text-colorsa-primary transition-colors duration-300 ease-in-out">Secirity inspaction</p>
          <p className="">
            We have the right caring, experience <br /> and dedicated
            professional for you.
          </p>
        </div>
        <div className="flex justify-start items-start flex-col my-5 space-y-3 hover:border-2 hover:translate-5 hover:cursor-pointer transition-all duration-300 ease-in-out p-2">
          <img src={d} alt=""className="w-20 transition-all duration-300 ease-in-out" />
          <p className="text-2xl text-colorsa-text hover:text-colorsa-primary transition-colors duration-300 ease-in-out">Break CheckUp</p>
          <p className="">
            We have the right caring, experience <br /> and dedicated
            professional for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dealership;
