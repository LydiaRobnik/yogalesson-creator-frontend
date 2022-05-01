import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import asanaService from "../../api/asanaService";
import useBreakpoint from "../../custom/useBreakpoint";

export default function UserSection() {
  const navigate = useNavigate();
  const { loggedIn, user } = useContext(AuthContext);
  const [userClasses, setUserClasses] = useState([]);
  const [userSequences, setUserSequences] = useState([]);
  const [asanas, setAsanas] = useState([]);
  const [selectedAsanas, setSelectedAsanas] = useState([]);
  const [currentSequences, setCurrentSequences] = useState([]);
  const [loading, setLoading] = useState(false);
  const point = useBreakpoint();
  const gridResponsibility = () => {
    if (point === "sm") {
      return "grid-cols-2";
    } else if (point === "md") {
      return "grid-cols-3";
    } else if (point === "lg") {
      return "grid-cols-4";
    } else if (point === "xl") {
      return "grid-cols-5";
    } else if (point === "2xl") {
      return "grid-cols-6";
    } else {
      return "grid-cols-1";
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
    // if (!loggedIn) navigate(`/403`);
    // if (!loggedIn) navigate(`/unauthorized`); // todo

    return () => {};
  }, [loggedIn]);

  return (
    <div className="pt-4">
      <div className="flex flex-col">
        <main className="flex">
          {loggedIn ? (
            <Outlet
              context={{
                selectedAsanas,
                setSelectedAsanas,
                userClasses,
                setUserClasses,
                asanas,
                setAsanas,
                userSequences,
                setUserSequences,
                loading,
                gridResponsibility,
                currentSequences,
                setCurrentSequences
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
