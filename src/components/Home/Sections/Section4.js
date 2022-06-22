import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import './sections.scss';

const Section4 = () => {
  const { setShowLogin } = useContext(AuthContext);
  return (
    <div className="background w-full py-56 relative flex items-center justify-center color-primary">
      <div className="mx-auto">
        <button
          onClick={() => setShowLogin(true)}
          className="bg-red hover:bg-red-500 text-white font-bold py-2 px-10 mb-32"
        >
          Start creating
        </button>
      </div>
    </div>
  );
};

export default Section4;
