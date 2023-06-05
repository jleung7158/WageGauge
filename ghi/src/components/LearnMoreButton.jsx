import React from "react";
import { Link } from "react-router-dom";

export default function LearnMoreButton(companyId) {

    return (
        <>
        <Link to="/positions" state={companyId}>
            <button
            className="
                        p-2 w-full my-5
                        flex justify-center
                        text-gray-50 font-semibold text-2xl
                        rounded-xl bg-wageblue
                        transition ease-in delay-50
                        hover:scale-110
                        hover:bg-white
                        hover:text-wageblue
                        dark:bg-wageblue
                        dark:text-white
                        "
            >
            Learn More
            </button>
        </Link>
        </>
    );
}
