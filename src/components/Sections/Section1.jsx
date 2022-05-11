import React from 'react';
import './sections.scss';
import { useState, useEffect } from 'react';
import asanaService from '../../api/asanaService';

export default function Section1() {
  const [randomAsanas, setRandomAsanas] = useState([]);
  console.log(randomAsanas);

  useEffect(() => {
    const fetchData = () => {
      asanaService.getRandomAsanas(3).then((data) => {
        setRandomAsanas(data);
      });
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="section-container md:flex h-full">
        <div className="sectionTitleColor md:w-1/2 flex-col items-center justify-center text-6xl font-bold">
          <div className="sectionTitle pt-4 flex items-center justify-center font-light text-10xl leading-relaxed">
            Beginners Class
          </div>
          <div className="max-w-screen-lg mx-auto p-4">
            <div className="flex flex-wrap">
              {/* <div className="bg-clip-border m-4 p-16 border-4 bg-white rounded-lg"> */}
              {randomAsanas.map((asana) => (
                <div
                  key={asana._id}
                  className="randomAsana bg-clip-border m-6 border-4 bg-white rounded-lg flex items-center justify-center felx-wrap"
                >
                  <img
                    className="w-full"
                    src={asana.img_url}
                    alt="preview class"
                    asana={asana}
                  />
                </div>
              ))}
              {/* </div> */}
            </div>
          </div>
        </div>
        <div className="w-full flex md:items-center justify-center relative md:flex md:w-1/2 Section1right">
          <div className="featureText flex items-center justify-center leading-relaxed p-5 m-16 sm:m-32  md:m-24 absolute bottom-50 text-xl md:text-3xl text-left bg-red-500 bg-opacity-20 backdrop-blur-md font-light">
            Select exercises from our library or add your own asanas. <br></br>
            <br></br>
            Prepare reusable text modules for shavasana or meditation sequences.
          </div>
        </div>
      </div>
    </>
  );
}
