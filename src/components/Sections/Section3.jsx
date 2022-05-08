import React from 'react';
import './sections.scss';

const Section = () => {
  return (
    <div className="cardBenefits3 h-full w-full flex flex-wrap items-center justify-center">
      <div className="cardsHome mx-4 rounded-md flex-col justify-center flex items-center">
        <span className="material-symbols-outlined color-blue-darkest flex justify-center text-4xl p-2">
          schedule
        </span>
        <div className="p-5">
          <p className="featureText mb-3 font-light">
            Save time when creating your yoga classes
          </p>
        </div>
      </div>

      <div className="cardsHome mx-4 rounded-md flex-col justify-center flex items-center">
        <span className="material-symbols-outlined color-blue-darkest flex justify-center text-4xl p-2">
          restart_alt
        </span>
        <div className="p-5">
          <p className="featureText mb-3 font-light">
            Create reusable sequences and classes
          </p>
        </div>
      </div>

      <div className="cardsHome mx-4 rounded-lg flex-col justify-center flex items-center">
        <span className="material-symbols-outlined color-blue-darkest flex justify-center text-4xl p-2">
          calendar_month
        </span>
        <div className="p-5">
          <p className="featureText">
            Use our calendar to schedule your classes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section;
