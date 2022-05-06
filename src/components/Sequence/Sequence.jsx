import React, { useState } from 'react';
import AsanaCard from '../AsanaCard/AsanaCard';
import { useNavigate, useOutletContext } from 'react-router-dom';
import './sequence.scss';

const Sequence = ({ sequence, selectedSequence }) => {
  const {
    userClasses,
    setUserClasses,
    asanas,
    setAsanas,
    userSequences,
    setUserSequences,
    loading,
    gridResponsiveness,
    yogaClassToAdd,
    setYogaClassToAdd
  } = useOutletContext();
  const navigate = useNavigate();

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
        <>
          <div className="min-h-40">
            <p className="color-blue-darkest pr-3 pt-3">
              {sequence.description}
            </p>
          </div>

          <div className="grid gap-4 grid-col-12">
            {sequence &&
              sequence.asanas.map((asana) => (
                <div key={asana._id} className="col-span-1">
                  <AsanaCard asana={asana} />
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sequence;
