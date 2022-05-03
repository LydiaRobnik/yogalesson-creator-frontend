import React from 'react';
import './sections.scss';
import structure from '../../pictures/structure.avif';

export default function Section1() {
  return (
    <div className="section-container">
    <div className="w-1/2 flex-col items-center justify-center hidden md:flex">
        <div className="featureText leading-relaxed p-5 m-12 absolute bottom-50 text-4xl text-left font-light">
        Stucture your course fast and with ease.<br></br>
        Keep an eye onto the golden thread.<br></br>
        Prepare texts for Shavasana.</div>
    </div>
    <div className="w-full md:w-1/2 flex items-center justify-center relative">
     <img className="object-cover w-full h-full bg-bottom" src={structure} alt="girl writing down to the planner"/>
    </div>
    <div className="featureText md:hidden p-5 m-12 absolute flex items-center justify-center leading-relaxed bottom-50 text-4xl text-left bg-red-500 bg-opacity-20 backdrop-blur-md font-light z-1">
      Stucture your course fast and with ease.<br></br>
      Keep an eye onto the golden thread.<br></br>
      Prepare texts for Shavasana. 
    </div>
 </div>
  );
}