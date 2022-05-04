import React, { useContext } from 'react';
import asanaService from '../../api/asanaService';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useOutletContext } from 'react-router-dom';

const ClassCard = ({ classItem }) => {
  const { setUserClasses } = useOutletContext();
  const { user } = useContext(AuthContext);

  const handleFavorite = async () => {
    classItem.favourite = !classItem.favourite;
    const classToSave = { ...classItem };
    const result = await asanaService.saveClass(classToSave);
    console.log('📒 saveClass', result);
    asanaService.getUserClasses(user.id).then((data) => {
      setUserClasses(data);
    });
  };

  return (
    <>
      <div className="rounded overflow-hidden shadow-lg">
        <img className="w-full" src="Logo.png" alt="preview class" />
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
        </div>
      </div>
    </>
  );
};

export default ClassCard;
