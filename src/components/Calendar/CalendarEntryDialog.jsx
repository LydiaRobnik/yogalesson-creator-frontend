import { filter } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import asanaService from '../../api/asanaService';
import { AuthContext } from '../../context/AuthContext';
import './calendar.scss';

const colors = [
  'rgb(34, 182, 34)',
  'rgb(206, 137, 9)',
  'rgb(67, 67, 196)',
  'rgb(250, 57, 57)',
  'rgb(141, 23, 141)'
];

export default function CalendarEntryDialog({
  date,
  event,
  saveEvent,
  deleteEvent
}) {
  const { loggedIn, user } = useContext(AuthContext);

  const [userClasses, setUserClasses] = useState([]);
  const [filterName, setFilterName] = useState(event ? event.title : '');
  const [color, setColor] = useState(
    event
      ? colors[colors.findIndex((c) => c === event?.backgroundColor)]
      : colors[0]
  );

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

  const selectClass = (classId) => {
    userClasses.forEach((c) => (c.checked = false));
    userClasses.find((c) => c._id === classId).checked = true;
    setUserClasses([...userClasses]);
  };

  const handleSave = () => {
    const yogaClass = userClasses.find((c) => c.checked === true);
    const calendarObj = {
      // start: +date.dateObj + 60000 * 120,
      date: date.dateStr,
      title: yogaClass.title,
      backgroundColor: color,
      borderColor: color,
      id: event?.id
      // extendedProps: yogaClass
    };
    saveEvent(calendarObj, yogaClass._id);
  };

  const handleDelete = () => {
    deleteEvent(event.id);
  };

  return (
    <div id="CalendarEntryDialog-jsx" className="text-black">
      <h2 className="text-lg font-bold text-center border-dashed border-b-slate-400 border-b bg-red color-beige-light p-4 pb-2 mb-4">
        Create Calendar Entry
      </h2>
      <div className=" grid grid-cols-[1fr_1fr] gap-4 p-0">
        <div className="flex flex-col gap-2 border-r-slate-400 border-r border-dashed px-3">
          <div className="font-bold">Select Time</div>
          {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
          {/* <div>Date:</div> */}
          <div
            className={`font-bold border-dashed border rounded-full text-center p-2 pt-3 color-light`}
            style={{ backgroundColor: color }}
          >
            {date?.dateObj.toDateString()}
          </div>
          <div>from - to</div>
          <div className="border border-dashed p-2">
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
        <div className="flex flex-col gap-1 w-60">
          <div className="font-bold">Select Yoga-Class:</div>

          <input
            className={`w-56 grow-0 border-gray-400 border-2 rounded-md p-1`}
            type="text"
            value={filterName}
            placeholder="Filter by name"
            onChange={(e) => setFilterName(e.target.value)}
          />
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
          <button onClick={handleDelete} className="flex text-2xl">
            <span className="text-sm">Delete</span> ⛔️
          </button>
        ) : (
          <div></div>
        )}
        <button onClick={handleSave} className="flex text-2xl">
          <span className="text-sm">{event?.id ? 'Update' : 'Create'}</span> ✅
        </button>
      </div>
    </div>
  );
}
