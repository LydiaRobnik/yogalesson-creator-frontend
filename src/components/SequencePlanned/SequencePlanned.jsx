import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useRef
} from 'react';
import AsanaCard from '../AsanaCard/AsanaCard';
import { useNavigate, useOutletContext } from 'react-router-dom';
import './sequencePlanned.scss';
import { useDrop, useDrag } from 'react-dnd';
import update from 'immutability-helper';
import asanaService from '../../api/asanaService';
import { AuthContext } from '../../context/AuthContext';

const SequencePlanned = ({
  sequence,
  handleFocus,
  index,
  moveSequence,
  key
}) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { setUserSequences, yogaClassToAdd, setYogaClassToAdd } =
    useOutletContext();

  const ref = useRef(null);

  const [title, setTitle] = useState(sequence.title);
  const [description, setDescription] = useState(sequence.description);
  const [cards, setCards] = useState(sequence.asanas);

  // ==Start== moving and updating asana array in sequence / drag and drop function ====
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
      const updatedSequence = {
        ...sequence,
        asanas: cards,
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
  }, [cards, title, description]);

  const renderCard = useCallback((card, index) => {
    return (
      <>
        <AsanaCard
          asana={card}
          key={card._id + Math.random()}
          index={index}
          id={card._id}
          moveCard={moveCard}
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

  //  ==Start=== drag and drop functions for sequences ====

  const [{ handlerId }, drop] = useDrop({
    accept: 'divSequencePlanned',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveSequence(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'divSequencePlanned',
    item: () => {
      return { key, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  drag(drop(ref));

  //  ==End=== drag and drop functions for sequences ====

  // edit functions
  const handleRemoveSequence = (sequence) => {
    const sequenceToRemove = yogaClassToAdd.plan.indexOf(sequence);
    yogaClassToAdd.plan.splice(sequenceToRemove, 1);
    setYogaClassToAdd({ ...yogaClassToAdd });
  };

  const handleRemoveAsana = (asana) => {
    const removeIndex = cards.indexOf(asana);
    cards.splice(removeIndex, 1);
    setCards(...cards);
  };

  return (
    <>
      <div ref={ref} className="w-full min-h-40 flex flex-row justify-between">
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
            onClick={() => navigate('../asanas?from=planner')}
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
          {sequence && cards.map((asana, index) => renderCard(asana, index))}
        </div>
      </>
    </>
  );
};

export default SequencePlanned;
