import React, { useEffect, useState } from 'react';
import http from '../../api/http-common';
import './dashboard.scss';

export default function Dashboard() {
  const [asanas, setAsanas] = useState([]);

  useEffect(() => {
    console.log('useEffect');
    http()
      .get('/asana')
      .then((resp) => {
        console.log('asanas', resp.data);
        setAsanas(resp.data);
      });

    return () => {};
  }, []);

  return (
    <div className="home flex flex-col items-center color-primary">
      <div className="font-bold text-3xl md:text-7xl hover:text-blue-300 pb-5">
        Yoga Lesson Creator with {asanas.length} Asanas
      </div>
      <div className="flex flex-wrap gap-4">
        {asanas.map((asana) => (
          <div
            key={asana.id}
            className="w-20 md:w-40 flex flex-col items-center font-raleway border-2 bg-secondary color-1 border-gray-600 rounded-lg p-4"
          >
            <img className="invert" src={asana.img_url} alt="" />
            <div className="flex-1 text-xs text-center md:text-sm font-bold pt-4">
              {asana.asana?.sanskrit}
            </div>
            <div className="flex-1 text-xs text-center md:text-sm italic pt-1">
              {asana.asana?.en}
            </div>
            <div className="flex-1 text-md text-center md:text-xl text-amber-400 font-peg pt-1">
              {asana.level?.en}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
