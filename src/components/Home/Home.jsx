import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import 'fullpage.js/vendors/scrolloverflow'; // Optional. When using scrollOverflow:true
import Navbar from '../Navbar/Navbar';
import './home.scss';
import Section1 from '../Sections/Section1';
import Section2 from '../Sections/Section2';
import Section3 from '../Sections/Section3';
import LoginModal from "../Login/LoginModal.jsx";
import TestResponsive from './TestResponsive';
import Footer from "../Footer/Footer.jsx";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="px-0 mx-0 my-0">
      <ReactFullpage
        //fullpage options
        licenseKey={"gplv3-license"}
        scrollingSpeed={1000} /* Options here */
        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
            
              <div className="top section color-primary h-full w-full">
                <div className="h-full">
                  <Navbar className="z-1"/>
                  <div className="bluewindow">
                  <div className="hero ">
                    <h2 className="color-beige-light font-moontime text-7xl mt-5 mb-5">yoga class planning</h2>
                    <h3 className="font-bold">easy and quick</h3>
                    <p>create well structured yoga classes</p>
                  </div>
                  <LoginModal />
                  <button type="submit" className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-10">
                   try it now
                  </button>
            </div>
              <div className="divdivdiv">
              <button
              type="submit"
              className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-10"
              >
              try it now
            </button>
              </div>
              </div>

              </div>
              <div className="section">
                <p>Section 1</p>
              </div>
            
                  <div className="section color-primary">
                    <Section1 />
                  </div>
                  <div className="section color-primary">
                    <Section2 />
                  </div>
                  <div className="section color-primary">
                    <Section3 />
                  </div>

              <div className="section color-primary text-5xl">
                <Footer />
              </div>
            
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
  );
}
