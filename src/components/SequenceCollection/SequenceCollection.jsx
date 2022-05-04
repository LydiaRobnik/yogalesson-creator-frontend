import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './sequenceCollection.scss';
import useBreakpoint from '../../custom/useBreakpoint';
import Sequence from '../Sequence/Sequence.jsx';
import asanaService from '../../api/asanaService';

const SequenceCollection = () => {
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

  const [selectedSequence, setSelectedSequence] = useState(null);
  // const [showMore, setShowMore] = useState(false);
  // const toggleAsanas = () => {
  //   setShowMore(!showMore);
  // };

  const showAsanasOfSequence = (sequenceId) => {
    setSelectedSequence(sequenceId);
  };

  const handleSelectSequence = (choice) => {
    yogaClassToAdd.plan.push(choice);
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
        <div className="w-screen flex flex-col justify-start content-start px-6">
          <h3 className="color-red pl-3 pb-5 text-4xl">
            Click to add one of your sequence to your class
          </h3>
          {userSequences &&
            userSequences.map((sequence) => (
              <div key={sequence._id} className="flex flex-row mb-3">
                <div>
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
                </div>

                <div key={sequence._id}>
                  <Sequence
                    sequence={sequence}
                    selectedSequence={selectedSequence}
                  />
                </div>

                <button
                  className="btn-blue btn-blue:hover mx-2 flex flex-row items-center cursor-pointer p-0 self-center"
                  onClick={() => handleSelectSequence(sequence)}
                >
                  {/* <span className="font-material inline pr-2">add</span> */}
                  <p className="inline pt-1 text-lg">add</p>
                </button>
                <button
                  className="btn-blue btn-blue:hover mx-2 flex flex-row items-center cursor-pointer p-0 self-center"
                  onClick={() => handleCopySequence(sequence)}
                >
                  <p className="inline pt-1 text-lg">copy</p>
                </button>
                <button
                  className="btn-red btn-blue:hover m-2 p-0 flex flex-row items-center cursor-pointer self-center"
                  onClick={() => handleDeleteSequence(sequence)}
                >
                  <p className="font-material-symbols p-0">delete</p>
                </button>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default SequenceCollection;
