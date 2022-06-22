import React from 'react';
import './sections.scss';

const Section = () => {
  const cards = [
    { icon: 'schedule', text: 'Save time when creating your yoga classes' },
    { icon: 'restart_alt', text: 'Create reusable sequences and classes' },
    {
      icon: 'calendar_month',
      text: 'Use our calendar to schedule your classes'
    }
  ];

  return (
    <div className="cardBenefits3 w-full mb-2 py-48 color-primary flex flex-col md:flex-row justify-center">
      {cards.map((card) => (
        <div key={card.icon}>
          <div className="cardsHome rounded-md flex-col justify-center flex items-center self-center justify-self-center m-3 px-4 py-6 ">
            <span className="material-symbols-outlined color-blue-darkest flex justify-center text-xl md:text-4xl p-2">
              {card.icon}
            </span>
            <div className="p-3 w-48 text-center">
              <p className="featureText text-md md:text-lg lg:text-xl">
                {card.text}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Section;
