import React, { useContext, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './dashboard.scss';
import useBreakpoint from '../../custom/useBreakpoint';
import ClassCard from '../ClassCard/ClassCard.jsx';
import asanaService from '../../api/asanaService';

export default function Dashboard() {
  // states
  const { userClasses, loading, yogaClassToAdd, setYogaClassToAdd } =
    useOutletContext();
  const [selectedCard, setSelectedCard] = useState(null);
  const [toggleShowAll, setToggleShowAll] = useState(false);

  const point = useBreakpoint();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // sort classes by date
  userClasses.sort((a, b) => {
    return new Date(b.modifiedAt) - new Date(a.modifiedAt);
  });

  // filter favorites
  const favorites = userClasses.filter(
    (classItem) => classItem.favourite === true
  );

  const showAll = () => {
    setToggleShowAll(!toggleShowAll);
  };

  const createClass = async () => {
    const newClass = {
      title: `draft - class title`,
      user: user?.id,
      plan: [],
      favourite: false
    };
    const result = await asanaService.createClass(newClass);
    console.log('📒 createClass', result);
    setYogaClassToAdd(result);
    navigate(`/user/planner/${yogaClassToAdd._id}`);
  };

  const markAsSelected = (classCardToSelect) => {
    setSelectedCard(classCardToSelect);
  };

  // functions
  const gridResponsiveness = () => {
    if (point === 'xs') {
      return 'grid-cols-1';
    } else if (point === 'sm') {
      return 'grid-cols-2';
    } else if (point === 'md') {
      return 'grid-cols-3';
    } else if (point === 'lg') {
      return 'grid-cols-4';
    } else {
      return 'grid-cols-5';
    }
  };

  return (
    <div className="w-full rounded">
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
              <div className="flex flex-row items-center">
                <h2
                  className={`${point === 'xs' ? 'text-center' : 'text-start'}`}
                >
                  recently used
                </h2>
              </div>
            )}
            <div
              className={`grid gap-4 ${gridResponsiveness()} grid-flow-row-dense`}
            >
              {userClasses &&
                userClasses.slice(0, 5).map((classItem) => (
                  <div
                    key={classItem._id}
                    onClick={() => {
                      markAsSelected(classItem._id);
                    }}
                    className={`rounded overflow-hidden w-full p-0 ${
                      selectedCard === classItem._id
                        ? 'border-solid border-2 border-rose-400 shadow-xl'
                        : ' border-2 border-gray-200'
                    }`}
                  >
                    <ClassCard classItem={classItem} />
                  </div>
                ))}
            </div>
            <button
              className="btn-dash-neutral bg-white outline outline-2  pl-1 mr-2 mt-4 flex flex-row items-center"
              onClick={() => showAll()}
            >
              <span className="font-material-symbols color-blue-darkest text-lg px-2 cursor-pointer">
                expand_more
              </span>
              <p className="inline pt-1 text-lg">show all</p>
            </button>
          </div>

          <div
            className={`p-6
       w-full ${point === 'xs' ? 'justify-center' : 'justify-start'}`}
          >
            {userClasses.length > 0 ||
              (favorites.length === 0 && (
                <>
                  <div className="flex flex-col justify-center">
                    <span className="material-symbols-outlined color-blue-darkest text-center text-4xl p-2">
                      folder_special
                    </span>
                    <h3 className="color-blue-darkest text-center font-bold">
                      No favorites defined
                    </h3>
                    <p className="color-blue-darkest text-center">
                      Get started by marking them.
                    </p>
                  </div>
                </>
              ))}
            {favorites.length > 0 && (
              <div className="flex flex-row ">
                <h2
                  className={`inline ${
                    point === 'xs' ? 'text-center' : 'text-start'
                  }`}
                >
                  favorites
                </h2>
                <span className="font-material color-red text-4xl mt-7 mb-5">
                  star
                </span>
              </div>
            )}
            <div
              className={`grid gap-4 ${gridResponsiveness()} grid-flow-row-dense`}
            >
              {favorites &&
                favorites.slice(0, 5).map((favoritItem) => (
                  <div
                    key={`${favoritItem._id}_favorite`}
                    onClick={() => {
                      markAsSelected(`${favoritItem._id}_favorite`);
                    }}
                    className={`rounded overflow-hidden w-full m-2 ${
                      selectedCard === `${favoritItem._id}_favorite`
                        ? 'border-solid border-2 border-rose-400 shadow-xl'
                        : 'border-2 border-gray-200'
                    }`}
                  >
                    <ClassCard classItem={favoritItem} />
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
