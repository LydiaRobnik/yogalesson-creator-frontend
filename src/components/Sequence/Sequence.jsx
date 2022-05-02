import React from "react";
import AsanaCard from "../AsanaCard/AsanaCard";
import "./sequence.scss";

const Sequence = ({ sequence }) => {
  console.log("Sequence:", sequence);

  return (
    <>
      <div className="border-2 border-grey-500 w-screen min-h-40 px-6 ">
        <h3 className="color-blue-darkest">{sequence.title}</h3>
        <p className="color-blue-darkest">{sequence.description}</p>
        <div>
          <div className="flex flex-row flex-wrap">
            {sequence &&
              sequence.asanas.map((asana) => (
                <>
                  <div key={asana._id}>
                    <AsanaCard asana={asana} />
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sequence;
