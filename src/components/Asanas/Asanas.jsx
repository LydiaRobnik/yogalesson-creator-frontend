import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
  useNavigate,
  useOutletContext,
  useSearchParams
} from 'react-router-dom';
// import asanaService from '../../api/asanaService';
import AsanaCard from '../AsanaCard/AsanaCard';
import Modal from 'react-modal';
import './asanas.scss';
import AsanaCreateDialog from './AsanaCreateDialog';
import useBreakpoint from '../../custom/useBreakpoint';
import { deepClone } from '../../custom/utils';

const emptyAsanaObj = () => ({
  asana: {
    sanskrit: '',
    name: ''
  },
  img_url: '',
  level: 'beginners',
  tags: [],
  default: false
});

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    borderRadius: '.7rem',
    border: '2px dotted lightgray',
    overflow: 'hidden'
  }
};
Modal.setAppElement('#root');

const Asanas = ({ selection = false, addAsana }) => {
  const {
    userClasses,
    setUserClasses,
    asanas,
    setAsanas,
    userSequences,
    setUserSequences,
    loading,
    setLoading,
    sequenceToAdd
  } = useOutletContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const point = useBreakpoint();

  const { loggedIn, user } = useContext(AuthContext);
  const {
    asanaService,
    addSystemInfo,
    addSystemSuccess,
    addSystemError,
    addSystemMessage,
    clearSystemMessages
  } = useOutletContext();

  const [filterName, setFilterName] = useState('');
  const [filterLevel, setFilterLevel] = useState([]);
  const [filterTags, setFilterTags] = useState([]);
  const [showFilter, setShowFilter] = useState(true);
  const [editAsana, setEditAsana] = useState(emptyAsanaObj());
  const [selectedAsanas, setSelectedAsanas] = useState([]);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [error, setError] = useState('');
  const [doFetch, setDoFetch] = useState(true);

  // fetches
  useEffect(() => {
    console.log('📦 from', searchParams.get('from'));
    if (loggedIn) {
      fetchData();
    }

    return () => {};
  }, [loggedIn, doFetch]);

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
      .reverse()
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

  useEffect(() => {
    console.log('>>> point', point, showFilter);
    if (!showFilter) return;

    if (point === 'xs') {
      return setShowFilter(false);
    } else if (point === 'sm') {
      return setShowFilter(false);
    } else if (point === 'md') {
    } else if (point === 'lg') {
    } else if (point === 'xl') {
    } else {
    }
    return () => {};
  }, [point]);

  const fetchData = async () => {
    if (!selection) setLoading(true);
    const data = await asanaService.getDefaultAsanas(user.id);
    const dataUser = await asanaService.getUserAsanas(user.id);

    console.log('asanas', dataUser.length);

    setAsanas([...dataUser, ...data]);

    setLoading(false);
  };

  const handleOpenCreateAsanaDialog = () => {
    console.log('handleCreateAsana', emptyAsanaObj());
    setEditAsana(emptyAsanaObj());
    openModal();
  };

  function saveAsana(asanaObj) {
    console.log('createAsana', asanaObj);

    if (!asanaObj._id) {
      asanaService
        .createAsana(asanaObj)
        .then((data) => {
          console.log('createAsana', data);
          setAsanas([data, ...asanas]);

          addSystemSuccess('Asana created');
        })
        .catch((err) => {
          console.log('createAsana', err);
          setError(err);
        });
    } else {
      asanaService
        .saveAsana(asanaObj)
        .then((data) => {
          console.log('saveAsana', data);
          setAsanas((prev) =>
            prev.map((asana) => (asana._id === data._id ? data : asana))
          );

          addSystemSuccess('Asana saved');
          // setDoFetch(!doFetch);
        })
        .catch((err) => {
          console.log('saveAsana', err);
          setError(err);
        });
    }

    closeModal();
  }

  function deleteAsana(asanaObj) {
    console.log('deleteAsana', asanaObj);

    if (asanaObj._id) {
      asanaService
        .deleteAsana(asanaObj)
        .then((r) => {
          fetchData();
          addSystemSuccess('Asana deleted');
        })
        .catch((err) => {
          console.log('deleteAsana', err);
          setError(err);
        });
    }

    closeModal();
  }

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    console.log('closeModal');
    setIsOpen(false);
  }

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

  const handleSelectAsana = (asana) => {
    if (searchParams.get('from') === 'planner') {
      sequenceToAdd.asanas.push(asana);
      navigate(`../planner`);
    } else if (selection === true) {
      // console.log('asana', asana);
      // addAsana(asana);
      if (selectedAsanas.includes(asana)) {
        setSelectedAsanas(selectedAsanas.filter((a) => a._id !== asana._id));
      } else {
        setSelectedAsanas((prev) => [...prev, asana]);
      }
    } else if (asana.default === false || user.role === 'admin') {
      console.log('asana', asana);
      setEditAsana(deepClone(asana));
      openModal();
    }
  };

  const handleSelectAsanas = () => {
    if (selection === true) {
      // console.log('asanas', asanas);
      addAsana(selectedAsanas);
    } else {
      // should not happen
    }
  };

  // functions
  // const gridResponsiveness = () => {
  //   if (point === 'xs') {
  //     return 'grid-cols-1';
  //   } else if (point === 'sm') {
  //     return 'grid-cols-2';
  //   } else if (point === 'md') {
  //     return 'grid-cols-3';
  //   } else if (point === 'lg') {
  //     return 'grid-cols-4';
  //   } else if (point === 'xl') {
  //     return 'grid-cols-5';
  //   } else {
  //     return 'grid-cols-6';
  //   }
  // };

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
        <div className="asanas-jsx flex flex-col justify-center gap-4 w-full px-2 sm:px-4 md:px-6 lg:px-10">
          <div className="asanas-jsx flex justify-center gap-4 w-full">
            <div
              className={`filter-section flex flex-col gap-4 text-black  lg:mr-48 ${
                // showFilter ? 'w-2/6 md:w-1/6' : 'mr-0 w-2/6 sm:w-1/6'
                ''
              }`}
            >
              <div className="flex border-b border-b-slate-300 border-dashed">
                <div className="text-lg font-bold mr-6 sm:mr-12">Filter</div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    name="toggle"
                    id="toggle"
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    checked={showFilter}
                    onChange={() => setShowFilter(!showFilter)}
                  />
                  <label
                    htmlFor="toggle"
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
              </div>
            </div>

            <div className="grow flex flex-row flex-wrap justify-center sm:justify-end sm:mr-3">
              {(1 === 1 || selection) && (
                <button
                  className="btn-blue btn-blue:hover mx-2 flex flex-row items-center"
                  onClick={handleOpenCreateAsanaDialog}
                >
                  <span className="font-material inline pr-2">add</span>
                  <p className="inline pt-1 text-lg ">
                    create{' '}
                    {point === 'xs' || point === 'sm' ? '' : ' new Asana'}
                  </p>
                </button>
              )}
            </div>
          </div>
          <div className="asanas-jsx flex gap-4 w-full">
            <div
              className={`filter-section  flex flex-col gap-4 text-black ${
                showFilter ? 'w-2/6 md:w-1/6' : 'w-0'
              }`}
            >
              {/* <input
                className={`filterblock w-full grow-0 border-gray-400 border-2 rounded-md p-1 ${
                  showFilter ? 'w-24 md:w-40' : 'opacity-0'
                }`}
                type="text"
                placeholder="Filter by name"
                onChange={(e) => setFilterName(e.target.value)}
              /> */}
              <div
                className={`flex justify-center ${
                  showFilter ? '' : 'opacity-0'
                }`}
              >
                <div
                  className="timepicker relative form-floating mb-3 xl:w-96"
                  data-mdb-with-icon="false"
                  id="input-toggle-timepicker"
                >
                  <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Filter by name"
                    onChange={(e) => setFilterName(e.target.value)}
                    data-mdb-toggle="input-toggle-timepicker"
                  />
                  <label forhtml="floatingInput" className="text-gray-500">
                    Filter {point === 'xs' || point === 'sm' ? '' : ' by name'}
                  </label>
                </div>
              </div>
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
                      <label
                        htmlFor={level.level}
                        className="md:whitespace-nowrap"
                      >
                        {level.level}
                      </label>
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
            {/* <div className={`w-full grid grid-flow-row auto-rows-max`}> */}
            <div>
              <div className={`w-full flex flex-row flex-wrap gap-4`}>
                {asanas &&
                  asanas
                    // filter by name
                    .filter(
                      (asana) =>
                        asana.asana.sanskrit
                          .toLowerCase()
                          .includes(filterName) ||
                        asana.asana.name.toLowerCase().includes(filterName)
                    )
                    // filter by level
                    .filter(
                      (asana) =>
                        filterLevel.every((level) => !level.checked) ||
                        filterLevel.some(
                          (level) =>
                            level.checked && level.level === asana.level
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
                      <div
                        id="asana-card"
                        data-selected-id={`${
                          selectedAsanas.findIndex((a) => a._id === asana._id) +
                          1
                        }`}
                        key={asana._id}
                        className={`relative flex-auto ${
                          selectedAsanas.find((a) => a._id === asana._id)
                            ? 'asana-selected-id'
                            : 'border-4 rounded-md border-transparent'
                        }`}
                      >
                        <AsanaCard
                          asana={asana}
                          handleSelectAsana={handleSelectAsana}
                          sizeAsanaOnSelectModal={true}
                        />
                      </div>
                    ))}
              </div>
            </div>
          </div>
          {selection === true && selectedAsanas.length > 0 && (
            <div
              id="asanaSelectDiv"
              className="fixed bottom-3 right-6 rounded-md bg-green-500 bg-opacity-80 text-2xl text-white p-3
              border-2 border-slate-700 border-dashed"
            >
              <div className="flex items-center gap-4 pt-1">
                <div className="pl-3 pt-1 text-shadow">
                  <span className="font-bold text-red-400 text-3xl pr-1">{`${selectedAsanas.length}`}</span>{' '}
                  Asana selected
                </div>
                <button
                  onClick={handleSelectAsanas}
                  className="btn-neutral btn-neutral:hover text-xs bg-white outline outline-2 flex flex-row self-center my-1 mb-2 mr-3"
                >
                  <span className="font-material-symbols">add_task</span>
                </button>
              </div>
            </div>
          )}
          <div className="text-black">
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              // className="modal"
              // overlayClassName="overlay"
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div className="text-black relative bg-light">
                <button
                  onClick={closeModal}
                  className="btn-modal-close absolute top-1 right-1"
                >
                  ✖️
                </button>
                <AsanaCreateDialog
                  saveAsana={saveAsana}
                  deleteAsana={deleteAsana}
                  asana={editAsana}
                />
              </div>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
};

export default Asanas;
