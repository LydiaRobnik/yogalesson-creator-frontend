import React from "react";
import { FaInstagram } from 'react-icons/fa';
import "./footerNew.scss";

const FooterNew = () => {
  return (
    <>
    <div className="h-10 max-h-full md:flex md:justify-center md:items-center">
    <div className="h-full color-blue-darkest">
      <FaInstagram />
    </div>
    <div className="h-full color-blue-darkest">
      <FaInstagram />
    </div>
    <div className="h-full color-blue-darkest">
      <FaInstagram />
    </div>
    </div>
    </>
  );
  }

export default FooterNew