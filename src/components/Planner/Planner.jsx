import React, { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useOutletContext } from 'react-router-dom';
import './planner.scss';
// import NewSequence from '../NewSequence.jsx/NewSequence';
import SequencePlanned from '../SequencePlanned/SequencePlanned';
import asanaService from '../../api/asanaService';

export default function Planner() {
  const {
    userClasses,
    setUserClasses,
    userSequences,
    loading,
    yogaClassToAdd,
    setYogaClassToAdd,
    setSequenceToAdd,
    showNewSequence
  } = useOutletContext();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const imgEl = useRef(null);

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

      const classToShowOnPreviewPic = yogaClassToAdd._id;
      asanaService
        .createClassPreview(imgEl.current, classToShowOnPreviewPic)
        .catch((err) => {
          console.log('err:', err);
        });
    };
    saveClassToBackend();
  }, [yogaClassToAdd]);

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
    yogaClassToAdd.plan.push(result);
    setYogaClassToAdd({ ...yogaClassToAdd });
    const seqObj = {
      user: user?.id,
      type: 'sequence',
      duration: 3,
      description: '',
      title: '',
      asanas: []
    };
    setSequenceToAdd(seqObj);
    // setSequenceToAdd(result);
    // setShowNewSequence(true);
  };

  const editClass = (e) => {
    setYogaClassToAdd({
      ...yogaClassToAdd,
      title: e.target.value
    });
    asanaService.getUserClasses(user.id).then((data) => {
      setUserClasses(data);
    });
  };

  const moveSequenceUp = (sequence) => {
    const startIndex = yogaClassToAdd.plan.indexOf(sequence);

    if (startIndex === 0) return;
    else {
      const endIndex = startIndex - 1;

      yogaClassToAdd.plan.splice(
        endIndex,
        0,
        yogaClassToAdd.plan.splice(startIndex, 1)[0]
      );
      setYogaClassToAdd({ ...yogaClassToAdd });

      // console.log('index to move', startIndex);
      // console.log('index after splice', yogaClassToAdd.plan.indexOf(sequence));
    }
  };

  const moveSequenceDown = (sequence) => {
    const startIndex = yogaClassToAdd.plan.indexOf(sequence);

    if (startIndex === yogaClassToAdd.plan.length - 1) return;
    else {
      const endIndex = startIndex + 1;

      yogaClassToAdd.plan.splice(
        endIndex,
        0,
        yogaClassToAdd.plan.splice(startIndex, 1)[0]
      );
      setYogaClassToAdd({ ...yogaClassToAdd });

      console.log('index to move', startIndex);
      console.log('index after splice', yogaClassToAdd.plan.indexOf(sequence));
    }
  };

  return (
    <div className="w-full">
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
        <div ref={imgEl} className="w-full bg-white">
          <div className="flex flex-ro">
            <input
              type="text"
              className="color-blue-darkest text-left px-10 text-4xl"
              placeholder={`${user.name}'s class no. ${userClasses.length + 1}`}
              value={yogaClassToAdd.title}
              onChange={editClass}
              onFocus={handleFocus}
            />
          </div>

          <div className="w-full">
            {yogaClassToAdd.plan &&
              yogaClassToAdd.plan.map((sequence, index) => (
                <div className="grid grid-cols-12 gap-4 border-t-2 border-gray-200 mx-4">
                  <div className=" col-span-1">
                    <span
                      className="font-material-symbols color-blue-darkest text-4xl px-3 cursor-pointer"
                      onClick={() => moveSequenceDown(sequence)}
                    >
                      expand_more
                    </span>
                    <span
                      className="font-material-symbols color-blue-darkest text-4xl px-3 cursor-pointer"
                      onClick={() => moveSequenceUp(sequence)}
                    >
                      expand_less
                    </span>
                  </div>

                  <div
                    key={sequence._id}
                    className="rounded bg-light col-span-11 my-2"
                  >
                    <SequencePlanned
                      sequence={sequence}
                      handleFocus={handleFocus}
                    />
                  </div>
                </div>
              ))}
          </div>

          {/* {showNewSequence && <NewSequence handleFocus={handleFocus} />} */}

          <div className=" w-full flex flex-row justify-center">
            <button
              className="btn-blue btn-blue:hover   mx-2 flex flex-row items-center"
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
    </div>
  );
}
