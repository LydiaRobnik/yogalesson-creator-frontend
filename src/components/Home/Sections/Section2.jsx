import React from 'react';
import './sections.scss';

export default function Section1() {
  return (
    <div className="cardBenefits color-primary mb-2">
      <div className="w-full featureText bg-red-500 bg-opacity-10 px-8 lg:px-48 xl:px-56 py-16 lg:py-20 xl:py-32 text-md sm:text-3xl flex flex-column flex-wrap items-center justify-center ">
        <p className="p-2">Stucture your course fast and with ease.</p>
        <p className="p-2">Create reusable sequenzes.</p>
        <p className="p-2">Keep an eye onto the golden thread.</p>
        <p className="p-2">Prepare well structured classes.</p>
      </div>
    </div>
  );
}
