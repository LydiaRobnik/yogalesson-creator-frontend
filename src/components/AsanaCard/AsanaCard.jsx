import React from "react";

const AsanaCard = ({ asana }) => {
  return (
    <div className="rounded overflow-hidden shadow-lg m-2">
      <img className="w-full" src={asana.img_url} alt="preview class" />
      <div className="px-6 pt-4 pb-2 bg-light ">
        <h3 className="color-blue-darkest">{asana.asana.sanskrit}</h3>
        <h3 className="color-blue-darkest">{asana.asana.name}</h3>
      </div>
    </div>
  );
};

export default AsanaCard;
