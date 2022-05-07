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
  duration: 3,
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

  // useEffect(() => {
  //   console.log('useEffect showNew');
  //   if (showNew) setSequenceToAdd(newSeqObj(user?.id));
  // }, [showNew]);

  const handleSelectSequence = (choice) => {
    yogaClassToAdd.plan.push(choice);
    console.log('sequence selected');
    navigate(`../planner`);
  };

  const handleCopySequence = async (sequenceToCopy) => {
    const copy = {
      ...sequenceToCopy,
      title: `${sequenceToCopy.title} (copy)`,
      _id: ''
    };
    const result = await asanaService.createSequence(copy);
    console.log('📒 newSequence', result);
    setSequenceToAdd(result);
    setShowNewSequence(true);
    navigate(`../planner`);
  };

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
  };

  const handleEditSequence = (sequence) => {
    console.log('editSequence', sequence);
    setSequenceToAdd(sequence);
    setShowNew(true);
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
  };

  const cancelEditSequence = () => {
    setShowNew(false);
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
            <div className=" w-full flex flex-row justify-center mt-4">
              <button
                className="btn-blue btn-blue:hover   mx-2 flex flex-row items-center"
                onClick={() => handleAddSequence()}
              >
                <span className="font-material inline pr-2">add</span>
                <p className="inline pt-1 text-lg ">create new sequence</p>
              </button>
              <button
                className="btn-blue btn-blue:hover   mx-2 flex flex-row items-center"
                onClick={() => handleEditSequence(userSequences[3])}
              >
                <span className="font-material inline pr-2">add</span>
                <p className="inline pt-1 text-lg ">edit sequence</p>
              </button>
            </div>
          )}
          {userSequences &&
            userSequences.map((sequence, index) => (
              <div
                key={`${sequence._id}${index}`}
                className="grid gap-4 grid-cols-12"
              >
                {/* <div>
                  {selectedSequence !== sequence._id && (
                    <>
                      <span
                        className="font-material-symbols color-blue-darkest text-4xl px-3 cursor-pointer"
                        onClick={() => showAsanasOfSequence(sequence._id)}
                      >
                        expand_more
                      </span>
                    </>
                  )}
                  {selectedSequence === sequence._id && (
                    <span
                      className="font-material-symbols color-blue-darkest text-4xl px-3 cursor-pointer"
                      onClick={() => showAsanasOfSequence(null)}
                    >
                      expand_less
                    </span>
                  )}
                </div> */}

                <div className="col-span-11">
                  <Sequence
                    sequence={sequence}
                    selectedSequence={selectedSequence}
                  />
                </div>
                <div className="col-span-1">
                  <button
                    className="btn-blue btn-blue:hover m-2 p-2 flex flex-row items-center cursor-pointer self-center"
                    onClick={() => handleSelectSequence(sequence)}
                  >
                    {/* <span className="font-material inline pr-2">add</span> */}
                    <p className="inline pt-1 text-lg">add</p>
                  </button>
                  <button
                    className="btn-blue btn-blue:hover m-2 p-2 flex flex-row items-center cursor-pointer self-center"
                    onClick={() => handleCopySequence(sequence)}
                  >
                    <p className="inline pt-1 text-lg">copy</p>
                  </button>
                  <button
                    className="btn-red btn-blue:hover m-2 p-2 flex flex-row items-center cursor-pointer self-center"
                    onClick={() => handleDeleteSequence(sequence)}
                  >
                    <p className="font-material-symbols p-0">delete</p>
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
     
    
    </>
  );
};

export default SequenceCollection;
