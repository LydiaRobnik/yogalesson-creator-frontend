import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// import ReactFullpage from '@fullpage/react-fullpage';
// import 'fullpage.js/vendors/scrolloverflow'; // Optional. When using scrollOverflow:true
import Navbar from '../Navbar/Navbar';
import './home.scss';
import Section1 from './Sections/Section1';
import Section2 from './Sections/Section2';
import Section3 from './Sections/Section3';
import Section4 from './Sections/Section4';
import FooterNew from '../FooterNew/FooterNew';
import Hero from './Hero.jsx';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="px-0 flex flex-col items-center bg-light">
      <div className="max-w-7xl">
        <div className="top color-primary pb-64 mb-2 w-full">
          <Navbar className="z-1" />
          <Hero />
        </div>
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <FooterNew className="z-1 color-primary w-full" />
      </div>
    </div>
  );
}
