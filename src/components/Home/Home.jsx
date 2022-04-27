import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import 'fullpage.js/vendors/scrolloverflow'; // Optional. When using scrollOverflow:true
import Navbar from '../Navbar/Navbar';
import './home.scss';
import LoginModal from '../Navbar/LoginModal.jsx'

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="px-0">
      <ReactFullpage
        //fullpage options
        licenseKey={"gplv3-license"}
        scrollingSpeed={1000} /* Options here */
        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              <div className="section color-primary">
                <div className="h-full">
                  <TestResponsive />
                </div>
              </div>
              <div className="section color-primary">
                  <Navbar className="z-1"/>
                  <img className="z-0" src="https://yogalesson-createor-backend.herokuapp.com/images/hero.jpeg" />
              </div>
              <div className="section">
                <img src="https://yogalesson-createor-backend.herokuapp.com/images/Section1.jpg" />
              </div>
              <div className="section color-primary text-5xl">
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
  );
}
