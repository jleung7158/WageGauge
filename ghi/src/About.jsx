import React from 'react';
import { NavLink } from 'react-router-dom';
import Footer from './components/Footer';

export default function About() {
	return (
		<>
			<div className="grid mb-8 shadow-sm md:mb-12 md:grid-cols-2">
				{/* Mo */}
				<figure className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-t-lg md:rounded-t-none md:rounded-tl-lg dark:bg-moredark">
					<div className="bg-white rounded-large shadow-lg dark:bg-darkblue">
						<div className="flex justify-center">
							<img
								className="rounded-full w-50 h-50 p-5"
								src="https://i.postimg.cc/pr0HdTFH/Screenshot-20230519-173621.jpg"
								alt=""
							/>
						</div>
						<div className="p-5">
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								Mo Rahman
							</h5>
							<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
								Full Stack Software Developer
							</p>
							<div className="flex justify-center space-x-4">
								<NavLink to="https://gitlab.com/BrohammedR">
									<img
										className="w-7 h-7"
										src="https://www.vectorlogo.zone/logos/gitlab/gitlab-icon.svg"
									/>
								</NavLink>
								<NavLink to="https://www.linkedin.com/in/morahman5/">
									<img
										className="w-6 h-6"
										src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
									/>
								</NavLink>
							</div>
						</div>
					</div>
				</figure>
				{/* James */}
				<figure className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-t-lg md:rounded-t-none md:rounded-tl-lg dark:bg-moredark">
					<div className="max-w- bg-white rounded-large shadow-lg dark:bg-darkblue">
						<div className="flex justify-center">
							<img
								className="rounded-full w-50 h-50 p-5"
								src="https://ca.slack-edge.com/T047XGQ15B6-U04J75Q9YJC-8e67cf3b8d03-512"
								alt=""
							/>
						</div>
						<div className="p-5">
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								James Leung
							</h5>
							<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
								Full Stack Software Developer
							</p>
							<div className="flex justify-center space-x-4">
								<NavLink to="https://gitlab.com/JamesLeung7158">
									<img
										className="w-7 h-7"
										src="https://www.vectorlogo.zone/logos/gitlab/gitlab-icon.svg"
									/>
								</NavLink>
								<NavLink to="https://www.linkedin.com/in/jleung007/">
									<img
										className="w-6 h-6"
										src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
									/>
								</NavLink>
							</div>
						</div>
					</div>
				</figure>
				{/* Jonathan */}
				<figure className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-t-lg md:rounded-t-none md:rounded-tl-lg dark:bg-moredark">
					<div className="max-w- bg-white rounded-large shadow-lg dark:bg-darkblue">
						<div className="flex justify-center">
							<img
								className="rounded-full w-50 h-50 p-5"
								src="https://ca.slack-edge.com/T047XGQ15B6-U04HVCKBCDQ-0832a13c7168-512"
								alt=""
							/>
						</div>
						<div className="p-5">
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								Jonathan Killian
							</h5>
							<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
								Full Stack Software Developer
							</p>
							<div className="flex justify-center space-x-4">
								<NavLink to="https://gitlab.com/jrkillian11">
									<img
										className="w-7 h-7"
										src="https://www.vectorlogo.zone/logos/gitlab/gitlab-icon.svg"
									/>
								</NavLink>
								<NavLink to="https://www.linkedin.com/in/jonathan-killian-9175971bb/">
									<img
										className="w-6 h-6"
										src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
									/>
								</NavLink>
							</div>
						</div>
					</div>
				</figure>
				{/* Andrew */}
				<figure className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-t-lg md:rounded-t-none md:rounded-tl-lg dark:bg-moredark">
					<div className="max-w- bg-white rounded-large shadow-lg dark:bg-darkblue">
						<div className="flex justify-center">
							<img
								className="rounded-full w-50 h-50 p-5"
								src="https://ca.slack-edge.com/T047XGQ15B6-U04HEG3L2S1-09ebc7a646b5-512"
								alt=""
							/>
						</div>
						<div className="p-5">
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								Anderw Ipsen
							</h5>
							<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
								Full Stack Software Developer
							</p>
							<div className="flex justify-center space-x-4">
								<NavLink to="https://gitlab.com/andrewipsen">
									<img
										className="w-7 h-7"
										src="https://www.vectorlogo.zone/logos/gitlab/gitlab-icon.svg"
									/>
								</NavLink>
								<NavLink to="https://www.linkedin.com/in/andrew-ipsen/">
									<img
										className="w-6 h-6"
										src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
									/>
								</NavLink>
							</div>
						</div>
					</div>
				</figure>
			</div>
			<Footer />
		</>
	);
}
