import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import "./App.css";
import CompanyDetail from "./CompanyDetail.jsx";
import CompanyList from "./CompanyList";
import SignUpForm from "./Signup";
import LoginForm from "./Login";
// import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";

function App() {
  return (
    <div className="bg-gradient-to-b overflow-auto from-weedgreen to-wageblue h-screen">
      <BrowserRouter>
        {/* <AuthProvider> */}
        <Nav />
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
        {/* </AuthProvider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
