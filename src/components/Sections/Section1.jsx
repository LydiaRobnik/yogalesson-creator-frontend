import React from 'react';
import './sections.scss';
import flowers from '../../pictures/flowers.jpg';

export default function Section1() {
  return (
    <div className="section-container">
      <div className="md:flex">
        <div className="sectionTitleColor md:w-1/2 flex-col items-center justify-center text-6xl font-bold md:shrink-0 border-2 border-red-500">
          <div className="sectionTitle flex items-center justify-center font-light text-10xl leading-relaxed">
            Beginners Class
          </div>
          <div className="max-w-screen-lg mx-auto p-4">
            <div className="flex flex-wrap">
              <div className="bg-clip-border m-4 p-16 border-4 bg-white rounded-lg"></div>
              <div className="bg-clip-border m-4 p-16 border-4 bg-white rounded-lg"></div>
              <div className="bg-clip-border m-4 p-16 border-4 bg-white rounded-lg"></div>
              <div className="bg-clip-border m-4 p-16 border-4 bg-white rounded-lg"></div>
              <div className="bg-clip-border m-4 p-16 border-4 bg-white rounded-lg"></div>
              <div className="bg-clip-border m-4 p-16 border-4 bg-white rounded-lg"></div>
              <div className="bg-clip-border m-4 p-16 border-4 bg-white rounded-lg"></div>
              <div className="bg-clip-border m-4 p-16 border-4 bg-white rounded-lg"></div>
            </div>
          </div>
        </div>
        <div className="w-full border-2 border-blue-500 flex items-center justify-center relative md:flex md:w-1/2">
          <img
            className="object-cover w-full h-full bg-bottom"
            src={flowers}
            alt="flowers on white background"
          />
          <div className="featureText flex items-center justify-center leading-relaxed p-5 m-12 absolute bottom-50 text-4xl text-left bg-red-500 bg-opacity-20 backdrop-blur-md font-light">
            Use our templates to structure your class. <br></br>
            Select exercises and sort them. Create reusable sequenzes and save
            your classes.
          </div>
        </div>
        {/* <div className="md:hidden p-8 absolute text-4xl bottom-5 bg-red-500 bg-opacity-50">
        <div>some text</div>
        <div>some text</div>
    </div> */}
      </div>
    </div>
  );
}
