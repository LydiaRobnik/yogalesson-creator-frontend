import React from 'react';
import './sections.scss';
import { useState, useEffect } from 'react';
import asanaService from '../../../api/asanaService';

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
      <div className="flex flex-row  flex-wrap w-full color-primary mb-2">
        <div className="sectionTitleColor w-full md:w-1/2 flex-col justify-center pt-16 pb-24">
          <div className="sectionTitle text-center pt-4 font-light text-6xl lg:text-7xl xl:text-9xl leading-relaxed">
            Beginners Class
          </div>
          <div className="max-w-screen-lg mx-auto px-8 pt-10">
            <div className="flex flex-wrap justify-center">
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
            </div>
          </div>
        </div>
        <div className="Section1right w-full items-center justify-center md:w-1/2 py-32">
          <div className="featureText flex items-center justify-center p-6 mx-12 md:mx-18 lg:mx-32 bottom-50 text-lg md:text-xl text-left bg-red-500 bg-opacity-20 backdrop-blur-md font-light">
            Select exercises from our library or add your own asanas. <br></br>
            <br></br>
            Prepare reusable text modules for shavasana or meditation sequences.
          </div>
        </div>
      </div>
    </>
  );
}
