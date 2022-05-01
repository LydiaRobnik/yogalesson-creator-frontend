import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./sequenceCollection.scss";
import useBreakpoint from "../../custom/useBreakpoint";
import Sequence from "../Sequence/Sequence.jsx";

const SequenceCollection = () => {
  // states
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
    currentSequences,
    setCurrentSequences,
    loading
  } = useOutletContext();
  // const [sequences, setSequences] = useState([]);
  const point = useBreakpoint();
  const navigate = useNavigate();

  const [showMore, setShowMore] = useState(false);
  const toggleAsanas = () => {
    setShowMore(!showMore);
  };

  // const handleSelectSequence = (choice) => {
  //   if (currentSequences) {
  //     setCurrentSequences((prev) => [...prev, choice]);
  //     navigate(`../planner`);
  //   }
  // };

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
        <div className="flex flex-col justify-start content-start px-6">
          <h3 className="color-red pl-3 pb-5 text-4xl">
            click to choose your sequence
          </h3>
          {userSequences &&
            userSequences.map((sequence) => (
              <div key={sequence._id} className="grid gap-4 grid-cols-12">
                <div className="grid-cols-1">
                  {!showMore && (
                    <>
                      <span
                        className="font-material-symbols color-blue-darkest text-4xl px-3 cursor-pointer"
                        onClick={() => toggleAsanas()}
                      >
                        expand_more
                      </span>
                    </>
                  )}
                  {showMore && (
                    <span
                      className="font-material-symbols color-blue-darkest text-4xl px-3 cursor-pointer"
                      onClick={() => toggleAsanas()}
                    >
                      expand_less
                    </span>
                  )}
                  <div className="flex flex-row items-start cursor-pointer px-3">
                    <span className="font-material-symbols modal color-blue-darkest text-4xl p-l">
                      add_circle
                    </span>
                  </div>
                </div>
                <div key={sequence._id} className="grid-cols-11">
                  <Sequence sequence={sequence} showMore={showMore} />
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default SequenceCollection;
