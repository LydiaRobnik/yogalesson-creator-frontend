import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Printview from "../Printview/Printview";

const Print = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  return (
    <>
      <button style={{ 'color': "white", 'backgroundColor': "blue" }} onClick={handlePrint}>Print this out!</button>
      <Printview ref={componentRef} />
    </>
  );
};
export default Print;