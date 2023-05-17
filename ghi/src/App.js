import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
// import { useEffect, useState } from "react";
// import Construct from "./Construct.js";
// import ErrorNotification from "./ErrorNotification";
import "./App.css";
import CompanyDetail from "./CompanyDetail.jsx";
import CompanyList from "./CompanyList";

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

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route>
            <Route path="companies" element={<CompanyList />} />
          </Route>
          <Route path="positions">
            <Route path="" element={<CompanyDetail />} />
          </Route>
        </Routes>
      </div>
      {/* <ErrorNotification error={error} /> */}
      {/* <Construct info={launchInfo} /> */}
    </BrowserRouter>
  );
}

export default App;
