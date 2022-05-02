import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

const AsanaCard = ({ asana }) => {
  const navigate = useNavigate();

  const {
    selectedAsanas,
    setSelectedAsanas,
    userClasses,
    setUserClasses,
    asanas,
    setAsanas,
    userSequences,
    setUserSequences,
    loading,
    gridResponsiveness,
    selectedSequences,
    setSelectedSequences,
    yogaClassToAdd,
    setYogaClassToAdd,
    sequenceToAdd,
    setSequenceToAdd
  } = useOutletContext();

  function handleSelectAsana() {
    sequenceToAdd.asanas.push(asana);
    navigate(`../planner`);
  }

  return (
    <div
      onClick={handleSelectAsana}
      className="w-56 rounded overflow-hidden shadow-lg m-2 cursor-pointer bg-white"
    >
      <img
        className="object-scale-down h-48 w-96"
        src={asana.img_url}
        alt="preview class"
      />
      <div className="px-6 pt-3 pb-3 bg-light h-20">
        <h3 className="color-blue-darkest font-bold text-xs">
          {asana.asana.sanskrit}
        </h3>
        <h3 className="color-blue-darkest text-xs">{asana.asana.name}</h3>
      </div>
    </div>
  );
};

export default AsanaCard;
