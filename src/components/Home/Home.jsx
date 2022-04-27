import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import 'fullpage.js/vendors/scrolloverflow'; // Optional. When using scrollOverflow:true
import Navbar from '../Navbar/Navbar';
import './home.scss';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="px-0">
      <ReactFullpage
        //fullpage options
        licenseKey={'gplv3-license'}
        scrollingSpeed={1000} /* Options here */
        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
                    <button
                      className="btn-blue border-4 p-4 mt-8 rounded-xl"
                      onClick={() => fullpageApi.moveSectionDown()}
                    >
                      Click me to move down
                    </button>
                      <button
                        className="border-dashed border-b-2"
                        onClick={() => navigate('/user')}
                      >
                        Login
                      </button>
              <div className="section color-primary">
                  <Navbar className="z-1"/>
                  <img className="z-0" src="https://yogalesson-createor-backend.herokuapp.com/images/hero.jpeg" />
              </div>
              <div className="section">
                <img src="https://yogalesson-createor-backend.herokuapp.com/images/Section1.jpg" />
              </div>
              <div className="section color-primary text-5xl">
                <p>Feature 3</p>
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
  );
}
