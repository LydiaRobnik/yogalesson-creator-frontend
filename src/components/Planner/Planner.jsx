import React, { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useOutletContext } from 'react-router-dom';
import './planner.scss';
import Sequence from '../Sequence/Sequence';
import NewSequence from '../NewSequence.jsx/NewSequence';
import SequencePlanned from '../SequencePlanned/SequencePlanned';
import asanaService from '../../api/asanaService';

export default function Planner() {
  const {
    userClasses,
    setUserClasses,
    asanas,
    setAsanas,
    userSequences,
    setUserSequences,
    loading,
    yogaClassToAdd,
    setYogaClassToAdd,
    sequenceToAdd,
    setSequenceToAdd
  } = useOutletContext();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // const [show, setShow] = useState(false);
  const showNewSequence = useRef(false);

  const imgEl = useRef();

  useEffect(() => {
    const saveClassToBackend = async () => {
      if (yogaClassToAdd.title.length === 0)
        setYogaClassToAdd({
          ...yogaClassToAdd,
          title: `${user.name}'s class no. ${userClasses.length + 1}`
        });
      const newClass = { ...yogaClassToAdd };
      const result = await asanaService.saveClass(newClass);
      console.log('📒 saveClass', result);

      // const exampleMongoDBClassId = yogaClassToAdd._id;
      // asanaService
      //   .createClassPreview(imgEl.current, exampleMongoDBClassId)
      //   .catch((err) => {
      //     console.log('err:', err);
      //   });
    };
    saveClassToBackend();
  }, [yogaClassToAdd]);

  const exportImg = () => {
    const exampleMongoDBClassId = yogaClassToAdd._id;
    asanaService
      .createClassPreview(imgEl.current, exampleMongoDBClassId)
      .catch((err) => {
        console.log('err:', err);
      });
  };

  const handleFocus = (event) => event.target.select();

  const createSequence = async () => {
    const newSequence = {
      user: user?.id,
      type: 'sequence',
      duration: 3,
      description: '',
      title: `${user.name}'s draft sequence no. ${
        userSequences.length + 1 + Math.random()
      }`,
      asanas: []
    };
    const result = await asanaService.createSequence(newSequence);
    console.log('📒 newSequence', result);
    setSequenceToAdd(result);
    // setShow(true);
    showNewSequence.current = true;
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
        <div ref={imgEl} className="w-screen">
          <button onClick={exportImg} className="color-blue-darkest">
            create pic
          </button>
          <div className="mx-10 flex flex-row">
            <input
              type="text"
              className="color-blue-darkest text-left px-10 text-4xl"
              placeholder={`${user.name}'s class no. ${userClasses.length + 1}`}
              value={yogaClassToAdd.title}
              onChange={(e) =>
                setYogaClassToAdd({
                  ...yogaClassToAdd,
                  title: e.target.value
                })
              }
              onFocus={handleFocus}
            />
          </div>

          <div className="w-screen mx-10">
            {yogaClassToAdd.plan &&
              yogaClassToAdd.plan.map((sequence, index) => (
                <div
                  key={(sequence._id, index)}
                  className="rounded bg-light m-10"
                >
                  <SequencePlanned sequence={sequence} />
                </div>
              ))}
          </div>

          {showNewSequence && (
            <NewSequence
              handleFocus={handleFocus}
              // setShow={setShow}
              // show={show}
              showNewSequence={showNewSequence}
            />
          )}

          <div className=" w-screen mx-10 flex flex-row justify-center">
            <button
              className="btn-blue btn-blue:hover   mx-2 flex flex-row items-center"
              // data-modal-toggle="defaultModal"
              onClick={() => createSequence()}
            >
              <span className="font-material inline pr-2">add</span>
              <p className="inline pt-1 text-lg ">create new sequence</p>
            </button>

            <button
              className="btn-blue btn-blue:hover mx-2 flex flex-row items-center"
              onClick={() => navigate('/user/sequences')}
            >
              <span className="font-material inline pr-2">add</span>
              <p className="inline pt-1 text-lg ">my sequence</p>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
