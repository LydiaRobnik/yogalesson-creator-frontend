import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AsanaCard from "../AsanaCard/AsanaCard";
import "./newSequence.scss";

const NewSequence = ({ asanas }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="border-2 border-grey-500 w-screen min-h-40 px-6 ">
        <h3 className="color-blue-darkest" contenteditable="true">
          draft - title
        </h3>
        <input
          type="text"
          placeholder="add your description here"
          className="color-blue-darkest"
        />
        <div className="flex">
          {asanas?.map((asana, index) => (
            <div key={index}>
              <AsanaCard asana={asana} />
            </div>
          ))}
        </div>

        <div>
          <div className="flex flex-row items-center">
            <span className="font-material-symbols modal color-blue-darkest text-4xl self-center">
              add_circle
            </span>
            <p
              onClick={() => navigate("../asanas")}
              className="color-blue-darkest cursor-pointer"
            >
              add asana
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewSequence;
