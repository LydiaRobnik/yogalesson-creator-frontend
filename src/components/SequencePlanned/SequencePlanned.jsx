import React, { useState, useCallback, useEffect, useContext } from 'react';
import AsanaCard from '../AsanaCard/AsanaCard';
import { useNavigate, useOutletContext } from 'react-router-dom';
import './sequencePlanned.scss';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import asanaService from '../../api/asanaService';
import { AuthContext } from '../../context/AuthContext';

const SequencePlanned = ({ sequence }) => {
  const { yogaClassToAdd, setYogaClassToAdd, setUserSequences } =
    useOutletContext();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

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

  useEffect(() => {
    const saveSequenceToBackend = async () => {
      const oldSequenceInBackend = { ...sequence };
      const updatedSequence = { ...sequence, asanas: cards };
      const result = await asanaService.saveSequence(updatedSequence);
      console.log('📒 saveSequence', result);
    };
    saveSequenceToBackend();
    asanaService.getUserSequences(user.id).then((data) => {
      setUserSequences(data);
    });
  }, [cards]);

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

        <div className="flex flex-wrap">
          {sequence && cards.map((asana, index) => renderCard(asana, index))}
        </div>
      </>
    </>
  );
};

export default SequencePlanned;
