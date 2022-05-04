import React from 'react';
import AsanaCard from '../AsanaCard/AsanaCard';
import { useNavigate, useOutletContext } from 'react-router-dom';
import './sequencePlanned.scss';

const SequencePlanned = ({ sequence }) => {
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

  const handleRemoveSequence = (sequence) => {
    const sequenceToRemove = yogaClassToAdd.plan.indexOf(sequence);
    yogaClassToAdd.plan.splice(sequenceToRemove, 1);
    setYogaClassToAdd({ ...yogaClassToAdd });
  };

  const handleDeleteSequence = (sequence) => {};

  return (
    <>
      <div className="w-screen min-h-40">
        <h3 className="color-blue-darkest pl-3 p-3 font-bold text-xl">
          {sequence.title}
        </h3>
        <p className="color-blue-darkest">
          {new Date(sequence.modifiedAt).toLocaleString()}
        </p>
        <span
          className="font-material-symbols color-blue-darkest cursor-pointer"
          onClick={() => handleRemoveSequence(sequence)}
        >
          delete
        </span>
      </div>

      <>
        <div className="w-screen min-h-40">
          <p className="color-blue-darkest pl-3 py-3">{sequence.description}</p>
        </div>

        <div className="flex flex-wrap">
          {sequence &&
            sequence.asanas.map((asana) => (
              <div key={asana._id}>
                <AsanaCard asana={asana} />
              </div>
            ))}
        </div>
      </>
    </>
  );
};

export default SequencePlanned;
