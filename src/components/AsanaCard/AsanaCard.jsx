import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const AsanaCard = ({ asana, setSelectedAsanas }) => {
  const navigate = useNavigate();

  function handleSelectAsana() {
    if (setSelectedAsanas) {
      setSelectedAsanas((prev) => [...prev, asana]);
      navigate(`../planner`);
    }
  }

  return (
    <div
      onClick={handleSelectAsana}
      className="w-32 rounded overflow-hidden shadow-lg m-2 cursor-pointer"
    >
      <img className="w-full" src={asana.img_url} alt="preview class" />
      <div className="px-6 pt-4 pb-2 bg-light ">
        <h3 className="color-blue-darkest">{asana.asana.sanskrit}</h3>
        <h3 className="color-blue-darkest">{asana.asana.name}</h3>
      </div>
    </div>
  );
};

export default AsanaCard;
