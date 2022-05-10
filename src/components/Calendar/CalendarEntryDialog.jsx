import { filter } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
// import asanaService from '../../api/asanaService';
import { AuthContext } from '../../context/AuthContext';
import TimePicker from 'react-time-picker';
import { BsArrowReturnRight } from 'react-icons/bs';
import './calendar.scss';
import { calendarColors as colors, formatDate } from '../../custom/utils';
import { useOutletContext } from 'react-router-dom';

// const colors = calendarColors

const regulars = ['once', 'daily', 'weekly', 'monthly'];

export default function CalendarEntryDialog({
  date,
  event,
  saveEvent,
  deleteEvent
}) {
  const { loggedIn, user } = useContext(AuthContext);
  const { asanaService, addSystemError } = useOutletContext();

  const [userClasses, setUserClasses] = useState([]);
  const [filterName, setFilterName] = useState(event ? event.title : '');
  const [color, setColor] = useState(
    event ? colors[colors.findIndex((c) => c === event?.color)] : colors[0]
  );
  const [valueFrom, onChangeFrom] = useState(event ? event.startT : '10:00');
  const [valueTo, onChangeTo] = useState(event ? event.endT : '12:00');
  const [regular, setRegular] = useState(regulars[0]);
  const [regularCount, setRegularCount] = useState(5);

  useEffect(() => {
    if (loggedIn) {
      const fetchData = () => {
        asanaService.getUserClasses(user.id).then((data) => {
          console.log('userClasses', data);

          const sorted = data?.sort(
            (a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt)
          );

          if (event) {
            // setFilterName(event.title);
            // console.log('event', event);
            const found = sorted.find((c) => c._id === event.classId);
            if (found) found.checked = true;
          }

          setUserClasses(sorted);
        });
      };
      fetchData();
    }
    return () => {};
  }, [loggedIn, event]);

  useEffect(() => {
    userClasses.forEach((c) => (c.checked = false));
    return () => {};
  }, [filterName]);

  useEffect(() => {
    // console.log('valueFrom', valueFrom, 'valueTo', valueTo);
    const fromNumber = +valueFrom.replaceAll(':', '');
    const toNumber = +valueTo.replaceAll(':', '');

    // console.log('fromNumber', fromNumber, 'toNumber', toNumber);

    if (toNumber < fromNumber) {
      const newTo = fromNumber + 100;
      onChangeTo(
        newTo.toString().substring(0, 2) + ':' + newTo.toString().substring(2)
      );
    }

    return () => {};
  }, [valueFrom]);

  const selectClass = (classId) => {
    userClasses.forEach((c) => (c.checked = false));
    userClasses.find((c) => c._id === classId).checked = true;
    setUserClasses([...userClasses]);
  };

  const handleSave = () => {
    const yogaClass = userClasses.find((c) => c.checked === true);
    if (!yogaClass) {
      addSystemError('Please select a class');
      return;
    }
    const calendarObj = {
      // startT: +date.dateObj + 60000 * 120,
      date: date.dateStr,
      title: yogaClass.title,
      backgroundColor: color,
      borderColor: color,
      id: event?.id,
      startT: valueFrom,
      endT: valueTo,
      regular: regular,
      regularCount: regularCount
      // extendedProps: yogaClass
    };
    saveEvent(calendarObj, yogaClass._id);
  };

  const handleDelete = () => {
    deleteEvent(event.id);
  };

  return (
    <div id="CalendarEntryDialog-jsx" className="text-black">
      <h2 className="text-lg font-bold text-center border-dashed border-b-slate-400 border-b bg-blue-dark text-white p-4 pb-2 mb-4">
        Create Calendar Entry
      </h2>
      <div className=" grid grid-cols-[1fr_1fr] gap-4 p-0">
        <div className="flex flex-col gap-2 border-r-slate-400 border-r border-dashed px-3">
          <div className="h-full flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="font-bold">Select Time & Schedule</div>
              {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
              {/* <div>Date:</div> */}
              <div
                className={`font-bold border-dashed border rounded-full text-center p-2 pt-3 color-light`}
                style={{ backgroundColor: color }}
              >
                {formatDate(date?.dateObj)}
              </div>
              <div className="flex flex-col gap-3 border border-dashed py-2">
                <div className="grid grid-cols-[38px_1fr] gap-2">
                  <div className="text-right mt-1">from</div>
                  <TimePicker
                    onChange={onChangeFrom}
                    value={valueFrom}
                    className="bg-white"
                  />
                  <div className="text-right mt-1">to</div>
                  <TimePicker
                    onChange={onChangeTo}
                    value={valueTo}
                    className="bg-white"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 border border-dashed py-2">
                <div className="grid grid-cols-[1fr] gap-2">
                  {/* <div className="text-right mt-1">rule</div> */}
                  <select
                    className="w-full"
                    value={regular}
                    onChange={(e) => setRegular(e.target.value)}
                  >
                    {regulars.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  {regular && regular !== regulars[0] && (
                    <div className="flex justify-end gap-3 px-1">
                      <BsArrowReturnRight />
                      <div>repeat: </div>
                      <input
                        className="w-12 text-right"
                        type="number"
                        min={2}
                        max={30}
                        value={regularCount}
                        onChange={(e) => setRegularCount(e.target.value)}
                      />
                      <div>times</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="border border-dashed p-2 mb-2">
              <div className="text-center mb-1">Choose a color</div>
              <div className="flex justify-between gap-1">
                {colors.map((color) => (
                  <div
                    key={color}
                    onClick={() => setColor(color)}
                    className={`cursor-pointer rounded-full w-4 h-4`}
                    style={{ backgroundColor: color }}
                  >
                    <span className="invisible">a</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 w-60">
          <div className="font-bold">Select Yoga-Class:</div>
          <div className="flex justify-center">
            <div
              className="timepicker relative form-floating mb-3 mr-2 xl:w-96"
              data-mdb-with-icon="false"
              id="input-toggle-timepicker"
            >
              <input
                type="text"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                value={filterName}
                placeholder="Filter by name"
                data-mdb-toggle="input-toggle-timepicker"
                onChange={(e) => setFilterName(e.target.value)}
              />
              <label htmlFor="floatingInput" className="text-gray-500">
                Filter by name
              </label>
            </div>
          </div>

          {/* <input
            className={`w-56 grow-0 border-gray-400 border-2 rounded-md p-1`}
            type="text"
            value={filterName}
            placeholder="Filter by name"
            onChange={(e) => setFilterName(e.target.value)}
          /> */}
          <div className="cal-entry-userclasses flex flex-col gap-0">
            {userClasses &&
              userClasses
                // filter by name
                .filter((yogaclass) =>
                  yogaclass.title
                    .toLowerCase()
                    .includes(filterName.toLowerCase())
                )
                .map((yogaclass) => (
                  <div
                    onClick={() => selectClass(yogaclass._id)}
                    key={yogaclass._id}
                    className={`grid grid-cols-[26px_1fr] items-center border-dashed border-b-slate-300 border-b
                  hover:bg-beige-light p-2 ${
                    yogaclass.checked === true ? `color-light` : ''
                  }`}
                    style={
                      yogaclass.checked === true
                        ? { backgroundColor: color }
                        : {}
                    }
                  >
                    <div className="">
                      {yogaclass.checked === true ? '✅' : ''}
                    </div>
                    <div className="grow">
                      <div>{yogaclass.title}</div>
                      <div className="text-xs">
                        <span className="font-bold mr-2">modified:</span>
                        {new Date(yogaclass.modifiedAt).toDateString()}
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full color-light text-right pt-1 bg-blue-middle">
        {event?.id ? (
          <button
            className="btn-red-outline btn-red-outline:hover cursor-pointer outline outline-2 flex flex-row self-center my-1 mb-2 ml-3"
            onClick={handleDelete}
          >
            <p className="font-material-symbols py-0 px-3">delete</p>
          </button>
        ) : (
          // <button onClick={handleDelete} className="flex text-2xl">
          //   <span className="text-sm">Delete</span> ⛔️
          // </button>
          <div></div>
        )}

        <button
          className="btn-neutral btn-neutral:hover bg-white outline outline-2 flex flex-row self-center my-1 mb-2 mr-3"
          onClick={handleSave}
        >
          <span className="font-material-symbols">add_task</span>
          {/* <p className="inline pt-1 text-lg">add</p> */}
        </button>
        {/* <button onClick={handleSave} className="flex text-2xl">
          <span className="text-sm">{event?.id ? 'Update' : 'Create'}</span> ✅
        </button> */}
      </div>
    </div>
  );
}
