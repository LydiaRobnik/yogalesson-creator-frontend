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
    selectedAsanas,
    setSelectedAsanas,
    userClasses,
    setUserClasses,
    asanas,
    setAsanas,
    userSequences,
    setUserSequences,
    loading,
    gridResponsiveness,
    selectedSequences,
    setSelectedSequences,
    yogaClassToAdd,
    setYogaClassToAdd,
    sequenceToAdd,
    setSequenceToAdd
  } = useOutletContext();

  const addSequenceToClass = async () => {
    const newSequence = { ...sequenceToAdd };
    setSelectedSequences((prev) => [...prev, newSequence]);

    const result = await asanaService.createSequence(newSequence);
    console.log('📒 createSequence', result);

    const seqObj = {
      user: user?.id,
      type: 'sequence',
      duration: 3,
      description: '',
      title: `${user.name}'s ${userSequences.length}nd sequence1`,
      asanas: []
    };
    setSequenceToAdd(seqObj);
  };

  // testCreateSequence().catch((error) => setError(error.message));

  console.log('sequenceToAdd:', sequenceToAdd);

  // functions to create a new class and a new sequence

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

        <div className="flex flex-row items-center">
          <div
            className="flex flex-row items-center cursor-pointer"
            onClick={() => navigate('../asanas')}
          >
            <span className="font-material-symbols modal color-blue-darkest text-4xl self-center">
              add_circle
            </span>
            <p className="color-blue-darkest ">add asana</p>
          </div>
          <div
            className="flex flex-row items-center cursor-pointer"
            onClick={() => addSequenceToClass()}
          >
            <span className="font-material-symbols modal color-blue-darkest text-4xl self-center">
              save
            </span>
            <p className="color-blue-darkest ">save sequence</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewSequence;
