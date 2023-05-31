import React from "react";
import { useLocation } from "react-router-dom";

export default function Test() {
  const location = useLocation();
  const { companyId } = location.state;
  console.log("company id", companyId);

  return (
    <>
      <p className="text-white">this is a test</p>
      <div>
        <p className="text-white">Company ID: {companyId} </p>
      </div>
    </>
  );
}
