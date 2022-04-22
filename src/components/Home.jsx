import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import http from '../api/http-common';
import 'fullpage.js/vendors/scrolloverflow'; // Optional. When using scrollOverflow:true
import ReactFullpage from '@fullpage/react-fullpage';
import './style/home.scss';
import Planner from './user/Planner';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="pl-8">
      <ReactFullpage
        //fullpage options
        licenseKey={'gplv3-license'}
        scrollingSpeed={1000} /* Options here */
        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              <div className="section color-primary">
                <p className="text-5xl">Section 1 (welcome to fullpage.js)</p>
                <button
                  className="border-4 p-4 mt-8 rounded-xl"
                  onClick={() => fullpageApi.moveSectionDown()}
                >
                  Click me to move down
                </button>
                <p className="pt-5 pr-5">
                  <button
                    className="border-dashed border-b-2"
                    onClick={() => navigate('/user')}
                  >
                    Login
                  </button>
                </p>
              </div>
              <div className="section color-primary text-5xl">
                <p>Feature 1</p>
              </div>
              <div className="section color-primary text-5xl">
                <p>Feature 2</p>
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
