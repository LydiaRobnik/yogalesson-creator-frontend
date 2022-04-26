import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ReactFullpage from "@fullpage/react-fullpage";
import "fullpage.js/vendors/scrolloverflow"; // Optional. When using scrollOverflow:true
import Navbar from "../Navbar/Navbar";
import TestResponsive from "./TestResponsive";
import "./home.scss";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="px-8">
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
                <div className="h-full">
                  <Navbar />
                  <div className="flex flex-col justify-center h-full text-5xl">
                    <p>Feature 1</p>
                  </div>
                </div>
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
