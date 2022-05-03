import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import Modal from 'react-modal';

import asanaService from '../../api/asanaService';
import { AuthContext } from '../../context/AuthContext';
import './calendar.scss';
import CalendarEntryDialog from './CalendarEntryDialog';

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
    border: '2px dotted lightgray'
  }
};
Modal.setAppElement('#root');

export default function Calendar() {
  const { loggedIn, login, logout, user, signup } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    return () => {};
  }, [loggedIn]);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleDateClick(arg) {
    console.log('handleDateClick', arg);

    setSelectedDate({ dateStr: arg.dateStr, dateObj: new Date(arg.dateStr) });

    openModal();
  }

  function handleEventClick(arg) {
    console.log('handleEventClick', {
      title: arg.event.title,
      id: arg.event.id,
      date: arg.event.start
    });

    // setSelectedDate({ dateStr: arg.dateStr, dateObj: new Date(arg.dateStr) });

    // openModal();
  }

  function saveEvent(calendarObj) {
    if (calendarObj && calendarObj.date && calendarObj.yogaClass) {
      console.log('saveEvent', calendarObj);
      setEvents((prev) => {
        return [
          ...prev,
          {
            title: calendarObj.yogaClass?.title,
            date: calendarObj.date.dateStr,
            id: calendarObj.yogaClass?._id
          }
        ];
      });
    }
    closeModal();
  }

  return (
    <div
      id="div-calendar"
      className="flex flex-col gap-2 md:gap-4 md:flex-row text-black w-full h-full"
    >
      <div className="cal-infobar w-1/4 order-1 border-2 text-black">
        Infobar
        {/* <button onClick={openModal}>Open Modal</button> */}
      </div>
      <div className={`cal-cal grow md:order-2 ${modalIsOpen && '-z-10'}`}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          weekends={true}
          events={events}
        />
      </div>

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
          <div className="text-black relative">
            <button onClick={closeModal} className="absolute top-1 right-0">
              ❌
            </button>
            <CalendarEntryDialog saveEvent={saveEvent} date={selectedDate} />
          </div>
        </Modal>
      </div>
    </div>
  );
}
