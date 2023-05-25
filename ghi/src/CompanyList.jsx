import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import WageGaugeIcon from './img/logo.png';
import chartIcon from './img/chart-histogram.svg'

import SalaryRow from './components/SalaryRow';
import WorthBanner from './components/WorthBanner';
import LearnMoreButton from './components/LearnMoreButton';
import Footer from './components/Footer';

function CompanyList() {
	const [companies, setCompanies] = useState([]);
	const [positions, setPositions] = useState([]);
    const [employees, setEmployees] = useState([]);
	const [search, setSearch] = useState('');

	// get the company data
	const fetchCompanies = async () => {
		const url = 'http://localhost:8000/companies';
		const response = await fetch(url);
		if (response.ok) {
			const CData = await response.json();
			setCompanies(CData);
		}
	};

	// get the positions data
	const fetchPositions = async () => {
		const url = 'http://localhost:8000/positions';
		const response = await fetch(url);
		if (response.ok) {
			const PData = await response.json();
			setPositions(PData);
		}
	};

    //get the employee data
    const fetchEmployees = async () => {
        const url = 'http://localhost:8000/employees'
        const response = await fetch(url);
        if (response.ok) {
            const EData = await response.json();
            setEmployees(EData)
        }
    }



	useEffect(() => {
		fetchCompanies();
		fetchPositions();
	}, []);

	const getPositionsByCompanyId = (companyId) => {
		return positions.filter((position) => position.company_id === companyId);
	};

	// search bar
	const handleSearch = (e) => {
		e.preventDefault();
		const filter = companies.filter((companies) => companies.name === search);
		setCompanies(filter);
	};

	return (
		<>
            <div className="relative">
				{/* Embrace your worth banner */}
                <WorthBanner/>
				{/* main content */}
				<div className="py-5">
					<div className="container flex flex-row">

                        <div
                            className="
                                flex-col p-6 w-1/4 mx-4 px-5
                                bg-white rounded-xl shadow-lg
                                flex items-center space-x-4

                                dark:bg-darkblue
                            ">
							<h1
                                className="
                                text-4xl font-bold font-thunder

                                dark:text-darktext
                            ">COMPANIES</h1>
                            {companies.map((company) => (
                                <table key={company.id} className="w-full text-center">
                                    <tbody className="ml-5 font-bold text-3xl">
                                    <tr
                                    className="
                                    w-full mb-2 py-5
                                    text-md font-medium
                                    text-gray-600
                                    dark:text-white
                                    ">
                                        <td
                                        className="
                                        width:100 mb-5 py-5 bg-slate-300
                                        rounded-md
                                        flex items-center
                                        dark:bg-darkgreen">
                                        {company.name}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>

                            ))}
						</div>
						<div
                            className="
                            p-6 w-3/4 mx-4
                            bg-slate-300
                            rounded-xl shadow-lg
                            flex items-center space-x-4

                            dark:bg-moredark
                            ">
							<div>
								{/* the Search Bar */}
								<form onSubmit={handleSearch}>
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
											className="
                                            block w-full p-4 pl-10
                                            text-sm text-gray-900
                                            border border-gray-300 rounded-lg
                                            bg-gray-50
                                            focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
                                            dark:border-gray-600
                                            dark:placeholder-gray-400
                                            dark:text-white dark:focus:ring-blue-500
                                            dark:focus:border-blue-500"
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
								<h1
									className="
                                    font-warownia
                                    font-bold
                                    py-6
                                    text-4xl
                                    text-center
                                    dark:text-gray-50"
								>
									COMPANY LIST
								</h1>
								{/* mapping by company first */}
								{companies.map((company) => (
									<div key={company.id}>
										<h2
											className="
                                        mt-5
                                        inline-block
                                        bg-wageblue
                                        rounded-t-lg
                                        font-warownia
                                        text-gray-50
                                        font-bold
                                        text-3xl
                                        px-10

                                        dark:text-gray-50
                                        "
										>
											{company.name}
										</h2>

										<table
                                            className="
                                            table-fixed w-full bg-gray-100
                                            rounded-md border-separate
                                            border-spacing-2 border
                                            border-white shadow-lg

                                            dark:bg-lightgray
                                            dark:border-lightgray
                                        ">
											<thead>
												<tr
                                                className="
                                                text-xl font-bold font-warownia

                                                dark:text-darktext">
													<th>Position</th>
													<th>Description</th>
												</tr>
											</thead>
											<tbody>
												{/* mapping positions by their company id */}
												{getPositionsByCompanyId(company.id).map(
													(position, index) => (
														<tr
															key={position.id}
															className="
                                                            w-full ml-5 font-warownia font-bold text-2xl
                                                            "
														>
															<td
                                                            className="
                                                            px-10 py-10 bg-gray-50
                                                            rounded-md
                                                            border border-white
                                                            shadow-lg

                                                            dark:bg-darkgreen
                                                            dark:border-darkgreen
                                                            dark:text-darktext
                                                            ">
																<div className="flex flex-col items-center">
																	<div>{position.name}</div>
																	<div className="text-s text-gray-500">
																		{position.description}
																	</div>
																</div>
															</td>
															{/* <td className="px-10 py-10 bg-gray-50 rounded-md border border-white text-center">{position.name}</td>*/}
															<td
                                                            className="
                                                            px-10 py-10 bg-gray-50
                                                            rounded-md
                                                            border border-white
                                                            text-center shadow-lg

                                                            dark:bg-darkgreen
                                                            dark:border-darkgreen
                                                            dark:text-darktext
                                                            ">

                                                                Salary TBD
															</td>
															{/* if the index of the position is the last one in the list, include the learn more button  */}
															{index ===
																getPositionsByCompanyId(company.id).length -
																	1 && (
																<td className="px-20 py-5">
                                                                    <LearnMoreButton/>
																</td>
															)}
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
            <Footer/>
		</>
	);
}

export default CompanyList;
