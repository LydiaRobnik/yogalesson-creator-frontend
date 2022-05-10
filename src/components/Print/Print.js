import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
//import SequencePlanned from "../SequencePlanned/SequencePlanned";
import Planner from "../Planner/Planner";
import '../../style/variables.scss';
import asanaService from "../../api/asanaService";

const Print = ({sequence, handleFocus}) => {
  const componentRef = useRef();
  console.log("sequence in print", sequence)

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  return (
    <>
      <button className="btn-blue btn-blue:hover mx-2 flex flex-row items-center" onClick={handlePrint}>Print</button>
      {/* <SequencePlanned sequence={sequence} handleFocus={handleFocus} ref={componentRef} /> */}
      <Planner ref={componentRef} />
    </>
  );
};
export default Print;