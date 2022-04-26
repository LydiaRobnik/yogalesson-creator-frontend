import React, { useEffect, useState } from "react";
import http from "../../api/http-common";
import "./dashboard.scss";

export default function Dashboard() {
	const [asanas, setAsanas] = useState([]);
	const [classes, setClasses] = useState([]);

	// useEffect(() => {
	//   console.log('useEffect');
	//   http()
	//     .get('/asanas')
	//     .then((resp) => {
	//       console.log('asanas', resp.data);
	//       setAsanas(resp.data);
	//     });

	//   return () => {};
	// }, []);

	return (
		<>
			<main>
				<div>
					<button className="btn-blue btn-blue:hover">new class</button>
					<button className="btn-red btn-blue:hover">random class</button>
				</div>
				<h2>recently used</h2>
				{}
				<h2>favorites</h2>
				{}
			</main>
		</>
	);
}
