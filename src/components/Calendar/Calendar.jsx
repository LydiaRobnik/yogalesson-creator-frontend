import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick

import asanaService from '../../api/asanaService';
import { AuthContext } from '../../context/AuthContext';
import './calendar.scss';

export default function Calendar() {
  const { loggedIn, login, logout, user, signup } = useContext(AuthContext);
  const [events, setEvents] = useState([
    { title: 'event 1 (17-19pm)', date: '2022-05-11' },
    { title: 'event 2', date: '2022-05-19' }
  ]);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  function handleDateClick(arg) {
    console.log('handleDateClick', arg);
    setEvents((prev) => {
      return [
        ...prev,
        {
          title: 'new event',
          date: arg.dateStr
        }
      ];
    });
  }

  useEffect(() => {
    return () => {};
  }, [loggedIn]);

  return (
    <div id="div-calendar" className="text-black w-full h-full">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        weekends={false}
        events={events}
      />
    </div>
  );
}
