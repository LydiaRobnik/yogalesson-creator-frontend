import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useOutletContext } from 'react-router-dom';
import './asanas.scss';
import asanaService from '../../api/asanaService';
import AsanaCard from '../AsanaCard/AsanaCard';

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
    setLoading,
    gridResponsiveness
  } = useOutletContext();
  const navigate = useNavigate();
  const { loggedIn, user } = useContext(AuthContext);

  const [filterName, setFilterName] = useState('');
  const [filterLevel, setFilterLevel] = useState([]);
  const [filterTags, setFilterTags] = useState([]);
  const [showFilter, setShowFilter] = useState(true);

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
    let levelAr = new Set();
    let tagAr = new Set();

    asanas.forEach((asana) => {
      levelAr.add(asana.level);
      asana.tags?.forEach((tag) => {
        tagAr.add(tag);
      });
    });

    levelAr = [...levelAr]
      .sort((a, b) => a.localeCompare(b))
      .map((level) => ({ level, checked: false }));
    tagAr = [...tagAr]
      .sort((a, b) => a.localeCompare(b))
      .map((tag) => ({ tag, checked: false }));

    // console.log('levelAr', [...levelAr]);
    // console.log('tagAr', [...tagAr]);
    setFilterLevel([...levelAr]);
    setFilterTags([...tagAr]);

    return () => {};
  }, [asanas]);

  useEffect(() => {
    return () => {};
  }, [showFilter]);

  const toggleFilterAll = (f) => {
    f((prev) => {
      if (prev.some((item) => item.checked))
        return prev.map((item) => ({ ...item, checked: false }));
      return prev.map((item) => ({ ...item, checked: !item.checked }));
    });
  };

  const toggleFilterChecked = (f, index) => {
    f((prev) => {
      prev[index].checked = !prev[index].checked;
      return [...prev];
    });
  };

  // console.log('fetched asanas:', asanas);

  return (
    <>
      {loading && (
        <lottie-player
          src="https://assets1.lottiefiles.com/packages/lf20_s00z9gco.json"
          background="transparent"
          speed="1"
          style={{ width: '300px', height: '300px' }}
          loop
          autoplay
        ></lottie-player>
      )}

      {!loading && (
        <div className="asanas-jsx flex flex-col justify-center gap-4 w-full">
          <div className="asanas-jsx  flex justify-center gap-4 w-full">
            <div
              className={`filter-section  flex flex-col gap-4 text-black mr-20 lg:mr-48 ${
                showFilter ? 'w-2/6 md:w-1/6' : 'mr-0 w-2/6 sm:w-1/6'
              }`}
            >
              <div className="flex flex-wrap justify-between border-b border-b-slate-300 border-dashed">
                <div className="text-lg font-bold">Filter</div>
                <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    name="toggle"
                    id="toggle"
                    class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    checked={showFilter}
                    onChange={() => setShowFilter(!showFilter)}
                  />
                  <label
                    for="toggle"
                    class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
              </div>
            </div>

            <div className="grow w-4/6 md:w-5/6 flex flex-row flex-wrap">
              test
            </div>
          </div>

          <div className="asanas-jsx flex justify-center gap-4 w-full">
            <div
              className={`filter-section  flex flex-col gap-4 text-black ${
                showFilter ? 'w-2/6 md:w-1/6' : 'w-0'
              }`}
            >
              <input
                className={`filterblock w-full grow-0 border-gray-400 border-2 rounded-md p-1 ${
                  showFilter ? 'w-24 md:w-40' : 'opacity-0'
                }`}
                type="text"
                placeholder="Filter by name"
                onChange={(e) => setFilterName(e.target.value)}
              />
              <div
                className={`filterblock ${showFilter ? 'block' : 'opacity-0'}`}
              >
                <div className="flex gap-1">
                  <input
                    className="mt-1"
                    type="checkbox"
                    checked={filterLevel.some((item) => item.checked)}
                    name={'allLevels'}
                    id={'allLevels'}
                    onChange={() => toggleFilterAll(setFilterLevel)}
                  />
                  <div className="font-bold">Level</div>
                </div>
                {filterLevel &&
                  filterLevel.map((level, index) => (
                    <div key={index} className="flex gap-1 ml-2">
                      <input
                        className="mt-1"
                        type="checkbox"
                        checked={level.checked}
                        name={level.level}
                        id={level.level}
                        onChange={() =>
                          toggleFilterChecked(setFilterLevel, index)
                        }
                      />
                      <label htmlFor={level.level}>{level.level}</label>
                    </div>
                  ))}
              </div>
              <div
                className={`filterblock ${showFilter ? 'block' : 'opacity-0'}`}
              >
                <div className="flex gap-1">
                  <input
                    className="mt-1"
                    type="checkbox"
                    checked={filterTags.some((item) => item.checked)}
                    name={'allTags'}
                    id={'allTags'}
                    onChange={() => toggleFilterAll(setFilterTags)}
                  />
                  <div className="font-bold">Tags</div>
                </div>
                {filterTags &&
                  filterTags.map((tag, index) => (
                    <div key={index} className="flex gap-1 ml-2">
                      <input
                        className="mt-1"
                        type="checkbox"
                        checked={tag.checked}
                        name={tag.tag}
                        id={tag.tag}
                        onChange={() =>
                          toggleFilterChecked(setFilterTags, index)
                        }
                      />
                      <label htmlFor={tag.tag}>{tag.tag}</label>
                    </div>
                  ))}
              </div>
            </div>

            <div className="grow flex flex-row flex-wrap">
              {/* <div
              className={` justify-center grid gap-4 ${gridResponsiveness()}`}
            > */}
              {asanas &&
                asanas
                  // filter by name
                  .filter(
                    (asana) =>
                      asana.asana.sanskrit.toLowerCase().includes(filterName) ||
                      asana.asana.name.toLowerCase().includes(filterName)
                  )
                  // filter by level
                  .filter(
                    (asana) =>
                      filterLevel.every((level) => !level.checked) ||
                      filterLevel.some(
                        (level) => level.checked && level.level === asana.level
                      )
                  )
                  // filter by tags
                  .filter(
                    (asana) =>
                      filterTags.every((tag) => !tag.checked) ||
                      filterTags.some(
                        (tag) =>
                          tag.checked &&
                          asana.tags.some((asanaTag) => asanaTag === tag.tag)
                      )
                  )
                  .map((asana) => (
                    <div key={asana._id}>
                      <AsanaCard
                        asana={asana}
                        setSelectedAsanas={setSelectedAsanas}
                      />
                    </div>
                  ))}
              {/* </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Asanas;
