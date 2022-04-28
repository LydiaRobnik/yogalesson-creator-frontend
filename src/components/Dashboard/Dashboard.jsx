import React, { useEffect, useState } from "react";
import http from "../../api/http-common";
import "./dashboard.scss";
import useBreakpoint from "../../custom/useBreakpoint";

// import components
import ClassCard from "../ClassCard/ClassCard.jsx";

// import data
import data from "../../assets/class";

export default function Dashboard() {
  // states
  const [classes, setClasses] = useState(data);
  const point = useBreakpoint();
  // const latestClasses = classes.slice();

  // sort classes by date
  classes.sort((a, b) => {
    return new Date(b.modifiedAt) - new Date(a.modifiedAt);
  });

  // fetches
  // useEffect(() => {
  //   console.log('useEffect');
  //   http(true)
  //     .get('/class')
  //     .then((resp) => {
  //       console.log('latest classes', resp.data);
  //       setClasses(resp.data);
  //     });
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
        className="px-6
       w-full"
      >
        {classes.length > 0 && (
          <h2 className="color-blue-darkest">recently used</h2>
        )}
        <div className={`justify-center grid gap-4 ${gridResponsibility()}`}>
          {classes &&
            classes.map((classItem) => (
              <>
                <ClassCard classItem={classItem} />
              </>
            ))}
        </div>
      </div>

      <div
        className="px-6
       w-full"
      >
        {classes.length > 0 && (
          <h2 className="color-blue-darkest">favorites</h2>
        )}
        <div className={`justify-center grid gap-4 ${gridResponsibility()}`}>
          {classes &&
            classes.map((classItem) => (
              <>
                <ClassCard classItem={classItem} />
              </>
            ))}
        </div>
      </div>
    </>
  );
}
