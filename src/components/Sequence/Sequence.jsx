import React, { useState } from 'react';
import AsanaCard from '../AsanaCard/AsanaCard';
import useBreakpoint from '../../custom/useBreakpoint';
import './sequence.scss';

const Sequence = ({
  sequence,
  selectedSequence,
  handleDeleteSequence,
  handleEditSequence
}) => {
  const point = useBreakpoint();

  // // functions
  const gridResponsiveness = () => {
    if (point === 'xs') {
      return 'grid-cols-2';
    } else if (point === 'sm') {
      return 'grid-cols-3';
    } else if (point === 'md') {
      return 'grid-cols-4';
    } else if (point === 'lg') {
      return 'grid-cols-6';
    } else if (point === 'xl') {
      return 'grid-cols-7';
    } else if (point === '2xl') {
      return 'grid-cols-8';
    } else {
      return 'grid-cols-9';
    }
  };

  return (
    <div className="grid gap-4 grid-cols-12">
      <div className="col-span-11">
        <div className="w-full min-h-40 flex flex-row flex-wrap justify-between">
          <div className="flex flex-row flex-wrap  justify-start sm:justify-center pt-3">
            <div className="w-16 border-2 border-gray-200 rounded flex flex-row items-center self-center mr-3">
              <span className="font-material-symbols text-gray-400 text-lg px-1">
                schedule
              </span>
              <p className="pl-2 pt-1 text-gray-400 w-8">{sequence.duration}</p>
            </div>
            <h3 className="color-blue-darkest pr-3 pt-2 font-bold text-lg">
              {sequence.title}
            </h3>
          </div>
          <p className="color-blue-darkest pt-4 pr-5">
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
              // className="flex flex-row flex-wrap justify-start"
            >
              {sequence &&
                sequence.asanas.map((asana, index) => (
                  <div key={`${asana._id}${index}`} className="grow">
                    <AsanaCard asana={asana} />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      <div className="col-span-1 flex flex-col justify-start mt-3">
        <button
          className="btn-seqColl-blue "
          onClick={() => handleEditSequence(sequence)}
        >
          <span className="font-material-symbols px-2 py-1">edit</span>
        </button>
        <button
          className="btn-seqColl-red-outline"
          onClick={() => handleDeleteSequence(sequence)}
        >
          <p className="font-material-symbols py-1 px-2">delete</p>
        </button>
      </div>
    </div>
  );
};

export default Sequence;
