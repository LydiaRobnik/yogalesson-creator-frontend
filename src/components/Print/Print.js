import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import SequencePlanned from "../SequencePlanned/SequencePlanned";

const Print = ({sequence, handleFocus}) => {
  const componentRef = useRef();
  console.log("sequence in print", sequence)

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  return (
    <>
      <button onClick={handlePrint}>Print this out!</button>
      <SequencePlanned sequence={sequence} handleFocus={handleFocus} ref={componentRef} />
    </>
  );
};
export default Print;