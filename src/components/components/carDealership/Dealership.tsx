import { Separator } from "@/components/ui/separator";
import dealer from './dealrimg/dealership.png'
import engine from './dealrimg/engineering.png'
import security from './dealrimg/encrypted.png'
import d from './dealrimg/weakness.png'
const Dealership = () => {
  return (
    <div className="max-w-[1380px] mx-auto">
      <div className="flex justify-between ">
        <div className="w-[50%] space-y-4">
            <h1 className="text-3xl">About <span className="text-[#38d8a9]">Car Spot</span> Dealership</h1>
            <Separator className="mt-4  mb-4 font-bold "></Separator>
            <h2 className="text-2xl justify text-[#061d15]">Everything you need to build an amazing dealership automotive responsive website</h2>
            <p className="text-xl">Carspot is not only a hub where buyers and sellers can interact, it is also a comprehensive automotive portal with a forum dedicated to all automotive discussions, a blog that keeps the users up to date with the latest happenings in the automotive industry.</p>
        </div>
        <div className="w-[50%]">
          <img
            src="https://carspot.scriptsbundle.com/wp-content/uploads/2017/06/gtr.png"
            alt="car"
          />
        </div>
      </div>
      <div className="grid grid-cols-4 ">
        <div className="flex justify-start items-start flex-col my-5 space-y-3">
            <img src={dealer} alt="" className="w-20"/>
            <p className="text-2xl hover:text-[#38d8a9]">Dealership</p>
            <p className="">We have the right caring, experience <br /> and dedicated professional for you.</p>
        </div>
        <div className="flex justify-start items-start flex-col my-5 space-y-3">
            <img src={engine} alt="" className="w-20"/>
            <p className="text-2xl hover:text-[#38d8a9]">Engine Upgrade</p>
            <p className="">We have the right caring, experience and dedicated professional for you.</p>
        </div>
        <div className="flex justify-start items-start flex-col my-5 space-y-3">
            <img src={security} alt="" className="w-20"/>
            <p className="text-2xl hover:text-[#38d8a9]">Secirity inspaction</p>
            <p className="">We have the right caring, experience <br /> and dedicated professional for you.</p>
        </div>
        <div className="flex justify-start items-start flex-col my-5 space-y-3">
            <img src={d} alt="" className="w-20"/>
            <p className="text-2xl hover:text-[#38d8a9]">Break CheckUp</p>
            <p className="">We have the right caring, experience <br /> and dedicated professional for you.</p>
        </div>
        
      </div>
    </div>
  );
};

export default Dealership;
