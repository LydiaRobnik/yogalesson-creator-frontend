import React, { useState, useCallback, useEffect, useContext } from 'react';
import AsanaCard from '../AsanaCard/AsanaCard';
import { useNavigate, useOutletContext } from 'react-router-dom';
import './sequencePlanned.scss';
// import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import asanaService from '../../api/asanaService';
import { AuthContext } from '../../context/AuthContext';

const SequencePlanned = ({ sequence, handleFocus }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const {
    userSequences,
    setUserSequences,
    yogaClassToAdd,
    setYogaClassToAdd,
    sequenceToAdd,
    setSequenceToAdd,
    setShowNewSequence
  } = useOutletContext();

  const [title, setTitle] = useState(sequence.title);
  const [description, setDescription] = useState(sequence.description);
  const [plannedSequence, setPlannedSequence] = useState(sequence);
  console.log('asanas', plannedSequence.asanas);

  // ==Start== moving and updating asana array in sequence / drag and drop function ====
  const [cards, setCards] = useState(sequence.asanas);
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    // const cardsBeforMoving = plannedSequence.asanas;
    // const cardsAfterMoving = cardsBeforMoving.splice([
    //   [dragIndex, 1],
    //   [hoverIndex, 0, cardsBeforMoving[dragIndex]]
    // ]);

    // setPlannedSequence({ ...plannedSequence, asanas: cardsAfterMoving });

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
      const updatedSequence = {
        ...sequence,
        asanas: plannedSequence.asanas,
        title: title,
        description: description
      };
      const result = await asanaService.saveSequence(updatedSequence);
      console.log('📒 saveSequence', result);
    };
    saveSequenceToBackend();
    asanaService.getUserSequences(user.id).then((data) => {
      setUserSequences(data);
    });
  }, [cards, plannedSequence, title, description]);

  const renderCard = useCallback((card, index) => {
    return (
      <>
        <AsanaCard
          asana={card}
          key={card._id + Math.random()}
          index={index}
          id={card._id}
          moveCard={moveCard}
          setPlannedSequence={setPlannedSequence}
          plannedSequence={plannedSequence}
        />
        <span
          className="font-material-symbols color-blue-darkest cursor-pointer"
          onClick={() => handleRemoveAsana(card)}
        >
          delete
        </span>
      </>
    );
  }, []);

  // ==End== moving and updating asana array in sequence / drag and drop function ====

  // edit functions
  const handleRemoveSequence = (sequence) => {
    const sequenceToRemove = yogaClassToAdd.plan.indexOf(sequence);
    yogaClassToAdd.plan.splice(sequenceToRemove, 1);
    setYogaClassToAdd({ ...yogaClassToAdd });
  };

  // const vvv = (asana) => {
  //   const asanaToRemove = sequenceToAdd.asanas.indexOf(asana);
  //   sequenceToAdd.asanas.splice(asanaToRemove, 1);
  //   setSequenceToAdd({ ...sequenceToAdd });
  // };

  // const handleRemoveAsana = (asana) => {
  //   const removeIndex = cards.indexOf(asana);
  //   const newCards = cards.splice(removeIndex, 1);
  //   setCards(newCards);
  // };

  const handleRemoveAsana = (asana) => {
    const removeIndex = plannedSequence.asanas.indexOf(asana);
    const newCards = plannedSequence.asanas.splice(removeIndex, 1);
    setPlannedSequence({ ...plannedSequence, asanas: newCards });
  };

  return (
    <>
      <div className="w-full min-h-40 flex flex-row justify-between">
        <div className="flex flex-row">
          <input
            type="text"
            className="color-blue-darkest text-xl"
            placeholder="draft sequence - title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={handleFocus}
          />

          {/* 
          <h3 className="color-blue-darkest pl-3 p-3 font-bold text-xl">
            {sequence.title}
          </h3> */}
          <p className="color-blue-darkest pl-3 pt-3">
            {new Date(sequence.modifiedAt).toLocaleString()}
          </p>
        </div>

        <div>
          <button
            className="btn-blue btn-blue:hover mx-2 flex flex-row items-center"
            onClick={() => navigate('../asanas')}
          >
            <span className="font-material inline pr-2">add</span>
            <p className="inline pt-1 text-lg ">asana</p>
          </button>
          <span
            className="font-material-symbols color-blue-darkest cursor-pointer"
            onClick={() => handleRemoveSequence(sequence)}
          >
            delete
          </span>
        </div>
      </div>

      <>
        <div className="w-full min-h-40">
          <input
            type="text"
            className="color-blue-darkest break-words resize w-52 py-4"
            placeholder="add a descrition"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onFocus={handleFocus}
          />
          {/* <p className="color-blue-darkest pl-3 py-3">{sequence.description}</p> */}
        </div>

        <div className="flex flex-wrap">
          {sequence &&
            plannedSequence.asanas.map((asana, index) =>
              renderCard(asana, index)
            )}
        </div>
      </>
    </>
  );
};

export default SequencePlanned;
