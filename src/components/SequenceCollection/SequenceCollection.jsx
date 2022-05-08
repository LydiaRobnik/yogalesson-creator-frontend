import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import useBreakpoint from '../../custom/useBreakpoint';
import Sequence from '../Sequence/Sequence.jsx';
import asanaService from '../../api/asanaService';
import NewSequence from '../NewSequence.jsx/NewSequence';
import './sequenceCollection.scss';

const newSeqObj = (userId) => ({
  user: userId,
  type: 'sequence',
  duration: '00:00',
  description: '',
  title: '',
  asanas: []
});

const SequenceCollection = (ref) => {
  // states
  const { loggedIn, user } = useContext(AuthContext);
  const {
    userClasses,
    setUserClasses,
    asanas,
    setAsanas,
    userSequences,
    setUserSequences,
    yogaClassToAdd,
    loading,
    setSequenceToAdd,
    setShowNewSequence
  } = useOutletContext();
  const point = useBreakpoint();
  const navigate = useNavigate();

  const [selectedSequence, setSelectedSequence] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [editSequenceId, setEditSequenceId] = useState(-1);

  // useEffect(() => {
  //   console.log('useEffect showNew');
  //   if (showNew) setSequenceToAdd(newSeqObj(user?.id));
  // }, [showNew]);

  const handleSelectSequence = (choice) => {
    yogaClassToAdd.plan.push(choice);
    console.log('sequence selected');
    navigate(`../planner`);
  };

  // const handleCopySequence = async (sequenceToCopy) => {
  //   const copy = {
  //     ...sequenceToCopy,
  //     title: `${sequenceToCopy.title} (copy)`,
  //     _id: ''
  //   };
  //   const result = await asanaService.createSequence(copy);
  //   console.log('📒 newSequence', result);
  //   setSequenceToAdd(result);
  //   setShowNewSequence(true);
  //   navigate(`../planner`);
  // };

  const handleDeleteSequence = async (sequenceToDelete) => {
    const id = sequenceToDelete._id;
    const result = await asanaService.deleteSequence(id);
    console.log('📒 deleteSequence', result);
    asanaService.getUserSequences(user.id).then((data) => {
      setUserSequences(data);
    });
  };

  const handleAddSequence = (sequence) => {
    console.log('addSequence', sequence);
    setSequenceToAdd(newSeqObj(user?.id));
    setShowNew(true);
    setEditSequenceId(-1);
  };

  const handleEditSequence = (sequence) => {
    console.log('editSequence', sequence);
    setSequenceToAdd(sequence);
    setEditSequenceId(sequence._id);
    // setShowNew(true);
  };

  const saveSequence = async (sequence) => {
    // console.log('📒 save new Sequence!');

    sequence.user = user.id;
    if (sequence._id) {
      const result = await asanaService.saveSequence(sequence);
      console.log('📒 saveSequence', result);
    } else {
      const result = await asanaService.createSequence(sequence);
      console.log('📒 createSequence', result);
    }
    await asanaService.getUserSequences(user.id).then((data) => {
      setUserSequences(data);
    });

    setShowNew(false);
    setEditSequenceId(-1);
  };

  const cancelEditSequence = () => {
    setShowNew(false);
    setEditSequenceId(-1);
  };

  const handleFocus = (event) => event.target.select();

  return (
    <>
      {loading && (
        <lottie-player
          src="https://assets1.lottiefiles.com/packages/lf20_s00z9gco.json"
          background="transparent"
          speed="1"
          style={{ width: '300px', height: '300px' }}
          loop
          autoplay
        ></lottie-player>
      )}

      {!loading && (
        <div className="w-full flex flex-col justify-start content-start px-6">
          {/* <h3 className="color-red pl-3 pb-5 text-4xl">
            Click to add one of your sequence to your class
          </h3> */}
          {showNew ? (
            <NewSequence
              handleFocus={handleFocus}
              saveSequence={saveSequence}
              cancel={cancelEditSequence}
            />
          ) : (
            <div className=" w-full flex flex-row justify-start mt-4 mb-6">
              <button
                className="btn-blue btn-blue:hover   mx-2 flex flex-row items-center"
                onClick={() => handleAddSequence()}
              >
                <span className="font-material inline pr-2">add</span>
                <p className="inline pt-1 text-sm md:text-lg ">
                  create new sequence
                </p>
              </button>
            </div>
          )}
          {userSequences &&
            userSequences.map((sequence, index) => (
              <div
                key={`${sequence._id}${index}`}
                className="grid gap-4 grid-cols-12 border-t-2 border-gray-200 mt-4"
              >
                <div className="col-span-1 flex flex-col justify-center">
                  <button
                    className="btn-seqColl-neutral"
                    onClick={() => handleSelectSequence(sequence)}
                  >
                    <span className="font-material-symbols px-2 py-1">
                      add_task
                    </span>
                  </button>
                  <button
                    className="btn-seqColl-neutral "
                    onClick={() => handleEditSequence(sequence)}
                  >
                    <span className="font-material-symbols px-2 py-1">
                      edit
                    </span>
                  </button>

                  <button
                    className="btn-seqColl-red-outline"
                    onClick={() => handleDeleteSequence(sequence)}
                  >
                    <p className="font-material-symbols py-1 px-2">delete</p>
                  </button>
                </div>

                <div className="col-span-11">
                  {sequence._id === editSequenceId ? (
                    <NewSequence
                      handleFocus={handleFocus}
                      saveSequence={saveSequence}
                      cancel={cancelEditSequence}
                    />
                  ) : (
                    <Sequence
                      sequence={sequence}
                      selectedSequence={selectedSequence}
                      handleEditSequence={handleEditSequence}
                    />
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default SequenceCollection;
