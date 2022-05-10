import React, { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useOutletContext } from 'react-router-dom';
import './planner.scss';
// import NewSequence from '../NewSequence/NewSequence';
import SequencePlanned from '../SequencePlanned/SequencePlanned';
// import asanaService from '../../api/asanaService';
import moment from 'moment';

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
  const { asanaService, addSystemError, clearSystemMessages } =
    useOutletContext();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const imgEl = useRef(null);
  const [hideGoogleMaterialIcon, setHideGoogleMaterialIcon] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);
  const [sequenceToChange, setSequenceToChange] = useState({});
  const [newDuration, setNewDuration] = useState(0);

  useEffect(() => {
    clearSystemMessages();
    return () => {};
  }, []);

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
      // setHideGoogleMaterialIcon(!hideGoogleMaterialIcon);
      console.log('hidden?', hideGoogleMaterialIcon);
      asanaService
        .createClassPreview(imgEl.current, classToShowOnPreviewPic)
        .catch((err) => {
          console.log('err:', err);
        });
      // setHideGoogleMaterialIcon(!hideGoogleMaterialIcon);
      console.log('hidden?', hideGoogleMaterialIcon);
    };
    getTotalDuration();
    saveClassToBackend();
  }, [yogaClassToAdd]);

  const handleFocus = (event) => event.target.select();

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

  const editDuration = (event, sequence) => {
    console.log('old duration', sequence.duration);
    const index = yogaClassToAdd.plan.indexOf(sequence);
    const newDuration = +event.target.value;
    sequence.duration = newDuration;

    yogaClassToAdd.plan.splice(index, 1, sequence);

    setYogaClassToAdd({
      ...yogaClassToAdd
    });
    asanaService.getUserClasses(user.id).then((data) => {
      setUserClasses(data);
    });
  };

  const getTotalDuration = () => {
    let sum = 0;
    yogaClassToAdd.plan.forEach((sequence) => {
      sum += sequence.duration;
      return sum;
    });
    console.log(sum);
    setTotalDuration(sum);
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
        <>
          <div className="w-11/12 plannerFrame bg-white">
            <div className="w-full bg-white">
              <div
                className={`flex flex-row ${
                  yogaClassToAdd.plan.length === 0
                    ? 'justify-center'
                    : 'justify-start'
                }`}
              >
                <input
                  type="text"
                  maxlength="70"
                  className={`color-blue-darkest px-10 text-2xl md:text-4xl pb-3 ${
                    yogaClassToAdd.plan.length === 0
                      ? 'text-center'
                      : 'text-left'
                  } w-full`}
                  placeholder="draft - class title"
                  value={yogaClassToAdd.title}
                  onChange={editClass}
                  onFocus={handleFocus}
                />
              </div>

              <div ref={imgEl} className="w-full">
                {yogaClassToAdd.plan.length === 0 && (
                  <div className="grid place-items-center h-28 ">
                    <p className="color-blue-darkest text-center text-lg">
                      No sequences yet
                    </p>
                  </div>
                )}
                {yogaClassToAdd.plan &&
                  yogaClassToAdd.plan.map((sequence, index) => (
                    <div className="grid grid-cols-12 gap-4 items-start border-t-2 border-gray-200 mx-4">
                      <div className=" col-span-1 mt-3">
                        <div className="flex flex-row flex-wrap">
                          <span
                            className="font-material-symbols color-blue-darkest text-xl px-1 cursor-pointer"
                            onClick={() => moveSequenceUp(sequence)}
                          >
                            expand_less
                          </span>
                          <span
                            className="font-material-symbols color-blue-darkest text-xl px-1 cursor-pointer"
                            onClick={() => moveSequenceDown(sequence)}
                          >
                            expand_more
                          </span>
                        </div>
                        <div>
                          <div className="w-16 border-2 border-gray-200 rounded flex flex-row row-wrap items-center">
                            <span className="font-material-symbols color-blue-darkest text-lg px-1">
                              schedule
                            </span>
                            <input
                              type="text"
                              className="pl-2 pt-1 color-blue-darkest w-8"
                              // contenteditable="true"
                              value={sequence.duration}
                              onFocus={handleFocus}
                              onChange={(event) =>
                                editDuration(event, sequence)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        key={sequence._id}
                        className=" rounded col-span-11 my-2"
                      >
                        <SequencePlanned
                          sequence={sequence}
                          handleFocus={handleFocus}
                          // hideGoogleMaterialIcon={hideGoogleMaterialIcon}
                          // setHideGoogleMaterialIcon={setHideGoogleMaterialIcon}
                        />
                      </div>
                    </div>
                  ))}
              </div>
              {yogaClassToAdd.plan.length > 0 && (
                <>
                  <div className=" border-t-2 border-gray-300 mb-2"></div>
                  <div className="w-32 border-4 rounded flex flex-row row-wrap items-center ">
                    <span className="font-material-symbols color-blue-darkest text-xl font-bold px-1">
                      schedule
                    </span>
                    <h4 className="totalTime">{totalDuration} minutes</h4>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className=" w-full flex flex-row justify-center mt-4">
            <button
              className="btn-blue btn-blue:hover mx-2 flex flex-row items-center"
              onClick={() => navigate('/user/sequences')}
            >
              <span className="font-material inline pr-2">add</span>
              <p className="inline pt-1 text-lg ">sequence</p>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
