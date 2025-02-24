import { Steps } from "antd";
import { Activity, Home, ServerIcon } from "lucide-react";
import React from "react";

const AboutUs = () => {
  const description = "Founded as a small repair shop ";
  const descriptiona = "Expended to full service Car Spot ";
  const description3 = "Founded as a small repair shop ";
  return (
    <div className="bg-colorsa-background container mx-auto">
      <div className="flex flex-col justify-center items-center p-10">
        <h2 className="text-2xl font-semibold my-2">Welcome to Car Spot</h2>
        <p>Your Premium Destination for All Things Cars Since 1995</p>
      </div>
      <div className="grid grid-cols-3 gap-5 my-5">
        <div
          className="
  flex space-y-5 justify-start flex-col p-5 items-start my-4 
  bg-colorsa-secondary rounded-2xl shadow-2xl 
  hover:bg-colorsa-background cursor-pointer 
  transition-all duration-300 ease-in-out
"
        >
          <Home size={40}></Home>
          <p className="font-semibold text-xl">Premium Selection</p>
          <p>
            Offering the finest Collection of road,mountain and urban bicycles
            from top brands
          </p>
        </div>
        <div
          className="
  flex space-y-5 justify-start flex-col p-5 items-start my-4 
  bg-colorsa-secondary rounded-2xl shadow-2xl 
  hover:bg-colorsa-background cursor-pointer 
  transition-all duration-300 ease-in-out
"
        >
          <Activity size={40}></Activity>
          <p className="font-semibold text-xl">Expart Staff</p>
          <p>
            Our certified mechanics and sales team bring decades of cycling
            experience
          </p>
        </div>
        <div
          className="
  flex space-y-5 justify-start flex-col p-5 items-start my-4 
  bg-colorsa-secondary rounded-2xl shadow-2xl 
  hover:bg-colorsa-background cursor-pointer 
  transition-all duration-300 ease-in-out
"
        >
          <ServerIcon size={40}></ServerIcon>
          <p className="font-semibold text-xl">Quality Service</p>
          <p>Professional maintenance,repairs,and customization services</p>
        </div>
      </div>

      <div className="flex flex-col space-y-5">
        <p className="text-2xl font-semibold">Our Journey</p>
        <Steps
          direction="vertical"
          size="small"
          current={3}
      
          
          items={[
            { title: "1995", description:"Founded as a small repair shop" },
            {
              title: "2000",
              description:"Expended to full service Car Spot ",
            },
            {
              title: "2010",
              description:"Open our flagship store",
            },
            {
                title: "2023",
                description:"Celebrating serving over 100000 happy client",
              },
          ]}
        />
      </div>
    </div>
  );
};

export default AboutUs;
