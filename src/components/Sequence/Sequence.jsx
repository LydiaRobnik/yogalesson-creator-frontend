import React, { useState } from 'react';
import AsanaCard from '../AsanaCard/AsanaCard';
// import useBreakpoint from '../../custom/useBreakpoint';
import './sequence.scss';

const Sequence = ({ sequence, selectedSequence }) => {
  // const point = useBreakpoint();

  // // functions
  // const gridResponsiveness = () => {
  //   if (point === 'xs') {
  //     return 'grid-cols-1';
  //   } else if (point === 'sm') {
  //     return 'grid-cols-2';
  //   } else if (point === 'md') {
  //     return 'grid-cols-3';
  //   } else if (point === 'lg') {
  //     return 'grid-cols-4';
  //   } else {
  //     return 'grid-cols-12';
  //   }
  // };

  return (
    <div className="border-b-2 border-gray-200">
      <div className="min-h-40 flex flex-row">
        <h3 className="color-blue-darkest pr-3 pt-3 font-bold text-xl">
          {sequence.title}
        </h3>
        <p className="color-blue-darkest pt-3">
          {new Date(sequence.modifiedAt).toLocaleString()}
        </p>
      </div>

      {/*  === sequence._id */}

      {selectedSequence && (
        <div className="">
          <div className="min-h-40">
            <p className="color-blue-darkest pr-3 pt-3">
              {sequence.description}
            </p>
          </div>

          <div className="grid gap-4 grid-cols-12 grid-flow-row-dense">
            {sequence &&
              sequence.asanas.map((asana, index) => (
                <div key={`${asana._id}${index}`}>
                  <AsanaCard asana={asana} showAsanaInMySequences={true} />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sequence;
