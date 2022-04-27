import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import 'fullpage.js/vendors/scrolloverflow'; // Optional. When using scrollOverflow:true
import Navbar from '../Navbar/Navbar';
import './home.scss';
import Section1 from '../Section1/Section1';
import Section2 from '../Section2/Section2';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="px-0 mx-0 my-0">
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
                <div className="h-full">
                  <Navbar />
                  <div>
                    <Section1 />
                  </div>
                </div>
              </div>
              <div className="section color-primary text-5xl">
              <Section2 />
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
