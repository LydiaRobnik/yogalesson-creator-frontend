import React, { useState } from 'react';
import AsanaCard from '../AsanaCard/AsanaCard';
import useBreakpoint from '../../custom/useBreakpoint';
import './sequence.scss';

const Sequence = ({ sequence, selectedSequence }) => {
  const point = useBreakpoint();

  // // functions
  const gridResponsiveness = () => {
    if (point === 'xs') {
      return 'grid-cols-3';
    } else if (point === 'sm') {
      return 'grid-cols-4';
    } else if (point === 'md') {
      return 'grid-cols-6';
    } else if (point === 'lg') {
      return 'grid-cols-8';
    } else {
      return 'grid-cols-10';
    }
  };

  return (
    <div>
      <div className="w-full min-h-40 flex flex-row justify-between">
        <h3 className="color-blue-darkest pr-3 pt-3 font-bold text-lg">
          {sequence.title}
        </h3>
        <p className="color-blue-darkest pt-3">
          {new Date(sequence.modifiedAt).toLocaleString()}
        </p>
      </div>

      {selectedSequence && (
        <div className="">
          <div className="min-h-40">
            <p className="color-blue-darkest pr-3 pt-3">
              {sequence.description}
            </p>
          </div>

          <div
            className={`grid gap-4 ${gridResponsiveness()} grid-flow-row-dense`}
          >
            {sequence &&
              sequence.asanas.map((asana, index) => (
                <div key={`${asana._id}${index}`}>
                  <AsanaCard asana={asana} />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sequence;
