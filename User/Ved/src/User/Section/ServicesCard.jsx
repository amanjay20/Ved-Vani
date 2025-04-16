import React from "react";
import { Link } from "react-router-dom";

const ServicesCard = ({ icon, title, date, description }) => {
  return (
    <div className=" group flex flex-col gap-2 w-full  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-xl cursor-pointer lg:hover:-translate-y-6 transition duration-300 ease-in-out">
      <div className=" transition-colors duration-300 ease-in-out group-hover:bg-[#ade9dc]">
        {icon}
      </div>
      <div className=" p-4">
        <h1 className=" font-semibold text-lg">{title}</h1>
        <p className="text-sm text-justify mt-1 text-blue-400">
          {date}
        </p>
        <p className="text-sm text-justify mt-2">
          {description}
        </p>
        
      </div>
      <Link to="">
          <div className=" bg-gradient-to-r from-brightColor to-backgroundColor text-white rounded-bl-xl rounded-br-xl w-full text-center px-3 py-3 ">Book Now</div>
        </Link>
    </div >
  );
};

export default ServicesCard;
