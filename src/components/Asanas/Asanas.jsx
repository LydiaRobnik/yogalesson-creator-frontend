import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useOutletContext } from 'react-router-dom';
import './asanas.scss';
import asanaService from '../../api/asanaService';
import AsanaCard from '../AsanaCard/AsanaCard';

const Asanas = ({ loading, setLoading }) => {
  const { loggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [asanas, setAsanas] = useState([]);
  const [selectedAsanas, setSelectedAsanas] = useOutletContext();
  const [filterName, setFilterName] = useState('');
  const [filterLevel, setFilterLevel] = useState([]);
  const [filterTags, setFilterTags] = useState([]);

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

  useEffect(() => {
    console.log('useEffect asanas', '');

    const levelAr = new Set();
    const tagAr = new Set();

    asanas.forEach((asana) => {
      levelAr.add(asana.level);
      asana.tags?.forEach((tag) => {
        tagAr.add(tag);
      });
    });

    console.log('levelAr', [...levelAr]);
    console.log('tagAr', [...tagAr]);
    setFilterLevel([...levelAr]);

    return () => {};
  }, [asanas]);

  console.log('fetched asanas:', asanas);

  return (
    <div className="flex flex-col justify-center max-w-7xl">
      <div className="flex gap-4 text-black border-b-gray-500 border-b-2 border-dashed">
        <div>Filter:</div>
        <input
          type="text"
          placeholder="Filter by name"
          onChange={(e) => setFilterName(e.target.value)}
        />
        <div>
          <div>Level</div>
          {filterLevel &&
            filterLevel.map((level) => (
              <div className="flex gap-1">
                <input
                  className="mt-1"
                  type="checkbox"
                  checked
                  name={level}
                  id={level}
                />
                <label htmlFor={level}>{level}</label>
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-center">
        {asanas &&
          asanas
            .filter(
              (asana) =>
                asana.asana.sanskrit.toLowerCase().includes(filterName) ||
                asana.asana.name.toLowerCase().includes(filterName)
            )
            .map((asana) => (
              <div key={asana._id}>
                <AsanaCard
                  asana={asana}
                  setSelectedAsanas={setSelectedAsanas}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Asanas;
