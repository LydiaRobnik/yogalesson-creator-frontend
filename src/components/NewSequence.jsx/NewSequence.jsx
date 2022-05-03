import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import asanaService from '../../api/asanaService';
import { AuthContext } from '../../context/AuthContext';
import AsanaCard from '../AsanaCard/AsanaCard';
import './newSequence.scss';

const NewSequence = () => {
  const navigate = useNavigate();
  const { loggedIn, user } = useContext(AuthContext);
  console.log('user', user.id);
  const {
    userClasses,
    setUserClasses,
    asanas,
    setAsanas,
    userSequences,
    setUserSequences,
    loading,
    gridResponsiveness,
    yogaClassToAdd,
    setYogaClassToAdd,
    sequenceToAdd,
    setSequenceToAdd
  } = useOutletContext();

  const addSequenceToClass = async () => {
    const newSequence = { ...sequenceToAdd };
    yogaClassToAdd.plan.push(newSequence);
    const result = await asanaService.createSequence(newSequence);
    console.log('📒 createSequence', result);

    const seqObj = {
      user: user?.id,
      type: 'sequence',
      duration: 3,
      description: '',
      title: `${user.name}'s ${userSequences.length + 1}. sequence`,
      asanas: []
    };
    setSequenceToAdd(seqObj);
  };

  // testCreateSequence().catch((error) => setError(error.message));

  return (
    <>
      <div className="border-2 border-grey-500 w-screen min-h-40 px-6 flex flex-col">
        <input
          type="text"
          className="color-blue-darkest text-xl"
          placeholder="draft sequence - title"
          value={sequenceToAdd.title}
          onChange={(e) =>
            setSequenceToAdd({ ...sequenceToAdd, title: e.target.value })
          }
        />
        <input
          type="text"
          className="color-blue-darkest "
          placeholder="add a descrition"
          value={sequenceToAdd.description}
          onChange={(e) =>
            setSequenceToAdd({ ...sequenceToAdd, description: e.target.value })
          }
        />

        <div className="flex">
          {sequenceToAdd.asanas?.map((asana, index) => (
            <div key={(asana._id, index)}>
              <AsanaCard asana={asana} />
            </div>
          ))}
        </div>

        {/* <button
              onClick={() => navigate('/user/planner')}
              className="btn-blue btn-blue:hover mx-2 flex flex-row items-center"
            >
              <span className="font-material inline pr-2">add</span>
              <p className="inline pt-1 text-lg">add asana</p>
            </button> */}

        <div className="flex flex-row items-center">
          <button
            className="btn-blue btn-blue:hover mx-2 flex flex-row items-center"
            onClick={() => navigate('../asanas')}
          >
            <span className="font-material inline pr-2">add</span>
            <p className="inline pt-1 text-lg ">add asana</p>
          </button>

          <button
            className="btn-red btn-blue:hover mx-2 flex flex-row items-center"
            onClick={() => addSequenceToClass()}
          >
            <span className="font-material-symbols inline pr-2">save</span>
            <p className="inline pt-1 text-lg">save sequence</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default NewSequence;
