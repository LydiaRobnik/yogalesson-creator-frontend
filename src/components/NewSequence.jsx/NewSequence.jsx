import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import asanaService from '../../api/asanaService';
import { AuthContext } from '../../context/AuthContext';
import AsanaCard from '../AsanaCard/AsanaCard';
import Modal from 'react-modal';
import './newSequence.scss';
import Asanas from '../Asanas/Asanas';

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

const NewSequence = ({ handleFocus, saveSequence, cancel }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  console.log('user', user.id);
  const {
    userSequences,
    setUserSequences,
    yogaClassToAdd,
    setYogaClassToAdd,
    sequenceToAdd,
    setSequenceToAdd,
    setShowNewSequence
  } = useOutletContext();

  const [modalIsOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    const saveSequenceToBackend = async () => {
      if (sequenceToAdd.title.length === 0)
        setSequenceToAdd({
          ...sequenceToAdd,
          title: `${user.name}'s sequence no. ${
            userSequences.length + 1 + Math.random()
          }`
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

    // const newSequence = { ...sequenceToAdd };
    // yogaClassToAdd.plan.push(newSequence);

    // const seqObj = {
    //   user: user?.id,
    //   type: 'sequence',
    //   duration: 3,
    //   description: '',
    //   title: '',
    //   asanas: []
    // };
    // setSequenceToAdd(seqObj);
    // setShowNewSequence(false);
  };
  /**
   * add Asana from modal dialog
   * @param {} asana from Asanas.jsx
   */
  function addAsana(asana) {
    console.log('📒 addAsana', asana);
    setSequenceToAdd((prev) => {
      return { ...prev, asanas: [...prev.asanas, asana] };
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

  return (
    <>
      <div className="border-2 border-grey-500 w-full min-h-40 px-6 flex flex-col resize">
        <input
          type="text"
          className="color-blue-darkest text-xl"
          placeholder="draft sequence - title"
          value={sequenceToAdd.title}
          onChange={(e) =>
            setSequenceToAdd({ ...sequenceToAdd, title: e.target.value })
          }
          onFocus={handleFocus}
        />
        <input
          type="text"
          className="color-blue-darkest break-words resize "
          placeholder="add a descrition"
          value={sequenceToAdd.description}
          onChange={(e) =>
            setSequenceToAdd({ ...sequenceToAdd, description: e.target.value })
          }
          some
          text
          onFocus={handleFocus}
        />

        <div className="flex">
          {sequenceToAdd.asanas?.map((asana, index) => (
            <div
              key={`${asana._id}${index}`}
              className="flex flex-col items-center"
            >
              <AsanaCard asana={asana} />
              <span
                className="font-material-symbols color-blue-darkest cursor-pointer"
                onClick={() => handleRemoveAsana(asana)}
              >
                delete
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <button
              className="btn-blue btn-blue:hover mx-2 flex flex-row items-center"
              // onClick={() => navigate('../asanas?from=planner')}
              onClick={() => openModal()}
            >
              <span className="font-material inline pr-2">add</span>
              <p className="inline pt-1 text-lg ">asana</p>
            </button>

            <button
              className="btn-red btn-blue:hover mx-2 flex flex-row items-center"
              onClick={() => addSequenceToClass()}
            >
              <span className="font-material-symbols inline pr-2">save</span>
              <p className="inline pt-1 text-lg">save sequence</p>
            </button>
          </div>

          <button
            className="btn-red btn-blue:hover mx-2 flex flex-row items-center"
            onClick={() => cancel()}
          >
            <span className="font-material-symbols inline pr-2">cancel</span>
            <p className="inline pt-1 text-lg">cancel</p>
          </button>
        </div>
      </div>
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

export default NewSequence;
