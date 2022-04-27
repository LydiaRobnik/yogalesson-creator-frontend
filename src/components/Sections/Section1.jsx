import React from 'react';
import './sections.scss';
import flowers from '../../pictures/flowers.jpg';


export default function Section1() {
  return (
    <div className="section-container">
      <div className="sectionTitleColor w-1/2 flex-col items-center justify-center text-6xl font-bold hidden md:flex border-2 border-red-500">
        <h1 className="sectionTitle font-light">Beginners Class</h1>
        <div className="grid gap-4 grid-cols-4 grid-rows-4">
          <div className="bg-clip-border p-16 border-4 bg-white rounded-lg"></div>
          <div className="bg-clip-border p-16 border-4 bg-white rounded-lg"></div>
          <div className="bg-clip-border p-16 border-4 bg-white rounded-lg"></div>
          <div className="bg-clip-border p-16 border-4 bg-white rounded-lg"></div>
          <div className="bg-clip-border p-16 border-4 bg-white rounded-lg"></div>
          <div className="bg-clip-border p-16 border-4 bg-white rounded-lg"></div>
          <div className="bg-clip-border p-16 border-4 bg-white rounded-lg"></div>
          <div className="bg-clip-border p-16 border-4 bg-white rounded-lg"></div>
        </div>
    </div>
    <div className="w-full border-2 border-blue-500 md:w-1/2 flex items-center justify-center relative">
      <img className="object-cover w-full h-full bg-bottom" src={flowers} alt="flowers on white background"/>
      <p className="featureText p-4 m-12 absolute bottom-50 text-5xl text-left bg-red-500 bg-opacity-20 font-light">
Use our templates to structure your class. <br></br>
Select exercises and sort them. Create reusable sequenzes 
and save your classes.</p>
    </div>
    <div className="md:hidden p-8 absolute text-4xl bottom-5 bg-red-500 bg-opacity-50">
        <div>some text</div>
        <div>some text</div>
    </div>
 </div>
  );
}