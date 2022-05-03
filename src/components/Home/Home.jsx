import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ReactFullpage from "@fullpage/react-fullpage";
import "fullpage.js/vendors/scrolloverflow"; // Optional. When using scrollOverflow:true
import Navbar from "../Navbar/Navbar";
import "./home.scss";
import Section1 from "../Sections/Section1";
import Section2 from "../Sections/Section2";
import Section3 from "../Sections/Section3";
import TestResponsive from "./TestResponsive";
import FooterNew from "../FooterNew/FooterNew.jsx";
import Hero from "./Hero.jsx";

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
              <div className="top section color-primary h-full w-full">
                <div className="h-full">
                  <Navbar className="z-1" />
                  <Hero />
                </div>
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

                  <div className="section color-primary">
                    <Section1 />
                  </div>
                  <div className="section color-primary">
                    <Section2 />
                  </div>
                  <div className="section color-primary">
                    <Section3 />
                  </div>

              <div className="section color-primary">
                <FooterNew />
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
  );
}
