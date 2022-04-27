import React from 'react';
import './sections.scss';
import structure from '../../pictures/structure.avif';

export default function Section1() {
  return (
    <div className="section-container">
    <div className="w-1/2 flex-col items-center justify-center text-6xl font-bold hidden md:flex border-2 border-red-500">
        <p className="featureText p-4 m-12 absolute bottom-50 text-5xl text-left font-light">Stucture your course fast and with ease.<br></br>
      Keep an eye onto the golden thread.<br></br>
      Prepare texts for Shavasana.</p>
    </div>
    <div className="md:hidden p-8 absolute text-4xl bottom-5 bg-red-500 bg-opacity-50">
          <div>text overlay</div>
          <div>text overlay</div>
          <div>text overlay</div>
    </div>
    <div className="w-full border-2 border-blue-500 md:w-1/2 flex items-center justify-center relative">
      <img className="object-cover" src={structure} alt="girl writing down to the planner"/>
    </div>
 </div>
  );
}