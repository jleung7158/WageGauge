import React from "react";
import { Link } from "react-router-dom";

export default function LearnMoreButton(companyId) {
  // const filteredata = (company) => {

  // }

  return (
    <>
      <Link to="/positions" state={companyId}>
        <button
          className="
                    p-2 w-32 my-4
                    flex items-center text-center
                    text-gray-50 font-semibold text-2xl
                    rounded shadow-lg
                    bg-wageblue
                    transition ease-in delay-50
                    hover:translate-x-4
                    hover:scale-110
                    hover:bg-gray-50
                    hover:text-wageblue
                    "
        >
          Learn More
        </button>
      </Link>
    </>
  );
}
