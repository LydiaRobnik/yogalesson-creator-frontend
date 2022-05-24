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
        <div className="flex flex-row justify-center pt-2">
          <div className="w-16 border-2 border-gray-200 rounded flex flex-row row-wrap items-center self-center">
            <span className="font-material-symbols color-blue-darkest text-lg px-1">
              schedule
            </span>
            <p className="pl-2 pt-1 color-blue-darkest w-8">
              {sequence.duration}
            </p>
          </div>
          <h3 className="color-blue-darkest px-3 pt-2 font-bold text-lg">
            {sequence.title}
          </h3>
        </div>
        <p className="color-blue-darkest pt-4">
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
