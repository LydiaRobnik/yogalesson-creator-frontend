import React, { useContext, useEffect } from 'react';
import './classCollection.scss';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import useBreakpoint from '../../custom/useBreakpoint';
import ClassCard from '../ClassCard/ClassCard.jsx';
import asanaService from '../../api/asanaService';

const Class = () => {
  const {
    userClasses,
    setUserClasses,
    asanas,
    setAsanas,
    userSequences,
    setUserSequences,
    loading,
    gridResponsiveness,
    yogaClassToAdd,
    setYogaClassToAdd
  } = useOutletContext();

  const point = useBreakpoint();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // sort classes by date
  userClasses.sort((a, b) => {
    return new Date(b.modifiedAt) - new Date(a.modifiedAt);
  });

  const createClass = async () => {
    const newClass = {
      title: `${user.name}'s class no. ${
        userClasses.length + 1 + Math.random()
      }`,
      user: user?.id,
      plan: [],
      favourite: false
    };
    const result = await asanaService.createClass(newClass);
    console.log('📒 createClass', result);
    setYogaClassToAdd(result);
    navigate(`/user/planner/${yogaClassToAdd._id}`);
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
        <>
          <div
            className={`p-4 w-full flex flex-row ${
              point === 'xs' ? 'justify-center' : 'justify-start'
            }`}
          >
            <button
              onClick={() => createClass()}
              className="btn-blue btn-blue:hover mx-2 flex flex-row items-center"
            >
              <p className="font-material inline pr-2">add</p>
              <p className="inline pt-1 text-lg">new class</p>
            </button>
            <button className="btn-red btn-blue:hover mx-2 flex flex-row items-center">
              <p className="font-material inline pr-2">add</p>
              <p className="inline pt-1 text-lg">random class</p>
            </button>
          </div>

          <div
            className={`p-6
        w-full ${point === 'xs' ? 'justify-center' : 'justify-start'}`}
          >
            {userClasses.length === 0 && (
              <>
                <div className="flex flex-col justify-center">
                  <span className="material-symbols-outlined color-blue-darkest text-center text-4xl p-2">
                    note_add
                  </span>
                  <h3 className="color-blue-darkest text-center font-bold">
                    No classes
                  </h3>
                  <p className="color-blue-darkest text-center">
                    Get started by creating a new class.
                  </p>
                </div>
              </>
            )}
            {userClasses.length > 0 && (
              <h2
                className={`${point === 'xs' ? 'text-center' : 'text-start'}`}
              >
                My Classes
              </h2>
            )}
            <div className="flex flex-row flex-wrap">
              {userClasses &&
                userClasses.map((classItem) => (
                  <div key={classItem._id}>
                    <ClassCard classItem={classItem} />
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Class;
