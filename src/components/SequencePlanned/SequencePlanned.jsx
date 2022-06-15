import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useRef
} from 'react';
import AsanaCard from '../AsanaCard/AsanaCard';
import { useNavigate, useOutletContext } from 'react-router-dom';
import update from 'immutability-helper';
// import asanaService from '../../api/asanaService';
import { AuthContext } from '../../context/AuthContext';
import Modal from 'react-modal';
import Asanas from '../Asanas/Asanas';
import './sequencePlanned.scss';
import useBreakpoint from '../../custom/useBreakpoint';
//import { forwardRef } from "react";

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
    width: '85%',
    maxWidth: '1024px'
  }
};
Modal.setAppElement('#root');

/* const SequencePlanned = forwardRef ((
//   {
  // sequence,
  // handleFocus,
  // index,
  // moveSequence,
//   key
// },
 props, ref) => {
  const { sequence, handleFocus, index, moveSequence} = props */
const SequencePlanned = ({ sequence, handleFocus }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const point = useBreakpoint();
  const { setUserSequences, yogaClassToAdd, setYogaClassToAdd } =
    useOutletContext();
  //const { sequence, handleFocus} = props
  const ref = useRef(null);
  const { asanaService, addSystemError, addSystemSuccess } = useOutletContext();

  //const ref = useRef(null);

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

  //  ==End== moving and updating asana array in sequence / drag and drop function ====

  /**
   * add Asana from modal dialog
   * @param {} asana from Asanas.jsx
   */
  function addAsana(asana) {
    console.log('📒 addAsanas', [...cards].concat(asana));
    setCards((prev) => [...prev].concat(asana));
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

  // edit functions
  const handleRemoveSequence = (sequence) => {
    const sequenceToRemove = yogaClassToAdd.plan.indexOf(sequence);
    yogaClassToAdd.plan.splice(sequenceToRemove, 1);
    setYogaClassToAdd({ ...yogaClassToAdd });
    addSystemSuccess('Sequence removed');
  };

  const handleRemoveAsana = (asana) => {
    const removeIndex = cards.indexOf(asana);
    cards.splice(removeIndex, 1);
    setCards([...cards]);
  };

  return (
    <>
      <div className="w-full flex flex-row justify-between">
        <div className="w-full flex flex-row flex-wrap">
          <input
            type="text"
            className="color-blue-darkest text-lg w-5/6 resize-y"
            placeholder="draft sequence - title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={handleFocus}
          />

          <p className="color-blue-darkest px-3 pt-3 ">
            {new Date(sequence.modifiedAt).toLocaleString()}
          </p>
        </div>

        <div className="trash flex flex-row content-center justify-center px-3 border-l-2 border-gray-200">
          <button
            className="trash btn-seqColl-red-outline cursor-pointer outline outline-2 flex flex-row self-center"
            onClick={() => handleRemoveSequence(sequence)}
          >
            <p className="trash font-material-symbols py-1 px-2">close</p>
          </button>
        </div>
      </div>

      <>
        <div className="w-full min-h-40 pt-3">
          <span
            role="textbox"
            id="description"
            className="color-blue-darkest break-words py-4 w-full h-min rounded-md mt-3"
            placeholder="add a descrition"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onFocus={handleFocus}
            contenteditable="true"
          >
            {description}
          </span>
        </div>

        <div
          className={`items-center grid gap-4 ${gridResponsiveness()} grid-flow-row-dense print:grid-cols-6 `}
        >
          {sequence &&
            cards?.map((card, index) => (
              <>
                <div className={`flex flex-col content-center fade-in`}>
                  <div className="flex flex-col trash">
                    <span
                      className="delete"
                      onClick={() => handleRemoveAsana(card)}
                    >
                      delete
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <AsanaCard
                      asana={card}
                      key={card._id + Math.random()}
                      index={index}
                      id={card._id}
                      moveCard={moveCard}
                      sequencePlannedStyles={true}
                    />
                  </div>
                </div>
              </>
            ))}
          <button className="trash addAsana" onClick={() => openModal()}>
            <span className="trash color-blue-darkest font-material-symbols p-4">
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
            <h2 className="text-lg font-bold text-center border-dashed border-b-slate-400 border-b bg-blue-dark color-beige-light p-4 pb-2">
              Select an Asana
            </h2>
            {/* <ModalAddAsana /> */}
            <div className="modalAsana overflow-scroll overflow-x-hidden bg-light pt-4">
              <Asanas selection={true} addAsana={addAsana} />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default SequencePlanned;
