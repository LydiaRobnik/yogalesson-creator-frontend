import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Hero() {
  console.log('Hero', process.env.REACT_APP_API_URL);
  const { setShowLogin } = useContext(AuthContext);

  return (
    <>
      <div className="flex flex-col items-center mb-12">
        <div className="bluebox flex flex-col items-center py-10 w-5/6 sm:w-2/3 md:1/2 mt-32 mb-5">
          <h1 className="color-beige-light text-5xl sm:text-6xl md:text-7xl px-2">
            yoga class planning
          </h1>
          <h4 className="px-2 py-2 text-sm">
            create well structured yoga classes
          </h4>
        </div>

        <div>
          <button
            onClick={() => setShowLogin(true)}
            className="bg-red hover:bg-red-500 text-white text-md py-2 px-12"
          >
            try it now
          </button>
        </div>
      </div>
    </>
  );
}
