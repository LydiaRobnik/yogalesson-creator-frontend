import React from "react";

export default function TestResponsive() {
  return (
    <div className="h-full flex">
      <div
        className="w-1/2 flex-col items-center justify-center 
          border-2 border-red-500 text-6xl font-bold
          hidden md:flex"
      >
        <div>text overlay</div>
        <div>text overlay</div>
        <div>text overlay</div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center border-2 border-blue-500 text-6xl relative">
        <div>
          <img
            src="https://yogalesson-createor-backend.herokuapp.com//images/Section1.jpg"
            alt=""
          />
        </div>
        <div className="md:hidden p-8 absolute text-4xl bottom-5 bg-red-500 bg-opacity-50">
          <div>text overlay</div>
          <div>text overlay</div>
          <div>text overlay</div>
        </div>
      </div>
    </div>
  );
}
