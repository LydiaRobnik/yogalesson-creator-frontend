import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AsanaCard from "../AsanaCard/AsanaCard";
import "./newSequence.scss";

const NewSequence = ({
  sequenceToAdd,
  setSequenceToAdd,
  asanas,
  addNewSequence
}) => {
  const navigate = useNavigate();
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
