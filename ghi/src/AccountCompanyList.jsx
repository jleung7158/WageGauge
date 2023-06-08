import { useState, useEffect } from "react";
import React from "react";

function AccountCompanyList() {
  const [employee, setEmployee] = useState([]);
  const [account_id, setAccount_id] = useState("");

  const currentAccount = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/token`;
    const response = await fetch(url, {
      credentials: "include",
      method: "get",
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      setAccount_id(data.account.id);
    }
  };

  const fetchEmployee = async () => {
    const eUrl = `${process.env.REACT_APP_API_HOST}/employees`;
    const response = await fetch(eUrl);
    if (response.ok) {
      const eData = await response.json();
      setEmployee(eData);
    } else {
      console.log("Error fetching employees", response.statusText);
    }
  };

  useEffect(() => {
    fetchEmployee();
    currentAccount();
  }, [account_id]);

  return (
    <>
      <div className="relative flex items-center justify-center">
        <div
          className="
            max-w-[1200px]
            p-6 w-3/4 mx-[50px]
            bg-slate-300
            rounded-large shadow-lg
            w-full
            px-0
            dark:bg-darkblue
            "
        >
          <table className="w-full">
            <thead>
              <tr className="rounded-full py-3 px-5 text-xl font-bold text-gray hover:text-slate-500 dark:hover:text-darktext dark:focus:bg-darkgray dark:focus:hover:text-gray-300 border-b-2 border-lightgrey dark:border-moredark">
                <th>Company</th>
                <th>Position</th>
                <th>Salary</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody className="opaque-list">
              {employee.map((employee) => {
                return (
                  <tr
                    key={employee.id}
                    value={employee.id}
                    className="text-lg text-center text-gray-500 dark:text-darktext opacity-80"
                  >
                    <td>{employee.company}</td>
                    <td>{employee.position}</td>
                    <td>${employee.salary}</td>
                    <td>{employee.location}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default AccountCompanyList;
