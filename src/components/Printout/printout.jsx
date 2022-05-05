import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Sequence from './components/Sequence/Sequence';

const Printout = () => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div
      style={{ display: "none" }}// This make ComponentToPrint show   only while printing
      > 
       <Sequence ref={componentRef} />
      </div>
      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
};

export default Printout;
