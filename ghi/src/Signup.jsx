import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [successAlert, setSuccessAlert] = useState(false);
  const { login } = useToken();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newAccount = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };

    const url = `${process.env.REACT_APP_API_HOST}/api/accounts`;
    const config = {
      method: "post",
      body: JSON.stringify(newAccount),
      headers: { "Content-Type": "application/json" },
    };
    fetch(url, config)
      .then((response) => response.json())
      .then(() => {
        setSuccessAlert(true);
        const alertTimeout = setTimeout(() => {
          setSuccessAlert(false);
        }, 3000);
        const navigateTime = setTimeout(() => {
          login(email, password);
          navigate("/companies");
        }, 2000);
        return () => {
          clearTimeout(alertTimeout);
          clearTimeout(navigateTime);
        };
      });
  };

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  /* eslint-disable */

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      style={{
        background: "linear-gradient(to bottom, #87CEEB, #42098E)",
      }}
    >
      {successAlert && (
        <div
          className="alert alert-success"
          role="alert"
          style={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            zIndex: 1000,
            color: "white",
            backgroundColor: "green",
            borderColor: "darkgreen",
            border: "1px solid",
            borderRadius: "5px",
            padding: "0.75rem 1.25rem",
          }}
        >
          Account created! Logging in...
        </div>
      )}
      <div
        className="max-w-md w-full p-8 bg-white rounded-xl shadow-md"
        style={{
          width: "400px",
        }}
      >
        <h1 style={{ fontWeight: "bold" }} className="text-3xl mb-8">
          Welcome! We're happy to have you on board!
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit} id="sign-up-form">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                id="grid-first-name"
                name="First Name"
                type="text"
                required
                className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="First name"
                value={firstName}
                onChange={handleFirstName}
              />
            </div>
            <div>
              <input
                id="Last-name"
                name="Last-name"
                type="text"
                required
                className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Last name"
                value={lastName}
                onChange={handleLastName}
              />
            </div>
          </div>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={handlePassword}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
/* eslint-enable */
