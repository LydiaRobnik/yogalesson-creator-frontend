import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useOutletContext } from "react-router-dom";
import "./planner.scss";
import asanaService from "../../api/asanaService";
import Sequence from "../Sequence/Sequence";
import NewSequence from "../NewSequence.jsx/NewSequence";

export default function Planner({ loading, setLoading, bool }) {
  console.log("bool", bool);
  const { loggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showModalStartOption, setShowModalStartOption] = useState(true);
  const [currentSequences, setCurrentSequences] = useState([]);

  const [selectedAsana, setSelectedAsana] = useOutletContext();

  // fetches

  // functions
  const handleClick = () => {
    setShowModalStartOption(false);
  };

  const addNewSequence = () => {
    setCurrentSequences(...currentSequences);
  };

  return (
    <>
      {showModalStartOption && (
        <>
          <div className="bg-beige flex flex-col items-center text-2xl md:text-3xl object-center mt-20  ">
            <span className="font-material-symbols modal color-light">
              add_circle
            </span>
            <div
              className="w-60 md:w-80 border-2 border-y-neutral-200 border-x-0"
              onClick={() => handleClick()}
            >
              <p className="modal cursor-pointer">new sequence</p>
            </div>
            <div className="w-60 md:w-80" onClick={() => handleClick()}>
              <p className="modal cursor-pointer">saved sequence</p>
            </div>
          </div>
        </>
      )}

      {!showModalStartOption && (
        <>
          <div className=" w-screen mx-10">
            <h2
              className="color-blue-darkest text-left justify-start w-full px-6"
              contenteditable="true"
            >
              draft - class title
            </h2>
          </div>
          <NewSequence />
          {currentSequences &&
            currentSequences.map((sequence) => (
              <div key={sequence._id}>
                <Sequence sequence={sequence} />
              </div>
            ))}

          <div className=" w-screen h-screen mx-10">
            <div className="px-6 flex flex-row justify-center cursor-pointer">
              <span
                className="font-material-symbols color-red text-4xl self-center pt-10 "
                onClick={() => addNewSequence()}
              >
                add_circle
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
