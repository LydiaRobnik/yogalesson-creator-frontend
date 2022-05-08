import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import asanaService from '../../api/asanaService';
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
    width: '80%'
  }
};
Modal.setAppElement('#root');

const NewSequence = ({ handleFocus, saveSequence, cancel }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const point = useBreakpoint();
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

  return (
    <>
      <div className="editSequence w-full min-h-40 px-6 flex flex-col bg-light">
        <input
          type="text"
          maxlength="50"
          className="color-blue-darkest text-xl bg-light"
          placeholder="draft sequence - title"
          value={sequenceToAdd.title}
          onChange={(e) =>
            setSequenceToAdd({ ...sequenceToAdd, title: e.target.value })
          }
          onFocus={handleFocus}
        />
        <textarea
          name="description"
          id="description"
          rows="4"
          cols="50"
          className="color-blue-darkest break-words resize bg-light"
          placeholder="Add your text - maybe for Shavasana "
          value={sequenceToAdd.description}
          onChange={(e) =>
            setSequenceToAdd({ ...sequenceToAdd, description: e.target.value })
          }
          some
          text
          onFocus={handleFocus}
        />

        <div
          className={`grid gap-4 ${gridResponsiveness()} grid-flow-row-dense`}
        >
          {sequenceToAdd.asanas?.map((asana, index) => (
            <div
              key={`${asana._id}${index}`}
              className="flex flex-col items-center"
            >
              <span
                className="font-material-symbols color-blue-darkest cursor-pointer"
                onClick={() => handleRemoveAsana(asana)}
              >
                delete
              </span>
              <AsanaCard asana={asana} />
            </div>
          ))}
          <button className="addAsana" onClick={() => openModal()}>
            <span className="color-blue-darkest font-material-symbols p-4 ">
              add_circle
            </span>
          </button>
        </div>

        <div className="flex flex-row items-center justify-between my-3">
          <div className="flex flex-row items-center">
            <button
              className="btn-blue flex flex-row items-center"
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
