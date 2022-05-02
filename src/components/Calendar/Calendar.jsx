import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

import asanaService from '../../api/asanaService';
import { AuthContext } from '../../context/AuthContext';
import './calendar.scss';

export default function Calendar() {
  const { loggedIn, login, logout, user, signup } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  function handleDateClick(arg) {
    console.log('handleDateClick', arg);
  }

  useEffect(() => {
    return () => {};
  }, [loggedIn]);

  return (
    <div id="div-calendar" className="text-black w-full h-full">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        // dateClick={handleDateClick}
      />
    </div>
  );
}
