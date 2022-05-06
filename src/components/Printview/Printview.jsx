import React, { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useOutletContext } from 'react-router-dom';
import './printview.scss';
import PrintSequence from '../PrintSequence/PrintSequence';
import { forwardRef } from 'react';

const Printview = forwardRef((props, ref) => {
  const { userClasses } = useOutletContext();
  const { user } = useContext(AuthContext);

  const [printClass, setPrintClass] = useState({});

  useEffect(() => {
    setPrintClass(userClasses[0]);
  }, []);

  console.log(userClasses);
  console.log(printClass);

  return (
    <>
      <div ref={ref}>
        <div className="w-screen h-screen">
          <div className="mx-10 flex flex-row">
            <h3 className="color-blue-darkest text-bold text-2xl">
              {printClass.title}
            </h3>
          </div>

          <div className="w-screen mx-10">
            {printClass.plan &&
              printClass.plan.map((sequence, index) => (
                <div
                  key={(sequence._id, index)}
                  className="rounded bg-light m-10"
                >
                  <PrintSequence sequence={sequence} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
});

export default Printview;
