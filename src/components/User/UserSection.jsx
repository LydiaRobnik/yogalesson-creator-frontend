import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import asanaService from '../../api/asanaService';
import useBreakpoint from '../../custom/useBreakpoint';

export default function UserSection() {
  // hooks
  const navigate = useNavigate();
  const point = useBreakpoint();
  const { loggedIn, user } = useContext(AuthContext);

  // states
  const [userClasses, setUserClasses] = useState([]);
  const [userSequences, setUserSequences] = useState([]);
  const [asanas, setAsanas] = useState([]);
  const [loading, setLoading] = useState(false);
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

  // functions
  const gridResponsiveness = () => {
    if (point === 'sm') {
      return 'grid-cols-2';
    } else if (point === 'md') {
      return 'grid-cols-3';
    } else if (point === 'lg') {
      return 'grid-cols-4';
    } else if (point === 'xl') {
      return 'grid-cols-5';
    } else if (point === '2xl') {
      return 'grid-cols-6';
    } else {
      return 'grid-cols-1';
    }
  };

  useEffect(() => {
    if (loggedIn) {
      const fetchData = () => {
        setLoading(true);
        asanaService.getUserClasses(user.id).then((data) => {
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
      fetchData();
    }
    console.log('loggedIn', loggedIn, user);
    // if (!loggedIn) navigate(`/403`);
    // if (!loggedIn) navigate(`/unauthorized`); // todo

    return () => {};
  }, [loggedIn]);

  return (
    <div className="w-full max-w-7xl p-3 pt-4">
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
                gridResponsiveness,
                yogaClassToAdd,
                setYogaClassToAdd,
                sequenceToAdd,
                setSequenceToAdd,
                setLoading,
                showNewSequence,
                setShowNewSequence
              }}
            />
          ) : (
            <div>nope</div>
          )}
        </main>
      </div>
    </div>
  );
}
