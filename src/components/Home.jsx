import React, { useEffect, useState } from 'react';
import http from '../api/http-common';
import './style/home.scss';

export default function Home() {
  const [asanas, setAsanas] = useState([]);

  useEffect(() => {
    console.log('useEffect', asanas);
    http.get('/asana').then((resp) => setAsanas(resp.data));

    return () => {};
  }, []);

  return (
    <div className="home flex flex-col items-center color-primary">
      <div className="font-bold text-3xl md:text-7xl">
        Yoga Lesson Creator {asanas.length}{' '}
      </div>
      <div className="flex flex-wrap gap-4">
        {asanas.map((asana) => (
          <div
            key={asana.id}
            className="flex flex-col items-center font-primary border-2 border-gray-600 rounded-lg p-4"
          >
            <img className="w-32" src={asana.img_url} alt="" />
            <div className="flex-1 font-bold pt-4">{asana.sanskrit_name}</div>
            <div className="flex-1 text-sm italic pt-4">
              {asana.english_name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
