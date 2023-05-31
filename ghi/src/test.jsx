import React from "react";
import { useLocation } from "react-router-dom";

export default function Test() {
    const location = useLocation();
    const { company } = location.state;


    return (
        <>
        <p className="text-white">this is a test</p>
        <div>
            <p className="text-white">Company ID: {company} </p>
        </div>
        </>
    )
}
