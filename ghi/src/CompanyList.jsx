import { useEffect, useState } from 'react';
import DashboardIcon from './img/humans.png';
import WageGaugeIcon from './img/logo.png'
import { Link } from 'react-router-dom';

function CompanyList() {
	const [companies, setCompanies] = useState([]);
	const [positions, setPositions] = useState([]);
    const [search, setSearch] = useState('');

	const fetchCompanies = async () => {
		const url = 'http://localhost:8000/companies';
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			console.log(data);
			setCompanies(data);
        }
        };
	const fetchPositions = async () => {
		const url = 'http://localhost:8000/positions';
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			console.log(data);
			setPositions(data);
		}
	};

    useEffect(() => {
		fetchCompanies();
        fetchPositions();
	}, []);

    const getPositionsByCompanyId = (companyId) => {
        return positions.filter((position) => position.company_id === companyId);
    };

    // search bar
    const handleSearch = (e) => {
        e.preventDefault()
        const filter = companies.filter((companies) => companies.name === search);
        setCompanies(filter);
    };


	return (
        <>
		<div className="h-screen">
                {/* Embrace your worth banner */}
                <div className="
                    flex
                    flex-row
                    py-10 mb-40
                    bg-gradient-to-r
                    from-wageblue via-weedgreen to-white
                "
                >
                    <div className="
                        flex
                        flex-col

                        ">
                            <div>
                            <p className="
                            flex
                            text-5xl
                            font-bold
                            font-warownia
                            text-gray-50
                            py-10
                            ml-20
                            ">EMBRACE YOUR WORTH</p>
                            </div>
                            <div>
                            <p className="
                            flex
                            text-2xl
                            font-bold
                            font-warownia
                            text-gray-50
                            py-2
                            ml-20
                            mr-10
                            ">WageGauge helps empower your pay with dynamic </p>
                            </div>
                            <div>
                            <p className="
                            flex
                            text-2xl
                            font-bold
                            font-warownia
                            text-gray-50
                            py-2
                            ml-20
                            ">data visualization, giving you the edge</p>
                            </div>
                            <div>
                            <p className="
                            flex
                            text-2xl
                            font-bold
                            font-warownia
                            text-gray-50
                            ml-20
                            ">in any negotiation.</p>
                            </div>
                    </div>
                    <div>
                        <p className="
                        flex
                        text-2xl
                        font-bold
                        font-warownia
                        text-gray-50
                        py-10
                        ml-40
                        mr-40
                        ">Learn more</p>
                    </div>
                <div className= ''>
                <img src={DashboardIcon} alt="Homepage"
                className="
                flex
                px-20 py-8
                w-25 h-25

                " />
                </div>
                </div>
			{/* main content */}
            <div className="relative">
                <div className="container flex flex-row">
                    <div className="flex-col p-6 w-1/4 mx-4 bg-white rounded-xl shadow-lg flex items-center space-x-4">
						<h1 className="text-xl font-bold font-warownia">COMPANIES</h1>
					</div>
                        <div className=" p-6 w-3/4 mx-4 bg-gray-200 rounded-xl shadow-lg flex items-center space-x-4">
                                <div>
                                    {/* the Search Bar */}
                                    <form onSubmit={handleSearch}>
                                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                                            Search
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
                                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Search Companies..."
                                            onChange={(e) => setSearch(e.target.value)}
                                            required
                                            />
                                            <button
                                            type="submit"
                                            className="text-white absolute right-2.5 bottom-2.5 bg-wageblue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-wageblue dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                            Search
                                            </button>
                                        </div>
                                        </form>
                                    {/* the main table */}
                                    <h1 className='
                                    font-helvetica
                                    underline underline-offset-8
                                    font-bold
                                    text-4xl
                                    text-center'>COMPANY LIST</h1>
                                    {companies.map((company) => (
                                        <div key={company.id}>
                                        <h2 className='
                                        mt-5
                                        inline-block
                                        bg-wageblue
                                        rounded-t-lg
                                        font-warownia
                                        text-gray-50
                                        font-bold
                                        text-3xl
                                        px-10'>{company.name}</h2>
                                        <table className="table-fixed w-full bg-gray-100 rounded-md border-separate border-spacing-2 border border-white">
                                            <thead>
                                            <tr className="text-xl font-bold font-warownia">
                                                <th>Position</th>
                                                <th>Description</th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            {getPositionsByCompanyId(company.id).map((position, index) => (
                                                <tr key={position.id}className="w-full ml-5 font-warownia font-bold text-2xl">
                                                    <td className="px-10 py-10 bg-gray-50 rounded-md border border-white">
                                                    <div className="flex flex-col items-center">
                                                        <div>{position.name}</div>
                                                        <div className="text-s text-gray-500">{position.description}</div>
                                                    </div>
                                                    </td>
                                                {/* <td className="px-10 py-10 bg-gray-50 rounded-md border border-white text-center">{position.name}</td>*/}
                                                <td className="px-10 py-10 bg-gray-50 rounded-md border border-white text-center">Salary TBD</td>
                                                {index === getPositionsByCompanyId(company.id).length - 1 && (
                                                <td className="px-20 py-5"><Link onClick={`/companies/${company.id}`}>
                                                    <button
                                                        className="
                                                        p-2 w-32 my-4
                                                        flex items-center text-center text-gray-50 font-semibold text-2xl
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
                                                </td>
                                                )}
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                        </div>
                                    ))}
                                </div>
                        </div>
				</div>
			</div>
		</div>
    {/* footer */}
    <footer className="flex bg-white dark:bg-gray-900">
    <div className="container px-6 py-12 mx-auto">
        <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Let’s get started on something great</h2>

            <p className="max-w-md mx-auto mt-2 text-gray-500 dark:text-gray-400">Join over 4,000+ startups already growing with Meraki UI.</p>

            <div class="flex flex-col mt-6 sm:flex-row sm:items-center sm:justify-center">
                <button className="w-full px-5 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-wageblue rounded-md sm:mx-2 sm:order-2 sm:w-auto hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">Get started</button>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-6 mt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Product</h3>

                <div className="flex flex-col items-start mt-4 space-y-4">
                    {/* <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Overview</a>
                    <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Features</a>
                    <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Solutions</a>
                    <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Tutorials</a>
                    <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Pricing</a>
                    <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Releases</a> */}
                </div>
            </div>

            <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Company</h3>

                <div className="flex flex-col items-start mt-4 space-y-4">
                    {/* <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">About us</a>
                    <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Careers</a>
                    <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Press</a>
                    <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">News</a>
                    <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Media kit</a>
                    <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Contact</a> */}
                </div>
            </div>

            <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Resources</h3>

                <div className="flex flex-col items-start mt-4 space-y-4">
                    {/* <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Blog</a>
                    <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Newsletter</a>
                    <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Events</a>
                    <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Help center</a>
                    <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Tutorials</a>
                    <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Supports</a> */}
                </div>
            </div>

            <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Use cases</h3>

                <div className="flex flex-col items-start mt-4 space-y-4">
                    {/* <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Startups</a>
                    <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Enterprise</a>
                    <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Government</a>
                    <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Saas</a>
                    <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Marketplaces</a>
                    <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Ecommerce</a> */}
                </div>
            </div>

            <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Social</h3>

                <div className="flex flex-col items-start mt-4 space-y-4">
                    {/* <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Twitter</a>
                    <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">LinkedIn</a>
                    <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Github</a>
                    <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Facebook</a>
                    <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">AngelList</a>
                    <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Dribble</a> */}
                </div>
            </div>

            <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Legal</h3>

                <div className="flex flex-col items-start mt-4 space-y-4">
                    {/* <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Terms</a>
                    <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Privacy</a>
                    <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Cookies</a>
                    <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Licenses</a>
                    <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Settings</a>
                    <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Contact</a> */}
                </div>
            </div>
        </div>

        <hr clasNames="my-6 border-gray-200 md:my-10 dark:border-gray-700"/>

        <div className="flex flex-col items-center justify-between sm:flex-row">
            {/* <a href="#">
                <img className="w-auto h-7" src="./img/icon.png" alt=""/>
            </a> */}

            <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-300">© Copyright 2023. All Rights Reserved.</p>
        </div>
    </div>
</footer>
        </>
	);
}


export default CompanyList;
