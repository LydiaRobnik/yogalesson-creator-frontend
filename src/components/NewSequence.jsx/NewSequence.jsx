import React from "react";
import "./newSequence.scss";

const NewSequence = ({ sequenceToAdd, setSequenceToAdd }) => {
  return (
    <>
      <div className="border-2 border-grey-500 w-screen min-h-40 px-6 flex flex-col">
        <input
          type="text"
          className="color-blue-darkest"
          placeholder="draft sequence - title"
          value={sequenceToAdd.title}
          onChange={(e) =>
            setSequenceToAdd({ ...sequenceToAdd, title: e.target.value })
          }
        />
        <input
          type="text"
          className="color-blue-darkest"
          placeholder="add a descrition"
          value={sequenceToAdd.description}
          onChange={(e) =>
            setSequenceToAdd({ ...sequenceToAdd, description: e.target.value })
          }
        />
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center">
            <span className="font-material-symbols modal color-blue-darkest text-4xl self-center">
              add_circle
            </span>
            <p className="color-blue-darkest">add asana</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewSequence;
