import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
// import asanaService from '../../api/asanaService';
import { AuthContext } from '../../context/AuthContext';
import AsanaCard from '../AsanaCard/AsanaCard';
import Modal from 'react-modal';
import './newSequence.scss';
import Asanas from '../Asanas/Asanas';
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
    width: '85%',
    maxWidth: '1024px'
  }
};
Modal.setAppElement('#root');

const NewSequence = ({ handleFocus, saveSequence, cancel }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const point = useBreakpoint();
  console.log('user', user.id);
  const { sequenceToAdd, setSequenceToAdd } = useOutletContext();
  const { asanaService, addSystemError, addSystemSuccess } = useOutletContext();

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [timeToConvert, setTimeToConvert] = useState();

  useEffect(() => {
    const saveSequenceToBackend = async () => {
      if (sequenceToAdd.title.length === 0)
        setSequenceToAdd({
          ...sequenceToAdd,
          title: `draft - new sequence`
        });
      // const newSequence = { ...sequenceToAdd };
      // const result = await asanaService.saveSequence(newSequence);
      // console.log('📒 saveSequence', result);
    };
    saveSequenceToBackend();
    // asanaService.getUserSequences(user.id).then((data) => {
    //   setUserSequences(data);
    // });
  }, [sequenceToAdd]);

  const handleRemoveAsana = (asana) => {
    const asanaToRemove = sequenceToAdd.asanas.indexOf(asana);
    sequenceToAdd.asanas.splice(asanaToRemove, 1);
    setSequenceToAdd({ ...sequenceToAdd });
  };

  const addSequenceToClass = async () => {
    saveSequence({ ...sequenceToAdd });
  };

  /**
   * add Asana from modal dialog
   * @param {} asana from Asanas.jsx
   */
  function addAsana(asana) {
    // console.log('📒 addAsana', asana);
    setSequenceToAdd((prev) => {
      // prev.asanas.forEach((asana) => (asana.new = false));
      asana.forEach((asana) => (asana.new = true));
      console.log('📒 addAsanas', [...sequenceToAdd.asanas].concat(asana));
      return { ...prev, asanas: [...prev.asanas].concat(asana) };
    });
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
      return 'grid-cols-3';
    } else if (point === 'lg') {
      return 'grid-cols-4';
    } else if (point === 'xl') {
      return 'grid-cols-6';
    } else if (point === '2xl') {
      return 'grid-cols-7';
    } else {
      return 'grid-cols-8';
    }
  };

  console.log('timeToConvert', typeof timeToConvert);

  return (
    <>
      <div className="editSequence w-full min-h-40 p-2 sm:p-4 md:p-6 bg-light flex flex-row justify-between">
        <div className="flex flex-col w-4/5 sm:w-11/12 md:w-full mr-2 lg:mr-0 bg-white">
          <div className="flex flex-row flex-wrap">
            <div className="flex flex-row items-center my-2 border-2 border-current color-blue-darkest rounded w-32">
              <span className="font-material-symbols color-blue-darkest text-lg px-1">
                schedule
              </span>
              <input
                type="number"
                required
                className="color-blue-darkest text-lg bg-white w-24 text-center"
                placeholder="minutes"
                // value={timeToConvert}
                onChange={(e) =>
                  setSequenceToAdd({
                    ...sequenceToAdd,
                    duration: +e.target.value
                  })
                }
                onFocus={handleFocus}
              />
            </div>
            <input
              type="text"
              maxlength="50"
              className="color-blue-darkest text-xl ml-4 pt-1 w-full"
              placeholder="draft sequence - title"
              value={sequenceToAdd.title}
              onChange={(e) =>
                setSequenceToAdd({ ...sequenceToAdd, title: e.target.value })
              }
              onFocus={handleFocus}
            />
          </div>

          <textarea
            name="description"
            id="description"
            rows="4"
            cols="50"
            className="color-blue-darkest break-words resize border-2 border-gray-300 mr-3 p-1 rounded"
            placeholder="Add your text - maybe for Shavasana "
            value={sequenceToAdd.description}
            onChange={(e) =>
              setSequenceToAdd({
                ...sequenceToAdd,
                description: e.target.value
              })
            }
            onFocus={handleFocus}
          />

          <div
            className={`grid gap-1 ${gridResponsiveness()} grid-flow-row-dense`}
          >
            {sequenceToAdd.asanas?.map((asana, index) => (
              <div
                key={`${asana._id}${index}`}
                className={`flex flex-col items-center ${
                  asana.new === true && 'fade-in'
                }`}
              >
                <span
                  className="font-material-symbols color-blue-darkest cursor-pointer"
                  onClick={() => handleRemoveAsana(asana)}
                >
                  delete
                </span>
                <div
                  className={`h-full ${
                    asana.new === true && 'border-2 border-green-500 rounded-md'
                  }`}
                >
                  <div className="h-full flex flex-col">
                    <AsanaCard asana={asana} />
                  </div>
                </div>
              </div>
            ))}
            <button className="addAsana" onClick={() => openModal()}>
              <span className="color-blue-darkest font-material-symbols p-4 ">
                add_circle
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between items-end  w-12 lg:w-32">
          <div className="flex flex-row">
            <button
              className="btn-redNew flex flex-row items-center w-12 lg:w-24 ml-1"
              onClick={() => cancel()}
            >
              <span className="font-material-symbols inline pl-2 lg:pl-0 pr-1">
                cancel
              </span>
              <p className="inline pt-1 text-lg invisible lg:visible">cancel</p>
            </button>
          </div>
          <div className="flex flex-row ">
            <button
              className="btn-blueNew flex flex-row items-center lg:px-2 py-2 w-12 lg:w-24 ml-1"
              onClick={() => addSequenceToClass()}
            >
              <span className="font-material-symbols inline pl-4 lg:pl-1 lg:pr-2">
                save
              </span>
              <p className="inline p-0 lg:pt-1 text-lg invisible lg:visible">
                save
              </p>
            </button>
          </div>
        </div>
      </div>
      <div className="text-black">
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
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
            <div className="modalAsana overflow-scroll overflow-x-hidden pt-4">
              <Asanas selection={true} addAsana={addAsana} />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default NewSequence;
