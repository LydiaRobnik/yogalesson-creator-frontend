import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useOutletContext } from "react-router-dom";
import "./asanas.scss";
import asanaService from "../../api/asanaService";
import AsanaCard from "../AsanaCard/AsanaCard";

const Asanas = ({ loading, setLoading }) => {
  const { loggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [asanas, setAsanas] = useState([]);
  const [selectedAsana, setSelectedAsana] = useOutletContext();

  // fetches
  useEffect(() => {
    if (loggedIn) {
      const fetchData = () => {
        setLoading(true);
        asanaService.getDefaultAsanas(user.id).then((data) => {
          setAsanas(data);
        });
        setLoading(false);
      };
      fetchData();
    }

    return () => {};
  }, [loggedIn]);

  console.log("fetched asanas:", asanas);

  return (
    <div className="flex flex-row flex-wrap">
      {asanas &&
        asanas.map((asana) => (
          <div key={asana._id}>
            <AsanaCard asana={asana} />
          </div>
        ))}
    </div>
  );
};

export default Asanas;
