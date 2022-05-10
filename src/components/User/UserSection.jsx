import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import backend from '../../api/asanaService';
import useBreakpoint from '../../custom/useBreakpoint';
import { v4 as uuidv4 } from 'uuid';

export default function UserSection() {
  // hooks
  const navigate = useNavigate();
  const point = useBreakpoint();
  const { loggedIn, user } = useContext(AuthContext);

  // states
  const [userClasses, setUserClasses] = useState([]);
  const [userSequences, setUserSequences] = useState([]);
  const [asanas, setAsanas] = useState([]);
  const [systemMessages, setSystemMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [asanaService, setAsanaService] = useState(backend);
  const [showNewSequence, setShowNewSequence] = useState(false);
  const [yogaClassToAdd, setYogaClassToAdd] = useState({
    title: '',
    user: user.id,
    plan: [],
    favourite: false
  });
  const [sequenceToAdd, setSequenceToAdd] = useState({
    user: user.id,
    type: 'sequence',
    duration: 3,
    description: '',
    title: '',
    asanas: []
  });

  useEffect(() => {
    asanaService.setAddErrorMessage(addSystemError);
    // backend.setAddErrorMessage(addSystemError);
    // setAsanaService({ ...backend });
    return () => {};
  }, []);

  useEffect(() => {
    if (loggedIn) {
      const fetchData = () => {
        setLoading(true);
        asanaService.getUserClasses(user.id).then((data) => {
          console.log('📒 getUserClasses', data);
          setUserClasses(data);
        });
        asanaService.getUserSequences(user.id).then((data) => {
          setUserSequences(data);
        });
        asanaService.getDefaultAsanas(user.id).then((data) => {
          setAsanas(data);
        });
        setLoading(false);
      };
      console.log('📒 📒 📒 📒 📒 fetchData Dashboard!!!!', asanaService);
      if (asanaService) fetchData();
    }
    console.log('loggedIn', loggedIn, user);
    // if (!loggedIn) navigate(`/403`);
    // if (!loggedIn) navigate(`/unauthorized`); // todo

    return () => {};
  }, [loggedIn, yogaClassToAdd]);

  const handleDeleteMessage = (id) => {
    // hide before delete
    document.getElementById(id).style.display = 'none';

    const newMessages = systemMessages.filter((message) => message.id !== id);
    setSystemMessages(newMessages);
  };

  const addSystemInfo = (message) => {
    addSystemMessage('info', message);
  };

  const addSystemSuccess = (message) => {
    addSystemMessage('success', message);
  };

  const addSystemError = (message) => {
    console.log('❌ addSystemError', message.toString());
    addSystemMessage('error', message);
  };

  const addSystemMessage = (type, message) => {
    console.log('📒 addSystemMessage', systemMessages);
    const newMessage = { id: uuidv4(), type: type, message };
    setSystemMessages((prev) => [newMessage, ...prev]);
  };

  const clearSystemMessages = () => {
    console.log('🧹 clearSystemMessages');
    setSystemMessages([]);
  };

  const getMessageColor = (type) => {
    switch (type) {
      case 'info':
        return 'yellow';
      case 'success':
        return 'green';
      case 'error':
        return 'red';
      default:
        return 'blue';
    }
  };

  return (
    <div className="w-full h-full p-3 pt-4">
      {/* tailwind only add direct usage of utilities, not dynamic */}
      <div
        className="hidden 
        bg-red-100 bg-green-100 bg-yellow-100 bg-blue-100
        bg-red-500 bg-green-500 bg-yellow-500 bg-blue-500
        bg-red-600 bg-green-600 bg-yellow-600 bg-blue-600
        bg-red-800 bg-green-800 bg-yellow-800 bg-blue-800"
      ></div>
      <div className="flex flex-col">
        <main className="flex">
          {loggedIn ? (
            <Outlet
              context={{
                userClasses,
                setUserClasses,
                asanas,
                setAsanas,
                userSequences,
                setUserSequences,
                loading,
                yogaClassToAdd,
                setYogaClassToAdd,
                sequenceToAdd,
                setSequenceToAdd,
                setLoading,
                showNewSequence,
                setShowNewSequence,
                asanaService,
                addSystemInfo,
                addSystemSuccess,
                addSystemError,
                addSystemMessage,
                clearSystemMessages
              }}
            />
          ) : (
            <div>nope</div>
          )}
        </main>
      </div>
      <div id="systemMessageDiv" className="fixed bottom-3 right-2">
        {systemMessages &&
          systemMessages.length > 0 &&
          systemMessages.map((msg) => (
            <div
              id={msg.id}
              onAnimationEnd={() => handleDeleteMessage(msg.id)}
              key={msg.id}
              class="fade-out text-center py-2 lg:px-4"
            >
              <div
                class={`flex p-2 bg-${getMessageColor(
                  msg.type
                )}-800 items-center text-${getMessageColor(
                  msg.type
                )}-100 leading-none rounded-full`}
                role="alert"
              >
                <span
                  class={`flex rounded-full bg-${getMessageColor(
                    msg.type
                  )}-500 uppercase px-2 py-1 text-xs font-bold mr-3`}
                >
                  <span className={`mt-1`}>{msg.type}</span>
                </span>
                <span class="font-semibold text-left flex-auto mt-1 mr-4">
                  {msg.message.toString()}
                </span>
                <button
                  onClick={() => handleDeleteMessage(msg.id)}
                  class="px-1 py-0"
                >
                  <svg
                    class={`fill-current h-6 w-6 text-${getMessageColor(
                      msg.type
                    )}-500`}
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
