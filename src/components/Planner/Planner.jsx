import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useOutletContext } from "react-router-dom";
import "./planner.scss";
import asanaService from "../../api/asanaService";
import Sequence from "../Sequence/Sequence";
import NewSequence from "../NewSequence.jsx/NewSequence";

export default function Planner({ loading, setLoading }) {
  const [selectedAsanas, setSelectedAsanas] = useOutletContext();
  const { loggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [yogaClass, setYogaClass] = useState({
    title: "",
    user: user.id,
    plan: [],
    favourite: false
  });
  const [sequenceToAdd, setSequenceToAdd] = useState({
    user: user.id,
    type: "sequence",
    duration: 3,
    description: "",
    title: "",
    asanas: []
  });
  const [currentSequences, setCurrentSequences] = useState([]);

  // functions
  const addNewSequence = () => {
    setCurrentSequences(...currentSequences);
  };

  console.log(sequenceToAdd);

  return (
    <>
      <>
        <div className=" w-screen mx-10">
          <input
            type="text"
            className="color-blue-darkest text-left justify-start w-full px-6 text-4xl"
            placeholder="draft class - title"
            value={yogaClass.title}
            onChange={(e) =>
              setYogaClass({ ...yogaClass, title: e.target.value })
            }
          />
        </div>
        {currentSequences &&
          currentSequences.map((sequence) => (
            <div key={sequence._id}>
              <Sequence sequence={sequence} />
            </div>
          ))}
        <NewSequence
          sequenceToAdd={sequenceToAdd}
          setSequenceToAdd={setSequenceToAdd}
          asanas={selectedAsanas}
        />

        <div className=" w-screen h-screen mx-10 flex flex-row justify-center">
          <div
            className="flex flex-row items-start cursor-pointer"
            onClick={() => addNewSequence()}
          >
            <span className="font-material-symbols modal color-blue-darkest text-4xl ">
              add_circle
            </span>
            <p className="color-blue-darkest pt-5">new sequence</p>
          </div>
          <div
            className="flex flex-row items-start cursor-pointer"
            onClick={() => navigate("/user/sequences")}
          >
            <span className="font-material-symbols modal color-blue-darkest text-4xl">
              add_circle
            </span>
            <p className="color-blue-darkest pt-5">my sequence</p>
          </div>
        </div>
      </>
    </>
  );
}
