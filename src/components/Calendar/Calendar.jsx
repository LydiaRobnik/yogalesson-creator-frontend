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

const calendarViews = ['dayGridMonth', 'dayGridWeek', 'dayGridDay'];
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

export default function Calendar() {
  const { loggedIn, login, logout, user, signup } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [calendarView, setCalendarView] = useState(calendarViews[0]);
  const [changeCalendarView, setChangeCalendarView] = useState(true);

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      // setEvents([]);
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (!events || events.length === 0) {
      const fetchData = () => {
        asanaService.getUserCalendar(user.id).then((entries) => {
          console.log('getUserCalendar', entries);
          setEvents(
            entries
              ?.sort((a, b) => new Date(a.event.date) - new Date(b.event.date))
              .map((entry) => {
                entry.event.id = entry._id;
                entry.event.classId = entry.class;
                return entry.event;
              })
          );
        });
      };
      fetchData();
    } else {
      closeModal();
    }

    return () => {};
  }, [events]);

  useEffect(() => {
    if (!changeCalendarView) setChangeCalendarView(true);
    return () => {};
  }, [changeCalendarView]);

  useEffect(() => {
    if (selectedEvent) {
      console.log('selectedEvent', selectedEvent);
      setSelectedDate({
        dateStr: selectedEvent.date,
        dateObj: new Date(selectedEvent.date)
      });
      openModal();
    }
    return () => {};
  }, [selectedEvent]);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
    setSelectedEvent(null);
  }

  function handleCalendarView(index) {
    setCalendarView(calendarViews[index]);
    setChangeCalendarView(false);
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
      date: arg.event.start,
      extendedProps: arg.event.extendedProps
    });

    const event = events.find((event) => event.id === arg.event.id);

    // todo open dialog with event details
    if (event) {
      setSelectedEvent(event);
      openModal();
    }
  }

  function deleteEvent(calendarId) {
    console.log('deleteEvent', calendarId);

    asanaService
      .deleteCalendarEntry(calendarId)
      .then((result) => setEvents([]))
      .catch((err) => {
        // todo handle error
        console.log('err', err);
      });
  }

  function saveEvent(calendarObj, classId) {
    if (!calendarObj) return;

    // if (calendarObj) {
    //   console.log('saveEvent', calendarObj);
    //   setEvents((prev) => {
    //     return [...prev, calendarObj];
    //   });
    // }

    if (calendarObj.id) {
      console.log('!!! UPDATE !!!');
      asanaService
        .saveCalendarEntry({
          _id: calendarObj.id,
          user: user.id,
          class: classId,
          event: calendarObj
        })
        .then((result) => {
          console.log('saveEvent result', result);
          setEvents((prev) => {
            return [...prev, calendarObj];
          });
          closeModal();
          setEvents([]);
        })
        .catch((err) => {
          // todo handle error
          console.log('err', err);
        });
      return;
    }

    // todo save in db
    asanaService
      .createCalendarEntry({
        user: user.id,
        class: classId,
        event: calendarObj
      })
      .then((result) => {
        console.log('saveEvent result', result);
        setEvents((prev) => {
          return [...prev, calendarObj];
        });
        closeModal();
        setEvents([]);
      })
      .catch((err) => {
        // todo handle error
        console.log('err', err);
      });
  }

  return (
    <div className="w-full">
      <div className="text-center text-2xl md:text-4xl pb-3 md:pb-8 color-blue-dark">
        Yoga Calendar
      </div>
      <div className="color-blue-middle text-right">
        <button onClick={() => handleCalendarView(0)}>month</button>
        <button onClick={() => handleCalendarView(1)}>week</button>
        <button onClick={() => handleCalendarView(2)}>day</button>
      </div>
      <div
        id="div-calendar"
        className="flex flex-col gap-2 md:gap-4 md:flex-row text-black w-full h-full"
      >
        <div className="cal-infobar w-1/4 order-1 border-2 text-black">
          <div className="text-lg font-bold text-center border-dashed border-b-slate-400 rounded-t border-b pt-2 mb-4 color-beige-light bg-blue-dark">
            Upcoming Events
          </div>
          <div className="flex flex-col gap-0">
            {events.map(
              (event) =>
                new Date(event.date) - new Date() >= 0 && (
                  <div
                    key={event.id}
                    onClick={() => setSelectedEvent((prev) => event)}
                    className={`cursor-pointer p-1 pt-2 hover:bg-beige-light`}
                    style={{ backgroundColor: event }}
                  >
                    <div className="grow border-b border-dashed">
                      <div className="text-xs">
                        <span className="font-bold mr-2">Date:</span>
                        <span
                          className="underline color-light p-1 rounded"
                          style={{ backgroundColor: event.backgroundColor }}
                        >
                          {new Date(event.date).toDateString()}
                        </span>
                      </div>
                      <div className="pl-2">{event.title}</div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
        {changeCalendarView && (
          <div className={`cal-cal grow md:order-2 ${modalIsOpen && '-z-10'}`}>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView={calendarView}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              weekends={true}
              events={events}
            />
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
            <div className="text-black relative">
              <button
                onClick={closeModal}
                className="btn-modal-close absolute top-1 right-1"
              >
                ✖️
              </button>
              <CalendarEntryDialog
                saveEvent={saveEvent}
                deleteEvent={deleteEvent}
                event={selectedEvent}
                date={selectedDate}
              />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
