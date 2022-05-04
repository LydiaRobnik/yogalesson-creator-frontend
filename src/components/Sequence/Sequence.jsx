import React, { useState } from 'react';
import AsanaCard from '../AsanaCard/AsanaCard';
import { useNavigate, useOutletContext } from 'react-router-dom';
import './sequence.scss';

const Sequence = ({ sequence, showMore }) => {
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
    <>
      <div className="min-h-40">
        <h3 className="color-blue-darkest pr-3 pt-3 font-bold text-xl">
          {sequence.title}
        </h3>
        <p className="color-blue-darkest">
          {new Date(sequence.modifiedAt).toLocaleString()}
        </p>
      </div>

      {showMore && (
        <>
          <div className="min-h-40">
            <p className="color-blue-darkest pr-3 pt-3">
              {sequence.description}
            </p>
          </div>

          <div className={'flex flex-row'}>
            {sequence &&
              sequence.asanas.map((asana) => (
                <div key={asana._id}>
                  <AsanaCard asana={asana} />
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Sequence;
