import React from 'react';
import { Outlet } from 'react-router-dom';
import useBreakpoints from '../../custom/useBreakpoint';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './layout.scss';

export default function Layout() {
  // hook to get the current breakpoint of screen size
  const point = useBreakpoints();

  return (
    <div className="px-8">
      <div className="flex flex-col gap-8">
        <Navbar />
        <div>{point}</div>
        <main className="">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
