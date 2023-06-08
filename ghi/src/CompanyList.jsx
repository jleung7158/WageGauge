import { useEffect, useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

import bookmarkIcon from './img/bookmark.svg';

import WorthBanner from './components/WorthBanner';
import LearnMoreButton from './components/LearnMoreButton';
import Footer from './components/Footer';
import Reviews from './components/Reviews';
import useToken from '@galvanize-inc/jwtdown-for-react';
import { companyImages } from './img/companyimgs.js';

function CompanyList() {
	const [companies, setCompanies] = useState([]);
	const [positions, setPositions] = useState([]);
	const [topics, setTopics] = useState([]);
	const [search, setSearch] = useState('');
	const { token } = useToken();

	// get the company data
	const fetchCompanies = async () => {
		const url = `${process.env.REACT_APP_API_HOST}/companies`;
		const response = await fetch(url);
		if (response.ok) {
			const CData = await response.json();
			setCompanies(CData);
		}
	};

	// get the positions data
	const fetchPositions = async () => {
		const url = `${process.env.REACT_APP_API_HOST}/positions`;
		const response = await fetch(url);
		if (response.ok) {
			const PData = await response.json();
			setPositions(PData);
		}
	};

	// get the topics data
	const fetchTopics = async () => {
		const url = `${process.env.REACT_APP_API_HOST}/topics`;
		const response = await fetch(url);
		if (response.ok) {
			const TData = await response.json();
			setTopics(TData);
		}
	};


	useEffect(() => {
		fetchCompanies();
		fetchPositions();
		fetchTopics();
	}, [token]);

	// filter positions by company.id
	const getPositionsByCompanyId = (companyId) => {
		return positions.filter((position) => position.company_id === companyId);
	};

	// searchbar
	const handleSearch = (e) => {
		e.preventDefault();
		const filter = companies.filter((companies) => companies.name === search);
		setCompanies(filter);
	};
	// reset the searchbar
	const handleReset = () => {
		setSearch('');
		fetchCompanies();
	};
	/* eslint-disable */

	return (
		<>
			<div className="relative">
				{/* Embrace your worth banner */}
				<WorthBanner />
				{/* main content */}
				<div className="grid grid-rows-2 gap-6 py-12 sm:grid-rows-2 md:grid-rows-3 lg:grid-rows-3 xl:grid-rows-3">
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
							<div
								className="
                            relative flex items-center
                            "
							>
								<button
									type="submit"
									className="
                                text-white absolute right-5
                                bottom-4 bg-wageblue hover:bg-blue-800
                                focus:ring-4 focus:outline-none focus:ring-blue-300
                                font-medium rounded-full text-sm px-4 py-2 pr-[60px]
                                dark:bg-wageblue dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								>
									Search
								</button>

								<button
									type="button"
									dir="ltr"
									className="
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
					<div className="flex flex-row flex-grow-0 px-[50px] ">
						{/* the left container */}
						<div className="w-1/4">
							<div
								className="
                                    flex flex-col flex-grow pt-6 pb-12 px-0 mx-0 bg-wageblue
                                    rounded-large shadow-lg items-center dark:bg-darkblue"
							>
								<div
									className="
                                    grid grid-cols-1 gap-1 mt-4 mb-6 sm:grid-cols-2
                                    md:grid-cols-3 lg:grid-cols-3
                                    xl:grid-cols-3 rounded-full dark:bg-moredark"
								>
									<button
										className="
                                    rounded-full py-3 px-5 text-xl font-bold
                                    text-wageblue hover:text-slate-500 bg-white
									focus:bg-white focus:text-wageblue
									dark:hover:text-darktext dark:text-white dark:bg-darkblue
                                    dark:focus:bg-darkblue dark:focus:hover:text-gray-200"
									>
										News
									</button>
									<button
										className="
                                    rounded-full py-3 px-5 text-xl font-bold
                                    text-gray-50 hover:text-slate-500
									focus:bg-white focus:text-wageblue
									dark:hover:text-darktext dark:text-white
                                    dark:focus:bg-darkblue dark:focus:hover:text-gray-200"
									>
										Events
									</button>
									<button
										className="
                                    rounded-full py-3 px-5 text-xl font-bold
                                    text-gray-50 hover:text-slate-500
									focus:bg-white focus:text-wageblue
									dark:hover:text-darktext dark:text-white
                                    dark:focus:bg-darkblue dark:focus:hover:text-gray-200"
									>
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
                                            px-5 pt-5 pb-20 bg-white
                                            flex
                                            dark:bg-darkblue
                                            "
													>
														<button className="justify-content:start h-5 w-5 fill-white">
															<img src={bookmarkIcon} />
														</button>
														<h2 className="text-center">{company.name}</h2>
														<p className="text-sm text-center text-gray-500 px-[20px] dark:text-darktext opacity-80">
															Here we can have company news display under the
															name. news news news so much news! whoa can you believe all the news that's here?
															News readers beware. More news ahead. Ye have been warned!!
														</p>
													</td>
												</tr>
											</tbody>
										</table>
									))}
								</div>
							</div>
							{/* topics section */}

							<div className="flex flex-col flex-grow overflow-y-auto pt-6 pb-12 px-0 mx-0 mt-5 bg-wageblue rounded-large shadow-lg items-center px-0 dark:bg-darkblue ">
								<div
									className="
                                    grid grid-cols-3 mt-2 mb-5
                                    rounded-full dark:bg-darkblue dark:text-darktext font-bold justify-center"
								>
									<div></div>
									<Link to="/ForumPage">
										<button
											className="
                                            rounded-full py-2 px-10 text-2xl font-bold
                                            text-white hover:text-slate-500
                                            focus:hover:text-gray-200"
										>
											TOPICS
										</button>
									</Link>
									<div></div>
								</div>
								<div className='max-h-[830px] overflow-y-auto'>
								{topics.map((topic) => (
									<table key={topic.id} className="w-full">
										<tbody className="font-bold text-3xl border-b-2 border-lightgrey dark:border-moredark">
											<tr
												className="
                                        text-center
                                        mx-4 px-5 mt-[10px]
                                        text-md font-medium

                                        text-gray-600
                                        dark:text-white
                                        h-20
                                        "
											>
												<td
													className="
                                            text-center
                                            flex flex-col
                                            px-5 pt-10 pb-10 bg-white

                                            dark:bg-darkblue
                                            "
												>   <h2 className="text-center">{topic.title}</h2>
													<p className="justify-center flex text-sm text-center text-gray-500 dark:text-darktext ">
														{topic.body}
													</p>
												</td>
											</tr>
										</tbody>
									</table>
								))}
							</div>
							</div>
						{/* The bottom left */}

							<div className="flex flex-col flex-grow overflow-y-auto pt-6 pb-12 px-0 mx-0 mt-5 overflow-x-hidden bg-wageblue rounded-large shadow-lg items-center px-0 dark:bg-darkblue">
								<div
									className="
                                    grid grid-cols-1 gap-1 mt-4
                                    rounded-full dark:bg-moredark dark:text-darktext font-bold justify-center"
								>
										<h1
											className="
                                            rounded-full pt-3 px-5 text-2xl font-bold
                                            text-white dark:bg-darkblue text-center
                                            focus:hover:text-gray-200"
										>
											TOP POSITIONS
										</h1>
								</div>
								<div className='text-center bg-wageblue dark:bg-darkblue mt-3'>
									<p className="text-md font-bold text-center text-white px-[20px] pb-6 dark:text-darktext opacity-80 border-b-2 dark:border-moredark transition ease-in delay-50 hover:scale-105">
										These positions have seen significant spikes in pay this quarter, taking into consideration location costs-of-living and national trends.
									</p>
								</div >
									<div className='bg-white dark:bg-darkblue w-full'>
										<div className='overflow-x-hidden'>
											<p className="text-lg text-center pb-0 text-gray-600 pt-3 px-[20px] pb-6 dark:text-white opacity-80 transition ease-in delay-50 hover:translate-x-3">
												Full Stack Developer
											</p>
											<p className="text-md text-center text-gray-500 px-[20px] pb-6 dark:text-darktext opacity-80 w-full border-b-2 dark:border-moredark ">
												Tier 1 | New York, NY
											</p>
											<p className="text-lg text-center pb-0 text-gray-600 pt-3 px-[20px] pb-6 dark:text-white opacity-80 transition ease-in delay-50 hover:translate-x-3">
												Back End Developer
											</p>
											<p className="text-md text-center text-gray-500 px-[20px] pb-6 dark:text-darktext opacity-80 w-full border-b-2 dark:border-moredark">
												Tier 2 | Los Angeles, CA
											</p>
											<p className="text-lg text-center pb-0 text-gray-600 pt-3 px-[20px] pb-6 dark:text-white opacity-80 transition ease-in delay-50 hover:translate-x-3">
												QA Tester
											</p>
											<p className="text-md text-center text-gray-500 px-[20px] pb-6 dark:text-darktext opacity-80 w-full border-b-2 dark:border-moredark">
												Tier 2 | San Fransisco, CA
											</p>
											<p className="text-lg text-center pb-0 text-gray-600 pt-3 px-[20px] pb-6 dark:text-white opacity-80 transition ease-in delay-50 hover:translate-x-3">
												Dev Ops
											</p>
											<p className="text-md text-center text-gray-500 px-[20px] pb-6 dark:text-darktext opacity-80 w-full border-b-2 dark:border-moredark">
												Tier 3 | Austin, TX
											</p>
										</div>
									</div>
							</div>
						</div>




						{/* the main container */}
						<div
							className="w-full
                                p-6 w-3/4 ml-[50px]
                                bg-wageblue

                                rounded-large shadow-lg
                                flex items-center space-x-5
                                px-0

                                dark:bg-darkblue
                                "
						>
							<div className="w-full">
								{/* the table buttons */}
								<div className="grid grid-cols-1 gap-6 mt-6 mb-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                                    <div></div>
									<button className="
												rounded-full py-3 text-xl
												font-bold text-wageblue
												hover:text-slate-500
												focus:bg-white bg-white
												focus:text-wageblue dark:bg-moredark dark:text-white
												dark:hover:text-darktext dark:focus:bg-moredark
												dark:focus:text-white dark:focus:hover:text-gray-300">
										Company List
									</button>
									<button className="
												rounded-full py-3 text-xl
												font-bold text-gray-50
												hover:text-slate-500
												focus:bg-white
												focus:text-wageblue
												dark:hover:text-darktext dark:focus:bg-moredark
												dark:focus:text-white dark:focus:hover:text-gray-300">
										Overview
									</button>
									<button className="
												rounded-full py-3 text-xl
												font-bold text-gray-50
												hover:text-slate-500
												focus:bg-white
												focus:text-wageblue
												dark:hover:text-darktext dark:focus:bg-moredark
												dark:focus:text-white dark:focus:hover:text-gray-300">
										Salary Trends
									</button>
									<button className="
												rounded-full py-3 text-xl
												font-bold text-gray-50
												hover:text-slate-500
												focus:bg-white
												focus:text-wageblue
												dark:hover:text-darktext dark:focus:bg-moredark
												dark:focus:text-white dark:focus:hover:text-gray-300">
										More
									</button>
                                    <div></div>
								</div>
								{/* the main table */}
								<h1
									className="
                                font-warownia
                                font-black
                                text-white
                                py-6
                                text-6xl
                                text-center
                                dark:text-gray-50
                                border-b-2
                                border-lightgrey
                                dark:border-moredark
                                "
								>
									COMPANY LIST
								</h1>
								<div className="grid mb-8 shadow-sm sm:grid-cols-1 md:mb-12 md:grid-cols-2 lg:grid-cols-3">
									{/* Table */}
									{companies.map((company) => {
										const companyPositions = getPositionsByCompanyId(
											company.id
										);
										return (
											<figure
												key={company.id}
												className="flex items-center justify-center p-8 text-center bg-white dark:bg-darkblue"
											>
												<div className="flex items-center rounded-large drop-shadow-lg dark:bg-moredark min-h-[350px] lg:w-[320px] transition ease-in delay-50 hover:scale-101 hover:translate-x-1">
													<div className="">
														<div className="flex justify-center">
															{company.img !== '' ? (
																<img
																	className="rounded-sm w-[150px] h-50 p-5"
																	src={company.img}
																	alt=""
																/>
															) : (
																<img
																	className="rounded-sm w-[150px] h-50 p-5"
																	src={companyImages[company.name]}
																	alt=""
																/>
															)}
														</div>
														<div className="p-5">
															<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
																{company.name}
															</h5>
															<p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
															<div className="">
																{token ? (
																	<LearnMoreButton companyId={company.id} />
																) : (
																	<p className="text-md text-gray-700 dark:text-gray-400 mb-5">
																		{' '}
																		Sign In to See More Position Data
																	</p>
																)}
															</div>
														</div>
													</div>
													<div className="mx-8 lg:max-w-[120px]">
														<h2 className="text-2xl text-gray-700 font-bold mt-5 dark:text-gray-50">
															POSITIONS
														</h2>
														{companyPositions.length !== 0 ? (
															companyPositions.slice(0, 3).map((position) => (
																<div
																	key={position.id}
																	className="dark:border-moredark hover:text-darkgray"
																>
																	<div className="text-lg text-gray-700 dark:text-gray-400 font-bold mt-5">
																		{position.name}
																	</div>
																	<div className="text-md text-gray-700 dark:text-gray-400 mb-5 truncate">
																		{position.description}
																	</div>
																</div>
															))
														) : (
															<div className="dark:border-moredark hover:text-darkgray">
																<h3 className="text-xl text-gray-700 font-bold dark:text-gray-400 mb-5">
																	See nothing?
																</h3>
																<h3 className="text-md text-gray-700 dark:text-gray-400 mb-5">
																	That means we couldn't find any position data.
																</h3>

																<h3 className="text-md text-gray-700 dark:text-gray-400 mb-5">
																	But fret not! A new role can open at any
																	moment.
																</h3>
															</div>
														)}
													</div>
												</div>
											</figure>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-center w-full bg-white min-h-[500px] dark:bg-darkblue">
					<Reviews />
				</div>
			</div>
			<Footer />
		</>
	);
}

export default CompanyList;
/* eslint-enable */
