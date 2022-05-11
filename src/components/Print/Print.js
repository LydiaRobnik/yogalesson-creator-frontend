import React, { useRef, useContext } from 'react';
import { useReactToPrint } from 'react-to-print';
//import SequencePlanned from "../SequencePlanned/SequencePlanned";
import Planner from '../Planner/Planner';
import '../../style/variables.scss';
import asanaService from '../../api/asanaService';
import { useOutletContext } from 'react-router-dom';

const Print = ({ sequence, handleFocus }) => {
  const { yogaClassToAdd } = useOutletContext();
  const componentRef = useRef();
  console.log('sequence in print', sequence);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  return (
    <>
      {yogaClassToAdd.plan.length > 0 && (
        <button
          className="btn-blue btn-blue:hover sm:mr-2 md:mr-8 lg:mr-12 xl:mr-20 flex flex-row self-center md:self-end"
          onClick={handlePrint}
        >
          <span className="font-material-symbols text-4xl">print</span>
        </button>
      )}

      <Planner ref={componentRef} />
    </>
  );
};
export default Print;
