import React from "react";

const Sequence = ({ sequence }) => {
  return (
    <>
      <div className="border-2 border-grey-500 w-screen min-h-40 px-6 ">
        <h3 className="color-blue-darkest">{sequence.title}</h3>
        <input type="text" placeholder="add your description here" />
        <div>
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

export default Sequence;
