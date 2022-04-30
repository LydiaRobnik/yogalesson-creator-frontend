import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import asanaService from "../../api/asanaService";
import { AuthContext } from "../../context/AuthContext";
import "./sequenceCollection.scss";
import useBreakpoint from "../../custom/useBreakpoint";
import Sequence from "../Sequence/Sequence.jsx";

const SequenceCollection = ({ loading, setLoading }) => {
  // states
  const { loggedIn, user } = useContext(AuthContext);
  const [sequences, setSequences] = useState([]);
  const point = useBreakpoint();
  const navigate = useNavigate();

  // fetches
  useEffect(() => {
    if (loggedIn) {
      const fetchData = () => {
        setLoading(true);
        asanaService.getUserSequences(user.id).then((data) => {
          setSequences(data);
        });
        setLoading(false);
      };
      fetchData();
    }

    return () => {};
  }, [loggedIn]);

  console.log("data test:", sequences);

  return (
    <>
      {sequences &&
        sequences.map((sequence) => (
          <div key={sequence._id}>
            <Sequence sequence={sequence} />
          </div>
        ))}
    </>
  );
};

export default SequenceCollection;
