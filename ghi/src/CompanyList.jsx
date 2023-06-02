import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import bookmarkIcon from "./img/bookmark.svg";

import WorthBanner from "./components/WorthBanner";
import LearnMoreButton from "./components/LearnMoreButton";
import Footer from "./components/Footer";
import Reviews from "./components/Reviews";
import useToken from "@galvanize-inc/jwtdown-for-react";

function CompanyList() {
    const [companies, setCompanies] = useState([]);
    const [positions, setPositions] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [topics, setTopics] = useState([]);
    const [search, setSearch] = useState("");
    const { token } = useToken();
    const [showBanner, setShowBanner] = useState(true);

    // get the company data
    const fetchCompanies = async () => {
        const url = "http://localhost:8000/companies";
        const response = await fetch(url);
        if (response.ok) {
        const CData = await response.json();
        setCompanies(CData);
        }
    };

    // get the positions data
    const fetchPositions = async () => {
        const url = "http://localhost:8000/positions";
        const response = await fetch(url);
        if (response.ok) {
        const PData = await response.json();
        setPositions(PData);
        }
    };

    //get the employee data
    const fetchEmployees = async () => {
        const url = "http://localhost:8000/employees";
        const response = await fetch(url);
        if (response.ok) {
        const EData = await response.json();
        setEmployees(EData);
        }
    };
    const fetchTopics = async () => {
        const url = "http://localhost:8000/topics";
        const response = await fetch(url);
        if (response.ok) {
        const TData = await response.json();
        setTopics(TData);
        }
    };

    //check for token
    const checkForToken = () => {
        if (token) {
        setShowBanner(false);
        }
    };

    useEffect(() => {
        fetchCompanies();
        fetchPositions();
        fetchTopics();
        checkForToken();
    }, [token]);

    const getPositionsByCompanyId = (companyId) => {
        return positions.filter((position) => position.company_id === companyId);
    };

    // search bar
    const handleSearch = (e) => {
        e.preventDefault();
        const filter = companies.filter((companies) => companies.name === search);
        setCompanies(filter);
    };
    const handleReset = () => {
        setSearch("");
        fetchCompanies();
    }

    return (
        <>
        <div className="relative">
            {/* Embrace your worth banner */}
            {showBanner && <WorthBanner ban={checkForToken} />}
            {/* main content */}
            <div className="grid grid-rows-2 gap-6 sm:grid-rows-2 md:grid-rows-3 lg:grid-rows-4 xl:grid-rows-3"
            // style={{ backgroundImage: `url(${buildingsky})` }}
            >
            <div></div>
            <form onSubmit={handleSearch} className="mx-10 px-5 grid-row-2/3">
                <label
                htmlFor="default-search"
                className="
                                                    mb-2 text-sm font-medium
                                                    text-gray-900 sr-only
                                                    dark:text-white
                                                    "
                >
                Search
                </label>
                <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none divide-y">
                    <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                    </svg>
                </div>
                <input
                    type="search"
                    id="default-search"
                    className="
                                                    block w-full p-6 pl-10
                                                    text-sm text-gray-900
                                                    border border-gray-300 rounded-full
                                                    bg-gray-50
                                                    focus:ring-blue-500 focus:border-blue-500 dark:bg-darkblue
                                                    dark:border-gray-600
                                                    dark:placeholder-gray-400
                                                    dark:text-white dark:focus:ring-blue-500
                                                    dark:focus:border-blue-500"
                    placeholder="Search Companies..."
                    onChange={(e) => setSearch(e.target.value)}
                    required
                />
                <div className="
                            relative flex items-center
                            ">
                <button
                    type="submit"
                    className="
                                text-white absolute right-5
                                bottom-4 bg-wageblue hover:bg-blue-800
                                focus:ring-4 focus:outline-none focus:ring-blue-300
                                font-medium rounded-full text-sm px-4 py-2 pr-[55px]
                                dark:bg-wageblue dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Search
                </button>

                        <button
                            type="button"
                                dir='ltr' className="
                                text-white absolute right-5
                                bottom-4 bg-wageblue hover:bg-blue-800
                                focus:ring-4 focus:outline-none focus:ring-blue-300
                                font-medium rounded-full text-sm px-4 py-2
                                dark:bg-wageblue dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                </div>
                </div>
            </form>
            </div>
            <div className="py-5 w-50">
            <div className="flex flex-row flex-grow-0 px-5">
                {/* the right container */}
                <div className="w-1/4">
                <div className="
                                    flex flex-col flex-grow pt-6 px-0 mx-0 bg-slate-300
                                    rounded-large shadow-lg items-center px-0 dark:bg-darkblue">
                <div className="
                                    grid grid-cols-1 gap-1 mt-4 mb-6sm:grid-cols-2
                                    md:grid-cols-3 lg:grid-cols-3
                                    xl:grid-cols-3 rounded-full dark:bg-moredark">
                    <button className="
                                    rounded-full py-3 px-5 text-xl font-bold
                                    text-gray-50 hover:text-slate-500 dark:hover:text-darktext
                                    focus:bg-darkblue dark:focus:hover:text-gray-200">
                    News
                    </button>
                    <button className="
                                    rounded-full py-3 px-5 text-xl font-bold
                                    text-gray-50 hover:text-slate-500 dark:hover:text-darktext
                                    focus:bg-darkblue dark:focus:hover:text-gray-200">
                    Events
                    </button>
                    <button className="
                                    rounded-full py-3 px-5 text-xl font-bold
                                    text-gray-50 hover:text-slate-500 dark:hover:text-darktext
                                    focus:bg-darkblue dark:focus:hover:text-gray-200">
                    More
                    </button>
                </div>
                <div className="w-full max-h-[600px] overflow-y-auto">
                {companies.map((company) => (
                    <table key={company.id} className="w-full">
                    <tbody className="font-bold text-3xl border-b-2 border-lightgrey dark:border-moredark">
                        <tr
                        className="
                                        w-1/4 mx-4 px-5
                                        text-md font-medium

                                        text-gray-600
                                        dark:text-white
                                        h-40
                                        "
                        >
                        <td
                            className="
                                            flex flex-col
                                            px-5 pt-2 pb-10 bg-slate-200
                                            flex
                                            dark:bg-darkblue
                                            "
                        >
                            <button className="justify-content:start h-5 w-5 fill-white">
                            <img src={bookmarkIcon} />
                            </button>
                            <h2 className="text-center">{company.name}</h2>
                            <p className="text-sm text-center text-gray-500 dark:text-darktext opacity-80">
                            Here we can have company news display under the name
                            </p>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                ))}
                </div>
                </div>
                {/* topics section */}

                <div className="flex flex-col flex-grow overflow-y-auto pt-6 px-0 mx-0 mt-5 bg-slate-300 rounded-large shadow-lg items-center px-0 dark:bg-darkblue">
                <div className="
                                    grid grid-cols-3 gap-1 mt-4 mb-6
                                    rounded-full dark:bg-moredark dark:text-darktext font-bold justify-center">
                    <div></div>
                        <Link to='/ForumPage'>
                            <button className="
                                            rounded-full py-3 px-5 text-xl font-bold
                                            text-gray-50 hover:text-darktext
                                            focus:hover:text-gray-200">
                            TOPICS
                            </button>
                        </Link>
                    <div></div>
                </div>

                {topics.map((topic) => (
                    <table key={topic.id} className="w-full">
                    <tbody className="font-bold text-3xl border-b-2 border-lightgrey dark:border-moredark">
                        <tr
                        className="
                                        mx-4 px-5 mt-10
                                        text-md font-medium

                                        text-gray-600
                                        dark:text-white
                                        h-20
                                        "
                        >
                        <td
                            className="
                                            flex flex-col
                                            px-5 pt-10 pb-10 bg-slate-200
                                            flex
                                            dark:bg-darkblue
                                            "
                        >

                            <p className="justify-center text-sm text-center text-gray-500 dark:text-darktext opacity-80">
                            {topic.text}
                            </p>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                ))}
                </div>
                </div>
                {/* the main container */}
                <div
                className="max-w-[1200px]
                                p-6 w-3/4 mx-[50px]
                                bg-slate-300
                                rounded-large shadow-lg
                                flex items-center space-x-5
                                px-0

                                dark:bg-darkblue
                                "
                >
                <div className="">
                    {/* the table buttons */}
                    <div className="grid grid-cols-1 gap-6 mt-6 mb-6  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                    <button className="rounded-full py-3 px-5 text-xl font-bold text-gray-50 hover:text-slate-500 dark:hover:text-darktext dark:focus:bg-darkgray dark:focus:hover:text-gray-300">
                        Overview
                    </button>
                    <button className="rounded-full py-3 px-5 text-xl font-bold text-gray-50 hover:text-slate-500 dark:hover:text-darktext dark:focus:bg-darkgray dark:focus:hover:text-gray-300">
                        Company List
                    </button>
                    <button className="rounded-full py-3 px-5 text-xl font-bold text-gray-50 hover:text-slate-500 dark:hover:text-darktext dark:focus:bg-darkgray dark:focus:hover:text-gray-300">
                        Salary Trends
                    </button>
                    <button className="rounded-full py-3 px-5 text-xl font-bold text-gray-50 hover:text-slate-500 dark:hover:text-darktext dark:focus:bg-darkgray dark:focus:hover:text-gray-300">
                        More News
                    </button>
                    </div>

                    {/* the main table */}
                    <h1
                    className="
                                font-warownia
                                font-bold
                                text-slate-600
                                py-6
                                text-4xl
                                text-center
                                dark:text-gray-50
                                border-b-2
                                border-lightgrey
                                dark:border-moredark"
                    >
                    COMPANY LIST
                    </h1>
                    <div className="max-h-[1700px] overflow-y-auto">
                    {/* mapping by company first */}

                    {companies.map((company) => (
                    <div key={company.id} className="flex flex-col">
                            <div className="flex items-center justify-between px-20

                            ">
                            <h2 className="my-5 rounded-t-lg text-gray-50 font-bold text-5xl px-10 dark:text-gray-50 ">
                                {company.name}
                            </h2>
                                <div>
                                    <LearnMoreButton companyId={company.id} />
                                </div>
                            </div>
                        <table
                        className="
                                    table-fixed w-full bg-gray-100
                                    rounded-md
                                    border-b-2
                                    bg-slate-300

                                    dark:bg-darkblue
                                    dark:border-moredark
                                    "
                        >
                        <thead>
                            <tr
                            className="
                                    text-3xl font-bold font-warownia border-b-2 border-gray-50

                                    dark:text-darktext
                                    dark:border-moredark"
                            >
                            <th>Position</th>
                            <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* mapping positions by their company id */}
                            {getPositionsByCompanyId(company.id).slice(0,3).map(
                            (position, index) => (
                                <tr
                                key={position.id}
                                className=" hover:dark:opacity-50
                                            ml-5 font-warownia font-bold text-xl
                                            "
                                >
                                <td
                                    className="
                                            p-10 bg-gray-50
                                            rounded-md
                                            bg-slate-300


                                            dark:bg-darkblue
                                            dark:text-darktext
                                            "
                                >
                                    <div className="flex flex-col items-center">
                                    <div>{position.name}</div>
                                    <div className="text-s text-gray-50 dark:text-gray-50">
                                        {position.description}
                                    </div>
                                    </div>
                                </td>
                                {/* <td className="px-10 py-10 bg-gray-50 rounded-md border border-white text-center">{position.name}</td>*/}
                                <td
                                    className="
                                        px-10 py-10 bg-gray-50
                                        rounded-md
                                        text-center
                                        bg-slate-300


                                        dark:bg-darkblue
                                        dark:text-darktext
                                        "
                                >
                                    Salary TBD
                                </td>
                                </tr>
                            )
                            )}
                        </tbody>
                        </table>
                    </div>
                    ))}
                </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className="flex items-center justify-center w-full bg-darkblue min-h-[500px]">
            <Reviews />
        </div>
        <Footer />
        </>
    );
}

export default CompanyList;
