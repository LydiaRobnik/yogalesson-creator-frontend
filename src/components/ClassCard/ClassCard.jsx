import React from "react";

const ClassCard = ({ classItem }) => {
  return (
    <>
      <div className="rounded overflow-hidden shadow-lg">
        <img className="w-full" src="Logo.png" alt="preview class" />
        <div className="px-6 pt-4 pb-2">
          <h3 className="color-blue-darkest">{classItem.title}</h3>
          <p className="color-blue-darkest">{classItem.modifiedAt}</p>
        </div>
      </div>
    </>
  );
};

export default ClassCard;
