import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./planner.scss";

export default function Planner() {
  const { loggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showModalStartOption, setShowModalStartOption] = useState(true);

  const handleClickNewSequence = () => {
    setShowModalStartOption(false);
  };

  const handleClickExistingSequence = () => {
    setShowModalStartOption(false);
  };

  return (
    <>
      {showModalStartOption && (
        <>
          <div className="bg-beige flex flex-col items-center text-2xl md:text-3xl object-center mt-20 ">
            <span className="font-material-symbols modal color-light">
              add_circle
            </span>
            <div
              className="w-60 md:w-80 border-2 border-y-neutral-200 border-x-0"
              onClick={() => handleClickNewSequence()}
            >
              <p className="modal">new sequence</p>
            </div>
            <div className="w-60 md:w-80">
              <p className="modal">saved sequence</p>
            </div>
          </div>
        </>
      )}

      {!showModalStartOption && (
        <>
          <div className=" w-screen mx-10 ">
            <h2 className="color-blue-darkest text-left justify-start w-full">
              draft - class title
            </h2>
          </div>
          <div className="border-2 border-grey-500 w-screen mx-10"></div>
        </>
      )}
    </>
  );
}
