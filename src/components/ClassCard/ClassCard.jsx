import React, { useContext } from 'react';
import asanaService from '../../api/asanaService';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useOutletContext } from 'react-router-dom';
import http from '../../api/http-common';

const ClassCard = ({ classItem }) => {
  const { setUserClasses, setYogaClassToAdd } = useOutletContext();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFavorite = async () => {
    classItem.favourite = !classItem.favourite;
    const classToSave = { ...classItem };
    const result = await asanaService.saveClass(classToSave);
    console.log('📒 saveClass', result);
    asanaService.getUserClasses(user.id).then((data) => {
      setUserClasses(data);
    });
  };

  const openClassInPlanner = () => {
    setYogaClassToAdd(classItem);
    navigate(`/user/planner/${classItem._id}`);
  };

  const handleDeleteClass = async (classToDelete) => {
    const id = classToDelete._id;
    const result = await asanaService.deleteClass(id);
    console.log('📒 deleteClass', result);

    asanaService.getUserClasses(user.id).then((data) => {
      setUserClasses(data);
    });
  };

  return (
    <>
      <div
        className="rounded overflow-hidden shadow-lg"
        onDoubleClick={() => {
          openClassInPlanner();
        }}
      >
        <img
          className="w-full"
          src={`${classItem.preview}`}
          alt="preview class"
        />
        <div className="px-6 pt-4 pb-2 bg-light ">
          <h3 className="color-blue-darkest">{classItem.title}</h3>
          <p className="color-blue-darkest text-xs">
            {new Date(classItem.modifiedAt).toLocaleString()}
          </p>
          <span
            className="font-material-symbols color-red text-2xl cursor-pointer"
            onClick={() => handleFavorite()}
          >
            {classItem.favourite ? 'star' : 'grade'}
          </span>

          <button
            className="btn-red btn-blue:hover m-2 p-0 flex flex-row items-center cursor-pointer"
            onClick={() => handleDeleteClass(classItem)}
          >
            <p className="font-material-symbols p-0">delete</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default ClassCard;
