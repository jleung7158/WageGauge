import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Nav from './Nav';
// import { useEffect, useState } from "react";
// import Construct from "./Construct.js";
// import ErrorNotification from "./ErrorNotification";
import './App.css';
import CompanyDetail from './CompanyDetail.jsx';
import CompanyList from './CompanyList';
import SignUpForm from './Signup';
import LoginForm from './Login';
import Switcher from './components/Switcher';

function App() {
	// const [launchInfo, setLaunchInfo] = useState([]);
	// const [error, setError] = useState(null);

	// useEffect(() => {
	//   async function getData() {
	//     let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
	//     console.log("fastapi url: ", url);
	//     let response = await fetch(url);
	//     console.log("------- hello? -------");
	//     let data = await response.json();

	//     if (response.ok) {
	//       console.log("got launch data!");
	//       setLaunchInfo(data.launch_details);
	//     } else {
	//       console.log("drat! something happened");
	//       setError(data.message);
	//     }
	//   }
	//   getData();
	// }, []);
	// const [darkMode, setDarkMode] = useState(false)

	return (
		<div className=
		"bg-gradient-to-b overflow-auto from-weedgreen to-wageblue dark:bg-darkmode h-screen">
			<div
			// className={`App ${darkMode ? "dark" : ""}`}
			>
			<BrowserRouter>
				<Nav>
				</Nav>
				<div className="container-flex">
					<Routes>
						<Route>
							<Route path="companies" element={<CompanyList />} />
						</Route>
						<Route path="positions">
							<Route path="" element={<CompanyDetail />} />
						</Route>
						<Route path="Signup">
							<Route path="" element={<SignUpForm />} />
						</Route>
						<Route path="Login">
							<Route path="" element={<LoginForm />} />
						</Route>
					</Routes>
				</div>
				{/* <ErrorNotification error={error} /> */}
				{/* <Construct info={launchInfo} /> */}
			</BrowserRouter>
		</div>
		</div>
	);
}

export default App;
