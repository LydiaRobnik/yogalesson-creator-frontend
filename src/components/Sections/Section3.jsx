import React from 'react';
import './sections.scss';

const Section = () => {
	return (
    <div className="cardBenefits3 h-full flex flex-wrap">
    <div className="w-full flex flex-wrap items-center justify-center">
    
    <div className="cardsHome mx-4 rounded-lg flex-col justify-center flex items-center pt-4">
     <span className="material-symbols-outlined color-blue-darkest flex justify-center text-4xl p-2">
        tips_and_updates
     </span>
     <div className="p-5">
        <p className="featureText mb-3 font-light">Get new ideas for your classes</p>
     </div>
    </div>
    
    <div className="cardsHome mx-4 rounded-lg flex-col justify-center flex items-center">
     <span className="material-symbols-outlined color-blue-darkest flex justify-center text-4xl p-2">
        view_in_ar
     </span>
     <div className="p-5">
        <p className="featureText mb-3 font-light">Save time</p>
     </div>
    </div>

    <div className="cardsHome mx-4 rounded-lg flex-col justify-center flex items-center">
     <span className="material-symbols-outlined color-blue-darkest flex justify-center text-4xl p-2">
        note_add
     </span>
     <div className="p-5">
        <p className="featureText mb-3 font-light">Create reusable sequences and classes</p>
     </div>
    </div>
    </div>
    </div>
    );  
};

export default Section;

