import React, { useContext } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import "./asanas.scss";
import AsanaCard from "../AsanaCard/AsanaCard";

const Asanas = () => {
  const {
    selectedAsanas,
    setSelectedAsanas,
    userClasses,
    setUserClasses,
    asanas,
    setAsanas,
    userSequences,
    setUserSequences,
    selectedSequences,
    setSelectedSequences,
    loading,
    gridResponsiveness
  } = useOutletContext();
  const navigate = useNavigate();

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
        <div className={` justify-center grid gap-4 ${gridResponsiveness()}`}>
          {asanas &&
            asanas.map((asana) => (
              <div key={asana._id}>
                <AsanaCard
                  asana={asana}
                  setSelectedAsanas={setSelectedAsanas}
                />
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Asanas;
