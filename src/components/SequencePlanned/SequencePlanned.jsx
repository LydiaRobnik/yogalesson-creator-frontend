import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useRef
} from 'react';
import AsanaCard from '../AsanaCard/AsanaCard';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useDrop, useDrag } from 'react-dnd';
import update from 'immutability-helper';
import asanaService from '../../api/asanaService';
import { AuthContext } from '../../context/AuthContext';
import Modal from 'react-modal';
import Asanas from '../Asanas/Asanas';
import './sequencePlanned.scss';
import useBreakpoint from '../../custom/useBreakpoint';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    borderRadius: '.7rem',
    border: '2px dotted lightgray',
    overflow: 'hidden',
    width: '80%'
  }
};
Modal.setAppElement('#root');

const SequencePlanned = ({
  sequence,
  handleFocus,
  index,
  moveSequence,
  key
}) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const point = useBreakpoint();
  const { setUserSequences, yogaClassToAdd, setYogaClassToAdd } =
    useOutletContext();

  const ref = useRef(null);

  const [title, setTitle] = useState(sequence.title);
  const [description, setDescription] = useState(sequence.description);
  const [cards, setCards] = useState(sequence.asanas);

  const [modalIsOpen, setIsOpen] = React.useState(false);

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
      // const result = await asanaService.saveSequence(updatedSequence);
      // console.log('📒 saveSequence', result);

      if (yogaClassToAdd._id && yogaClassToAdd.plan?.length > 0) {
        const updatedSequences = yogaClassToAdd?.plan?.map((s) => {
          if (s._id === updatedSequence._id) return updatedSequence;
          return s;
        });

        // update seq in yoga-class
        setYogaClassToAdd((prevClass) => {
          return { ...prevClass, plan: updatedSequences };
        });
      }
    };
    saveSequenceToBackend();
    asanaService.getUserSequences(user.id).then((data) => {
      setUserSequences(data);
    });
  }, [cards, title, description]);

  /**
   * add Asana from modal dialog
   * @param {} asana from Asanas.jsx
   */
  function addAsana(asana) {
    console.log('📒 addAsana', asana);
    setCards((prev) => [...prev, asana]);
    closeModal();
  }

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

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

  const showShortTitle = (title) => {
    if (title.length > 25) {
      const longTitle = title;
      const shortTitle = longTitle.substring(0, 20) + ' ...';
      return shortTitle;
    } else {
      return title;
    }
  };

  const renderCard = useCallback((card, index) => {
    return (
      <div className="flex flex-col content-center">
        <div className="flex flex-col">
          <span
            className="self-center font-material-symbols color-blue-darkest cursor-pointer"
            onClick={() => handleRemoveAsana(card)}
          >
            delete
          </span>
        </div>

        <AsanaCard
          asana={card}
          key={card._id + Math.random()}
          index={index}
          id={card._id}
          moveCard={moveCard}
          asanaInPlanner={true}
        />
      </div>
    );
  }, []);

  // ==End== moving and updating asana array in sequence / drag and drop function ====

  //  ==Start=== drag and drop functions for sequences ====

  // const [{ handlerId }, drop] = useDrop({
  //   accept: 'divSequencePlanned',
  //   collect(monitor) {
  //     return {
  //       handlerId: monitor.getHandlerId()
  //     };
  //   },
  //   hover(item, monitor) {
  //     if (!ref.current) {
  //       return;
  //     }
  //     const dragIndex = item.index;
  //     const hoverIndex = index;
  //     if (dragIndex === hoverIndex) {
  //       return;
  //     }
  //     const hoverBoundingRect = ref.current?.getBoundingClientRect();
  //     const hoverMiddleY =
  //       (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  //     const clientOffset = monitor.getClientOffset();
  //     const hoverClientY = clientOffset.y - hoverBoundingRect.top;

  //     if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
  //       return;
  //     }
  //     if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
  //       return;
  //     }

  //     moveSequence(dragIndex, hoverIndex);
  //     item.index = hoverIndex;
  //   }
  // });

  // const [{ isDragging }, drag] = useDrag({
  //   type: 'divSequencePlanned',
  //   item: () => {
  //     return { key, index };
  //   },
  //   collect: (monitor) => ({
  //     isDragging: monitor.isDragging()
  //   })
  // });

  // drag(drop(ref));

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
    setCards([...cards]);
  };

  return (
    <>
      <div ref={ref} className="w-full flex flex-row justify-between">
        <div className="w-full flex flex-row flex-wrap">
          <input
            type="text"
            className="color-blue-darkest text-lg w-5/6"
            placeholder="draft sequence - title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={handleFocus}
          />

          <p className="color-blue-darkest px-3 pt-3 ">
            {new Date(sequence.modifiedAt).toLocaleString()}
          </p>
        </div>

        <div className="flex flex-row content-center justify-center px-3 border-l-2 border-gray-200">
          <button
            className="btn-red-outline btn-red-outline:hover cursor-pointer outline outline-2 flex flex-row self-center"
            onClick={() => handleRemoveSequence(sequence)}
          >
            <p className="font-material-symbols py-1 px-4">delete</p>
          </button>
        </div>
      </div>

      <>
        <div className="w-full min-h-40">
          <textarea
            // type="text"
            name="description"
            id="description"
            rows="4"
            cols="100"
            className="color-blue-darkest break-words py-4 w-full h-min border-2 border-gray-200 rounded-md mt-3"
            placeholder="add a descrition"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onFocus={handleFocus}
          />
          {/* <p className="color-blue-darkest pl-3 py-3">{sequence.description}</p> */}
        </div>

        <div
          className={`items-center grid gap-4 ${gridResponsiveness()} grid-flow-row-dense`}
        >
          {sequence && cards?.map((asana, index) => renderCard(asana, index))}
          <button
            className="p-6 flex flex-row justify-center self-center content-center items-center border-2 border-gray-200 w-24 h-24 mt-4"
            // onClick={() => navigate('../asanas?from=planner')}
            onClick={() => openModal()}
          >
            <span className="color-blue-darkest font-material-symbols p-4">
              add_circle
            </span>
          </button>
        </div>
      </>
      <div className="text-black">
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          // className="modal"
          // overlayClassName="overlay"
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="text-black relative">
            <button
              onClick={closeModal}
              className="btn-modal-close absolute top-1 right-1"
            >
              ✖️
            </button>
            <h2 className="text-lg font-bold text-center border-dashed border-b-slate-400 border-b bg-blue-dark color-beige-light p-4 pb-2 mb-4">
              Select an Asana
            </h2>
            {/* <ModalAddAsana /> */}
            <div className="modalAsana overflow-scroll overflow-x-hidden">
              <Asanas selection={true} addAsana={addAsana} />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default SequencePlanned;
