import React, { useState, useContext } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AsanaCard from "../AsanaCard/AsanaCard";
import "./newSequence.scss";

const NewSequence = ({ addNewSequence }) => {
  const navigate = useNavigate();
  const { loggedIn, user } = useContext(AuthContext);
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
    gridResponsiveness,
    selectedSequences,
    setSelectedSequences,
    yogaClassToAdd,
    setYogaClassToAdd,
    sequenceToAdd,
    setSequenceToAdd
  } = useOutletContext();

  return (
    <>
      <div className="border-2 border-grey-500 w-screen min-h-40 px-6 flex flex-col">
        <input
          type="text"
          className="color-blue-darkest text-xl"
          placeholder="draft sequence - title"
          value={sequenceToAdd.title}
          onChange={(e) =>
            setSequenceToAdd({ ...sequenceToAdd, title: e.target.value })
          }
        />
        <input
          type="text"
          className="color-blue-darkest "
          placeholder="add a descrition"
          value={sequenceToAdd.description}
          onChange={(e) =>
            setSequenceToAdd({ ...sequenceToAdd, description: e.target.value })
          }
        />
        <div className="flex">
          {asanas?.map((asana, index) => (
            <div key={index}>
              <AsanaCard asana={asana} />
            </div>
          ))}
        </div>
        <div className="flex flex-row items-center">
          <div
            className="flex flex-row items-center cursor-pointer"
            onClick={() => navigate("../asanas")}
          >
            <span className="font-material-symbols modal color-blue-darkest text-4xl self-center">
              add_circle
            </span>
            <p className="color-blue-darkest ">add asana</p>
          </div>
          <div
            className="flex flex-row items-center cursor-pointer"
            onClick={() => addNewSequence()}
          >
            <span className="font-material-symbols modal color-blue-darkest text-4xl self-center">
              save
            </span>
            <p className="color-blue-darkest ">save sequence</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewSequence;
