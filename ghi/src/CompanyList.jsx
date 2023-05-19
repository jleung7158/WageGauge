import { useEffect, useState } from 'react';

function CompanyList() {
	const [companies, setCompanies] = useState([]);
	const [positions, setPositions] = useState([]);

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
	}, []);
    useEffect(() => {
		fetchPositions();
	}, []);

	return (
		<div>
			<div>
				<div className="container flex flex-row">
					<div className="flex-col p-6 w-1/4 mx-4 bg-white rounded-xl shadow-lg flex items-center space-x-4">
						<h1 className="text-xl font-bold">Companies</h1>
					</div>
					<div className="p-6 w-3/4 mx-4 bg-white rounded-xl shadow-lg flex items-center space-x-4">
						<div>
							<div className="text-xl font-medium text-black"></div>
							<ul role="list" className="divide-y divide-gray-100">
								{companies.map((company) => (
									<li
										key={company.id}
										className="flex justify-between gap-x-6 py-5"
									>
										<div className="flex gap-x-4">
											<div className="min-w-0 flex-auto">
												<p className="text-sm font-semibold leading-6 text-gray-900">
													{company.name}
												</p>
											</div>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
                        <div className="p-6 w-3/4 mx-4 bg-white rounded-xl shadow-lg flex items-center space-x-4">
						<div>
                                {positions.map((position) => (
									<li
										key={position.id}
										className="flex justify-between gap-x-6 py-5"
									>
										<div className="flex gap-x-4">
											<div className="min-w-0 flex-auto">
												<p className="text-sm font-semibold leading-6 text-gray-900">
													{position.name}
												</p>
											</div>
										</div>
									</li>
								))}
                        </div>
				</div>
			</div>
		</div>
		</div>
	);
}


export default CompanyList;
