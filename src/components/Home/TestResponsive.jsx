import React from 'react';

export default function TestResponsive() {
  return (
    <div className="h-full flex">
      <div
        className="w-1/2 flex-col items-center justify-center
          border-2 border-red-500 text-6xl font-bold
          hidden md:flex"
      >
        <lottie-player
          src="https://assets1.lottiefiles.com/packages/lf20_s00z9gco.json"
          background="transparent"
          speed="1"
          style={{ width: '300px', height: '300px' }}
          loop
          // controls
          autoplay
        ></lottie-player>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center border-2 border-blue-500 text-6xl relative">
        <div>
          <img
            className="h-screen"
            src="https://storage.googleapis.com/monkeyplan-bucket/app/Section1.jpg"
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
