import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useOutletContext } from "react-router-dom";
import "./planner.scss";
import Sequence from "../Sequence/Sequence";
import NewSequence from "../NewSequence.jsx/NewSequence";
import SequencePlanned from "../SequencePlanned/SequencePlanned";

export default function Planner() {
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
    selectedSequences,
    setSelectedSequences,
    yogaClassToAdd,
    setYogaClassToAdd,
    sequenceToAdd,
    setSequenceToAdd
  } = useOutletContext();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // functions
  const addNewSequence = () => {};

  console.log("selectedAsanas", selectedAsanas);
  console.log("sequenceToAdd", sequenceToAdd);

  return (
    <>
      {loading && (
        <lottie-player
          src="https://assets1.lottiefiles.com/packages/lf20_s00z9gco.json"
          background="transparent"
          speed="1"
          style={{ width: "300px", height: "300px" }}
          loop
          autoplay
        ></lottie-player>
      )}

      {!loading && (
        <>
          <div className="w-screen mx-10">
            <input
              type="text"
              className="color-blue-darkest text-left justify-start w-full px-10 text-4xl"
              placeholder="draft class - title"
              value={yogaClassToAdd.title}
              onChange={(e) =>
                setYogaClassToAdd({ ...yogaClassToAdd, title: e.target.value })
              }
            />
          </div>
          <div className="w-screen mx-10">
            {selectedSequences &&
              selectedSequences.map((sequence) => (
                <div key={sequence._id} className="rounded bg-light m-10">
                  <SequencePlanned sequence={sequence} />
                </div>
              ))}
          </div>

          <NewSequence />

          <div className=" w-screen h-screen mx-10 flex flex-row justify-center">
            <div
              className="flex flex-row items-start cursor-pointer px-3"
              onClick={() => addNewSequence()}
            >
              <span className="font-material-symbols modal color-blue-darkest text-4xl ">
                add_circle
              </span>
              <p className="color-blue-darkest pt-5">new sequence</p>
            </div>
            <div
              className="flex flex-row items-start cursor-pointer px-3"
              onClick={() => navigate("/user/sequences")}
            >
              <span className="font-material-symbols modal color-blue-darkest text-4xl p-l">
                add_circle
              </span>
              <p className="color-blue-darkest pt-5">my sequence</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
