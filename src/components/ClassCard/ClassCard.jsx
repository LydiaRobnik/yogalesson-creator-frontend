import React, { useContext, useState } from 'react';
import asanaService from '../../api/asanaService';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useOutletContext } from 'react-router-dom';
import http from '../../api/http-common';

const ClassCard = ({ classItem }) => {
  const { setUserClasses, setYogaClassToAdd } = useOutletContext();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // const [show, setShow] = useState(false);

  const handleFavorite = async () => {
    classItem.favourite = !classItem.favourite;
    const classToSave = { ...classItem };
    const result = await asanaService.saveClass(classToSave);
    console.log('📒 saveClass', result);
    asanaService.getUserClasses(user.id).then((data) => {
      setUserClasses(data);
    });
  };

  const openClassInPlanner = async () => {
    const yogaClass = await asanaService.getClass(classItem._id);
    setYogaClassToAdd(yogaClass);
    navigate(`/user/planner/${yogaClass._id}`);
  };

  const handleDeleteClass = async (classToDelete) => {
    const id = classToDelete._id;
    const result = await asanaService.deleteClass(id);
    console.log('📒 deleteClass', result);

    asanaService.getUserClasses(user.id).then((data) => {
      setUserClasses(data);
    });
  };

  const showShortTitle = (title) => {
    if (title.length > 25) {
      const longTitle = title;
      const shortTitle = longTitle.substring(0, 20) + ' ...';
      return shortTitle;
    } else {
      return title;
    }
  };

  return (
    <>
      <div
        className="rounded overflow-hidden w-full bg-white"
        onDoubleClick={() => {
          openClassInPlanner();
        }}
      >
        <img
          className="w-full h-36 object-cover"
          src={`${classItem.preview}`}
          alt="preview class"
        />
        <div className="px-2 pt-4 pb-2 bg-light w-full ">
          <div className="grid gap-2 grid-cols-8">
            <span
              className="font-material-symbols color-red text-2xl cursor-pointer mr-1 col-span-1"
              onClick={() => handleFavorite()}
            >
              {classItem.favourite ? 'star' : 'grade'}
            </span>
            <div className="col-span-6">
              <h3 className="color-blue-darkest">
                {showShortTitle(classItem.title)}
              </h3>
              <p className="color-blue-darkest text-xs">
                {new Date(classItem.modifiedAt).toLocaleString()}
              </p>
            </div>
            <button
              className="m-1 text-xl flex flex-row cursor-pointer col-span-1"
              onClick={() => handleDeleteClass(classItem)}
            >
              <p className="font-material-symbols color-red p-0">delete</p>
            </button>
          </div>

          <div className="flex flex-row justify-between"></div>
        </div>
      </div>
    </>
  );
};

export default ClassCard;
