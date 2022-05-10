import React from 'react';
import './sections.scss';

const Section = () => {
  return (
    <div className="cardBenefits3 h-full w-full grid gap-2 lg:gap-4 grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
      {/* flex xs:flex-col flex-wrap */}

      <div className="cardsHome w-1/3 h-5/6 sm:w-3/4 sm:h-1/2 md:w-full md:col-start-2 md:col-end-2 lg:col-start-3 lg:col-end-3 rounded-md flex-col justify-center flex items-center md:grid-span-1 self-center justify-self-center">
        <span className="material-symbols-outlined color-blue-darkest flex justify-center text-4xl p-2">
          schedule
        </span>
        <div className="p-2">
          <p className="featureText text-xs sm:text-sm md:text-lg lg:text-xl">
            Save time when creating your yoga classes
          </p>
        </div>
      </div>

      <div className="cardsHome w-1/3 h-5/6 sm:w-3/4 sm:h-1/2 md:w-full md:col-start-3 md:col-end-3 lg:col-start-4 lg:col-end-4 rounded-md flex-col justify-center flex items-center md:grid-span-1 self-center justify-self-center">
        <span className="material-symbols-outlined color-blue-darkest flex justify-center text-4xl p-2">
          restart_alt
        </span>
        <div className="p-2">
          <p className="featureText text-xs sm:text-sm md:text-lg lg:text-xl">
            Create reusable sequences and classes
          </p>
        </div>
      </div>

      <div className="cardsHome w-1/3 h-5/6 sm:w-3/4 sm:h-1/2 md:w-full md:col-start-4 md:col-end-4 lg:col-start-5 lg:col-end-5 rounded-md flex-col justify-center flex items-center md:grid-span-1 self-center justify-self-center">
        <span className="material-symbols-outlined color-blue-darkest flex justify-center text-4xl p-2">
          calendar_month
        </span>
        <div className="p-2">
          <p className="featureText text-xs sm:text-sm md:text-lg lg:text-xl">
            Use our calendar to schedule your classes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section;
