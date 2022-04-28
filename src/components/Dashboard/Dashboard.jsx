import React, { useEffect, useState, useContext } from "react";
import http from "../../api/http-common";
import asanaService from "../../api/asanaService";
import { AuthContext } from "../../context/AuthContext";
import "./dashboard.scss";
import useBreakpoint from "../../custom/useBreakpoint";

// import components
import ClassCard from "../ClassCard/ClassCard.jsx";

// import data
import data from "../../assets/class";

export default function Dashboard({ loading, setLoading }) {
  // states
  const [classes, setClasses] = useState(data);
  const [asanas, setAsanas] = useState(data);
  const point = useBreakpoint();
  const { loggedIn, user } = useContext(AuthContext);
  // const latestClasses = classes.slice();

  // sort classes by date
  classes.sort((a, b) => {
    return new Date(b.modifiedAt) - new Date(a.modifiedAt);
  });

  // fetches
  console.log("Lydia:", user);

  useEffect(() => {
    if (loggedIn) {
      const fetchData = () => {
        setLoading(true);
        asanaService.getUserClasses(user.id, true).then((data) => {
          console.log("dataLydia", data);
        });
        setLoading(false);
      };
      fetchData();
    }
    return () => {};
  }, [loggedIn]);

  // useEffect(() => {
  //   console.log("useEffect");

  //   const fetchData = () => {
  //     setLoading(true);
  //     http(true)
  //       .get("/api/asanaSer")
  //       .then((resp) => {
  //         console.log("latest classes", resp.data);
  //         setAsanas(resp.data);
  //       });
  //     setLoading(false);
  //   };

  //   fetchData();
  // }, []);

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

  return (
    <>
      {loading && (
        <lottie-player
          src="https://assets1.lottiefiles.com/packages/lf20_s00z9gco.json"
          background="transparent"
          speed="1"
          style={{ width: "300px", height: "300px" }}
          loop
          autoplay
        ></lottie-player>
      )}

      {!loading && (
        <>
          <div
            className={`p-4 w-full flex flex-row ${
              point === "xs" ? "justify-center" : "justify-start"
            }`}
          >
            <button className="btn-blue btn-blue:hover mx-2 flex flex-row items-center">
              <p className="font-material inline pr-2">add</p>
              <p className="inline pt-1">new class</p>
            </button>
            <button className="btn-red btn-blue:hover mx-2 flex flex-row items-center">
              <p className="font-material inline pr-2">add</p>
              <p className="inline pt-1">random class</p>
            </button>
          </div>

          <div
            className={`px-6
        w-full ${point === "xs" ? "justify-center" : "justify-start"}`}
          >
            {classes.length === 0 && (
              <>
                <div className="flex flex-col justify-center">
                  <span className="material-symbols-outlined color-blue-darkest text-center text-4xl p-2">
                    note_add
                  </span>
                  <h3 className="color-blue-darkest text-center font-bold">
                    No classes
                  </h3>
                  <p className="color-blue-darkest text-center">
                    Get started by creating a new class.
                  </p>
                </div>
              </>
            )}
            {classes.length > 0 && (
              <h2
                className={`color-blue-darkest text-4xl mt-8 mb-4 ${
                  point === "xs" ? "text-center" : "text-start"
                }`}
              >
                recently used
              </h2>
            )}
            <div
              className={`justify-center grid gap-4 ${gridResponsibility()}`}
            >
              {classes &&
                classes.map((classItem, index) => (
                  <>
                    <ClassCard classItem={classItem} />
                  </>
                ))}
            </div>
          </div>

          <div
            className={`px-6
       w-full ${point === "xs" ? "justify-center" : "justify-start"}`}
          >
            {/* edit the following line, after addition of the favorits key into backend */}
            {classes.length > 0 ||
              (classes.length.favorit === 0 && (
                <>
                  <div className="flex flex-col justify-center">
                    <span class="material-symbols-outlined color-blue-darkest text-center text-4xl p-2">
                      folder_special
                    </span>
                    <h3 className="color-blue-darkest text-center font-bold">
                      No favorites defined
                    </h3>
                    <p className="color-blue-darkest text-center">
                      Get started by marking them.
                    </p>
                  </div>
                </>
              ))}
            {classes.length > 0 && (
              <h2
                className={`color-blue-darkest text-4xl mt-8 mb-4 ${
                  point === "xs" ? "text-center" : "text-start"
                }`}
              >
                favorites
              </h2>
            )}
            <div
              className={`justify-center grid gap-4  mb-8 ${gridResponsibility()}`}
            >
              {classes &&
                classes.map((classItem) => (
                  <>
                    <ClassCard classItem={classItem} />
                  </>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
