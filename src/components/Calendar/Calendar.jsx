import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import Modal from 'react-modal';

// import asanaService from '../../api/asanaService';
import { AuthContext } from '../../context/AuthContext';
import './calendar.scss';
import CalendarEntryDialog from './CalendarEntryDialog';
import { formatDate } from '../../custom/utils';

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
  const {
    loading,
    asanaService,
    addSystemInfo,
    addSystemSuccess,
    addSystemError,
    addSystemMessage,
    clearSystemMessages
  } = useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    clearSystemMessages();
    if (loggedIn) {
    }
    return () => {};
  }, []);

  events.displayFirstMonth = false;
  events.displayToday = false;
  events.displayTomorrow = false;

  useEffect(() => {
    if (!events || events.length === 0) {
      const fetchData = () => {
        asanaService.getUserCalendar(user.id).then((entries) => {
          console.log('getUserCalendar', entries);
          if (!entries || entries.length === 0) return;

          setEvents(
            entries
              .sort(
                (a, b) =>
                  getCompleteEventDate(a.event) - getCompleteEventDate(b.event)
              )
              .map((entry) => {
                entry.event.id = entry._id;
                entry.event.classId = entry.class;
                entry.event.color = entry.event.backgroundColor;
                // console.log('event', entry.event);
                // opacity for old events
                if (getCompleteEventDate(entry.event) < new Date()) {
                  const opacity = entry.event.backgroundColor?.replace(
                    ')',
                    ', 0.4)'
                  );
                  entry.event.backgroundColor = opacity;
                  entry.event.borderColor = opacity;
                  // entry.event.textColor = 'black';
                } else {
                }
                return entry.event;
              })
          );
        });
      };
      fetchData();
    } else {
      // console.log('🙈 events', events);
    }

    closeModal();

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
      .then((result) => {
        setEvents([]);
        addSystemSuccess('Event deleted');
      })
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
          addSystemSuccess('Event saved');
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
        addSystemSuccess('Event created');
        closeModal();
        setEvents([]);
      })
      .catch((err) => {
        // todo handle error
        console.log('err', err);
      });
  }

  const getTomorrow = (eventDate) => {
    const date = new Date(eventDate);
    date.setDate(date.getDate() + 1);

    // console.log('getTomorrow', date.toDateString(), eventDate);
    return date.toDateString();
  };

  const isToday = (eventDate) => {
    return new Date(eventDate).toDateString() === new Date().toDateString();
  };

  const isTomorrow = (eventDate) => {
    return new Date(eventDate).toDateString() === getTomorrow(new Date());
  };

  const getCompleteEventDate = (event) => {
    // if (!event.date) return;
    const date = new Date(event.date);
    date.setHours(event.startT.split(':')[0]);
    date.setMinutes(event.startT.split(':')[1]);

    console.log(
      'getCompleteEventDate',
      date,
      event.date,
      date < new Date() ? 'old' : 'new'
    );
    return date;
  };

  return (
    <div className="w-full">
      {/* <div className="text-center text-2xl md:text-4xl pb-3 md:pb-8 color-blue-dark">
        Your Yoga Calendar
      </div>
      <div className="color-blue-middle text-right">
        <button onClick={() => handleCalendarView(0)}>month</button>
        <button onClick={() => handleCalendarView(1)}>week</button>
        <button onClick={() => handleCalendarView(2)}>day</button>
      </div> */}
      <div
        id="div-calendar"
        className="flex flex-col gap-2 md:gap-4 md:flex-row text-black w-full h-full"
      >
        <div className="w-56 min-w-fit order-1 self-center md:self-start border-2 text-black">
          <div className="text-lg font-bold text-center border-dashed border-b-slate-400 rounded-t border-b pt-2 mb-4 text-white bg-blue-dark">
            Upcoming Events
          </div>
          <div className="cal-infobar flex flex-col gap-0 overflow-y-auto overflow-x-hidden ">
            {events
              .filter(
                (event) =>
                  new Date(event.date) - new Date(new Date().toDateString()) >=
                  0
              )
              .map((event, index, array) => (
                <div key={event.id}>
                  {(() => {
                    // console.log('index', index, event.date);
                    // today
                    if (
                      // index === 0 ||
                      !events.displayToday &&
                      isToday(event.date)
                    ) {
                      events.displayToday = true;
                      // console.log(events);
                      console.log('today', index, event.date);
                      return (
                        <div
                          className={`font-bold text-center opacity-50 ${
                            index > 0 && 'mt-3'
                          }`}
                        >
                          Today
                        </div>
                      );
                    } else if (
                      // tomorrow
                      // index === 0 ||
                      !events.displayTomorrow &&
                      isTomorrow(event.date)
                    ) {
                      events.displayTomorrow = true;
                      // console.log(events);
                      console.log('tomorrow', index, event.date);
                      return (
                        <div
                          className={`font-bold text-center opacity-50 ${
                            index > 0 && 'mt-3'
                          }`}
                        >
                          Tomorrow
                        </div>
                      );
                    } else if (
                      // month
                      (!events.displayFirstMonth &&
                        !isToday(event.date) &&
                        !isTomorrow(event.date)) ||
                      (events.displayFirstMonth &&
                        new Date(event.date).getMonth() !==
                          new Date(array[index - 1]?.date).getMonth())
                    ) {
                      events.displayFirstMonth = true;
                      console.log('displayMonth', index, event.date);
                      return (
                        <div
                          className={`font-bold text-center opacity-50 ${
                            index > 0 && 'mt-3'
                          }`}
                        >
                          {new Date(event.date).toLocaleString('en-us', {
                            month: 'long'
                          })}
                        </div>
                      );
                    }
                  })()}
                  <div
                    onClick={() => setSelectedEvent((prev) => event)}
                    className={`cursor-pointer p-1 pt-2 hover:bg-beige-light`}
                  >
                    <div className="grow border-b border-dashed">
                      <div className="text-xs">
                        <span className="font-bold mr-2">Date:</span>
                        <span
                          className="underline color-light p-1 rounded"
                          style={{ backgroundColor: event.backgroundColor }}
                        >
                          {new Date(event.date).toDateString()}
                          {/* {formatDate(new Date(event.date))} */}
                        </span>
                        <span className="ml-2 text-sm">
                          <sup>
                            {event.startT} - {event.endT}
                          </sup>
                        </span>
                      </div>
                      <div className="pl-2 pt-1">{event.title}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {changeCalendarView && (
          <div className={`cal-cal grow md:order-2 ${modalIsOpen && '-z-10'}`}>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView={calendarView}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              // contentHeight={'auto'}
              height={'max(600px, 100vh - 120px)'}
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
              <div className="bg-light">
                <CalendarEntryDialog
                  saveEvent={saveEvent}
                  deleteEvent={deleteEvent}
                  event={selectedEvent}
                  date={selectedDate}
                />
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
