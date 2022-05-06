import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import SequencePlanned from "../SequencePlanned/SequencePlanned";

const Print = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  return (
    <>
      <button onClick={handlePrint}>Print this out!</button>
      <SequencePlanned ref={componentRef} />
    </>
  );
};
export default Print;