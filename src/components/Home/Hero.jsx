import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Hero() {
  const { setShowLogin } = useContext(AuthContext);

  return (
    <>
      <div className="bluewindow">
        <div className="hero">
          <h1 className="color-beige-light text-7xl mt-5 mb-5 px-5">
            yoga class planning
          </h1>
          <h3 className="font-bold">easy and quick</h3>
          <h4 className="pb-2">create well structured yoga classes</h4>
        </div>
      </div>
      <div className="divdivdiv">
        <button
          onClick={() => setShowLogin(true)}
          className="bg-red hover:bg-red-500 text-white font-bold pt-3 py-2 px-20"
        >
          try it now
        </button>
      </div>
    </>
  );
}
