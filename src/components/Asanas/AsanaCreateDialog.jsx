import React, { useContext, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
// import asanaService from '../../api/asanaService';
import { AuthContext } from '../../context/AuthContext';
import FileUpload from '../FileUpload/FileUpload';

export default function AsanaCreateDialog({ saveAsana, deleteAsana, asana }) {
  const { user, loggedIn } = useContext(AuthContext);

  const { asanaService, addSystemError } = useOutletContext();

  const [asanaObj, setAsanaObj] = useState(asana);
  const [tag, setTag] = useState();
  const [image, setImage] = useState(asana ? asana.img_url : null);
  const [clickImage, setClickImage] = useState(false);

  useEffect(() => {
    console.log('asanaObj', asana);
    setAsanaObj((prev) => {
      if (!asana._id && !asana.default) asana.user = user.id;
      return asana;
    });

    return () => {};
  }, [asana]);

  function handleSaveAsana(event) {
    event.preventDefault();
    console.log('handleSaveAsana', asanaObj);
    saveAsana(asanaObj);
  }

  function handleDeleteAsana(event) {
    event.preventDefault();
    console.log('deleteAsana', asanaObj);
    deleteAsana(asanaObj);
  }

  function handleAddTag(event) {
    console.log('handleAddTag', asanaObj);
    event.preventDefault();
    setAsanaObj((prev) => {
      prev.tags.push(tag);
      return { ...prev };
    });

    setTag('');
  }

  function handleSelectImage(imageUrl) {
    // console.log('handleSelectImage', imageUrl);
    if (imageUrl) {
      setImage(imageUrl);
      setAsanaObj((prev) => {
        prev.img_url = imageUrl;
        return { ...prev };
      });
    }
    setClickImage(false);
  }

  function removeTag(tag) {
    setAsanaObj((prev) => {
      prev.tags.splice(prev.tags.indexOf(tag), 1);
      return { ...prev };
    });
  }

  return (
    <div id="AsanaCreateDialog-jsx" className="text-black">
      <h2 className="text-lg font-bold text-center border-dashed border-b-slate-400 border-b bg-blue-dark text-white p-4 pb-2 mb-4">
        {asanaObj._id ? 'Update' : 'Create'} Asana
      </h2>

      <form onSubmit={handleSaveAsana}>
        <div className="flex flex-col gap-2 p-4 pt-1">
          <div className="flex justify-center">
            <div
              className="timepicker relative form-floating mb-3 xl:w-96"
              data-mdb-with-icon="false"
              id="input-toggle-timepicker"
            >
              <input
                type="text"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Set Sanskrit Name"
                data-mdb-toggle="input-toggle-timepicker"
                minLength="5"
                maxLength={25}
                required
                autoFocus
                defaultValue={asanaObj.asana.sanskrit}
                onChange={(e) =>
                  setAsanaObj((prev) => {
                    prev.asana.sanskrit = e.target.value;
                    return { ...prev };
                  })
                }
              />
              <label forhtml="floatingInput" className="text-gray-500">
                Sanskrit Name
              </label>
            </div>
          </div>

          <div className="flex justify-center">
            <div
              className="timepicker relative form-floating mb-3 xl:w-96"
              data-mdb-with-icon="false"
              id="input-toggle-timepicker"
            >
              <input
                type="text"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Set Name"
                data-mdb-toggle="input-toggle-timepicker"
                minLength="5"
                maxLength={25}
                required
                defaultValue={asanaObj.asana.name}
                onChange={(e) =>
                  setAsanaObj((prev) => {
                    prev.asana.name = e.target.value;
                    return { ...prev };
                  })
                }
              />
              <label forhtml="floatingInput" className="text-gray-500">
                Name
              </label>
            </div>
          </div>

          {/* Image */}
          <div
            // onClick={handleSelectImage}
            className="flex justify-center cursor-pointer"
          >
            <div className="w-full h-44 flex justify-center items-center border border-dotted">
              <div className="p-4 rounded border border-dashed border-slate-600">
                {image ? (
                  <img
                    onClick={() => setClickImage(true)}
                    className="w-40 object-cover"
                    src={image}
                    alt="bild"
                  ></img>
                ) : (
                  <div onClick={() => setClickImage(true)} className="p-1">
                    select an image
                  </div>
                )}
                <FileUpload
                  className={`hidden`}
                  accept={'image/*'}
                  handleUpload={handleSelectImage}
                  click={clickImage}
                />
              </div>
            </div>
          </div>
          {/* LEVEL */}
          <div className="flex items-center justify-center mt-2 mx-2">
            <div
              className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg"
              role="group"
            >
              <button
                onClick={() =>
                  setAsanaObj((prev) => {
                    prev.level = 'beginners';
                    return { ...prev };
                  })
                }
                type="button"
                className={`rounded-none rounded-l inline-block px-4 py-2.5 ${
                  asanaObj.level === 'beginners'
                    ? 'bg-amber-700'
                    : 'bg-slate-600'
                } text-white font-medium text-xs leading-tight uppercase hover:bg-amber-700 focus:bg-amber-700 focus:outline-none focus:ring-0 active:bg-amber-800 transition duration-150 ease-in-out`}
              >
                beginners
              </button>
              <button
                onClick={() =>
                  setAsanaObj((prev) => {
                    prev.level = 'advanced beginners';
                    return { ...prev };
                  })
                }
                type="button"
                className={`rounded-none inline-block px-4 py-2.5 ${
                  asanaObj.level === 'advanced beginners'
                    ? 'bg-amber-700'
                    : 'bg-slate-600'
                } text-white font-medium text-xs leading-tight uppercase hover:bg-amber-700 focus:bg-amber-700 focus:outline-none focus:ring-0 active:bg-amber-800 transition duration-150 ease-in-out`}
              >
                advanced beginners
              </button>
              <button
                onClick={() =>
                  setAsanaObj((prev) => {
                    prev.level = 'advanced';
                    return { ...prev };
                  })
                }
                type="button"
                className={`rounded-none rounded-r inline-block px-4 py-2.5 ${
                  asanaObj.level === 'advanced'
                    ? 'bg-amber-700'
                    : 'bg-slate-600'
                } text-white font-medium text-xs leading-tight uppercase hover:bg-amber-700 focus:bg-amber-700 focus:outline-none focus:ring-0 active:bg-amber-800 transition duration-150 ease-in-out`}
              >
                advanced
              </button>
            </div>
          </div>
          {/* <div className="border border-dotted p-1">
            <div className="font-bold">Level</div>

            <div className="flex flex-col pl-8 justify-center">
              <div className="text-sm">
                <div className="form-check">
                  <input
                    className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="radio"
                    name="radioLevel"
                    id="radioLevel1"
                    defaultChecked
                  />
                  <label
                    className="form-check-label inline-block text-gray-800"
                    forhtml="radioLevel1"
                  >
                    beginners
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="radio"
                    name="radioLevel"
                    id="radioLevel2"
                  />
                  <label
                    className="form-check-label inline-block text-gray-800"
                    forhtml="radioLevel2"
                  >
                    advanced beginners
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="radio"
                    name="radioLevel"
                    id="radioLevel3"
                  />
                  <label
                    className="form-check-label inline-block text-gray-800"
                    forhtml="radioLevel3"
                  >
                    advanced
                  </label>
                </div>
              </div>
            </div>
          </div> */}
          {/* Tags */}
          <div className="flex flex-col justify-center">
            <div
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddTag(e);
                }
              }}
              className="timepicker relative form-floating mb-3 xl:w-96"
              data-mdb-with-icon="false"
              id="input-toggle-timepicker"
            >
              <input
                type="text"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Add tags to your asana"
                data-mdb-toggle="input-toggle-timepicker"
                minLength="3"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
              <label forhtml="floatingInput" className="text-gray-500">
                Tags
              </label>
            </div>
            <div className="flex flex-wrap gap-1">
              {asanaObj.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-1 pl-2 py-1 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
                >
                  <div className="mt-1">{tag}</div>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="bg-transparent hover focus:outline-none"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="times"
                      className="w-2 ml-1"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 352 512"
                    >
                      <path
                        fill="currentColor"
                        d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                      ></path>
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-blue-middle color-blue-dark flex justify-between pt-1">
          {asana?._id && asana.default === false ? (
            <button
              type="button"
              className="btn-red-outline btn-red-outline:hover cursor-pointer bg-white outline outline-2 flex flex-row self-center my-1 mb-2 ml-3"
              onClick={handleDeleteAsana}
            >
              <p className="font-material-symbols py-0 px-3">delete</p>
            </button>
          ) : (
            <div></div>
          )}
          <button className="btn-neutral btn-neutral:hover bg-white outline outline-2 flex flex-row self-center my-1 mb-2 mr-3">
            <span className="font-material-symbols">add_task</span>
            {/* <p className="inline pt-1 text-lg">add</p> */}
          </button>
          {/* <button className="btn-blue btn-blue:hover mx-2 mb-1">
            {asanaObj._id ? 'Update' : 'Create'}
          </button> */}
          {/* <button onClick={handleSaveAsana}>Save</button> */}
        </div>
      </form>
    </div>
  );
}
