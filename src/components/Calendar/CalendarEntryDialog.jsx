import { filter } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import asanaService from '../../api/asanaService';
import { AuthContext } from '../../context/AuthContext';
import './calendar.scss';

export default function CalendarEntryDialog({ date }) {
  const { loggedIn, user } = useContext(AuthContext);

  const [userClasses, setUserClasses] = useState([]);
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    if (loggedIn) {
      const fetchData = () => {
        asanaService.getUserClasses(user.id).then((data) => {
          console.log('userClasses', data);
          setUserClasses(
            data?.sort(
              (a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt)
            )
          );
        });
      };
      fetchData();
    }
    return () => {};
  }, [loggedIn]);

  useEffect(() => {
    userClasses.forEach((c) => (c.checked = false));
    return () => {};
  }, [filterName]);

  const selectClass = (classId) => {
    userClasses.forEach((c) => (c.checked = false));
    userClasses.find((c) => c._id === classId).checked = true;
    setUserClasses([...userClasses]);
  };

  return (
    <div id="CalendarEntryDialog-jsx" className="text-black">
      <h2 className="text-lg font-bold text-center border-dashed border-b-slate-400 border-b bg-beige color-blue-dark p-4 pb-2 mb-4">
        Create Calendar Entry
      </h2>
      <div className="flex gap-4 p-0">
        <div className="border-r-slate-400 border-r border-dashed p-3">
          {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
          <div>Date:</div>
          <div>{date?.toLocaleDateString()}</div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-bold">Select Yoga-Class:</div>

          <input
            className={`w-56 grow-0 border-gray-400 border-2 rounded-md p-1`}
            type="text"
            placeholder="Filter by name"
            onChange={(e) => setFilterName(e.target.value)}
          />
          <div className="cal-entry-userclasses flex flex-col gap-0">
            {userClasses &&
              userClasses
                // filter by name
                .filter((yogaclass) =>
                  yogaclass.title.toLowerCase().includes(filterName)
                )
                .map((yogaclass) => (
                  <div
                    onClick={() => selectClass(yogaclass._id)}
                    key={yogaclass._id}
                    className={`flex items-center border-dashed border-b-slate-300 border-b
                  hover:bg-beige-light p-2 pr-5 ${
                    yogaclass.checked === true ? 'bg-slate-200' : ''
                  }`}
                  >
                    <div className="w-8">
                      {yogaclass.checked === true ? '✅' : ''}
                    </div>
                    <div>
                      <div>{yogaclass.title}</div>
                      <div className="text-xs">
                        <span className="font-bold mr-2">last modified:</span>
                        {new Date(yogaclass.modifiedAt).toDateString()}
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
