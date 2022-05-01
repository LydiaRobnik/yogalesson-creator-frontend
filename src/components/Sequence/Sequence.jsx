import React, { useState } from "react";
import AsanaCard from "../AsanaCard/AsanaCard";
import { useNavigate, useOutletContext } from "react-router-dom";
import "./sequence.scss";

const Sequence = ({ sequence, showMore }) => {
  const {
    selectedAsanas,
    setSelectedAsanas,
    userClasses,
    setUserClasses,
    asanas,
    setAsanas,
    userSequences,
    setUserSequences,
    loading,
    currentSequences,
    setCurrentSequences,
    gridResponsibility
  } = useOutletContext();
  const navigate = useNavigate();

  const handleSelectSequence = () => {
    if (currentSequences) {
      setCurrentSequences((prev) => [...prev, sequence]);
      navigate(`../planner`);
    }
  };

  return (
    <>
      <div className="w-screen min-h-40">
        <h3
          className="color-blue-darkest pr-3 pt-3 font-bold text-xl"
          onClick={() => handleSelectSequence()}
        >
          {sequence.title}
        </h3>
      </div>

      {showMore && (
        <>
          <div className="w-screen min-h-40">
            <p className="color-blue-darkest pr-3 pt-3">
              {sequence.description}
            </p>
          </div>

          <div className={`grid gap-x-52 ${gridResponsibility()}`}>
            {sequence &&
              sequence.asanas.map((asana) => (
                <div key={asana._id}>
                  <AsanaCard asana={asana} />
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Sequence;
