import React, { useState, useCallback } from 'react';
import AsanaCard from '../AsanaCard/AsanaCard';
import { useNavigate, useOutletContext } from 'react-router-dom';
import './sequencePlanned.scss';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';

const SequencePlanned = ({ sequence }) => {
  const { yogaClassToAdd, setYogaClassToAdd } = useOutletContext();
  const navigate = useNavigate();

  // mein Array mit Asanas: sequence.asanas
  const [cards, setCards] = useState(sequence.asanas);
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]]
        ]
      })
    );
  }, []);

  const renderCard = useCallback((card, index) => {
    return (
      <AsanaCard
        asana={card}
        key={card._id + Math.random()}
        index={index}
        id={card._id}
        moveCard={moveCard}
      />
    );
  }, []);

  const handleRemoveSequence = (sequence) => {
    const sequenceToRemove = yogaClassToAdd.plan.indexOf(sequence);
    yogaClassToAdd.plan.splice(sequenceToRemove, 1);
    setYogaClassToAdd({ ...yogaClassToAdd });
  };

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

        {/* ref={drop} */}

        <div className="flex flex-wrap">
          {/* {React.cloneElement(children, { isOver })} */}
          {sequence && cards.map((asana, index) => renderCard(asana, index))}
        </div>
      </>
    </>
  );
};

export default SequencePlanned;
