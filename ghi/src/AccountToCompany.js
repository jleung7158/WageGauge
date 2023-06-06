import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const AccountToCompany = () => {
	const [companies, setCompanies] = useState([]);
	const [company, setCompany] = useState('');
	const [positions, setPositions] = useState([]);
	const [position, setPosition] = useState('');
	const [salary, setSalary] = useState('');
	const [years_exp, setYears_Exp] = useState('');
	const [location, setLocation] = useState('');
	const [account_id, setAccount_id] = useState('');
	const [successAlert, setSuccessAlert] = useState(false);

	const updateInputState = function ({ target }, cb) {
		const { value } = target;
		cb(value);
	};

	const currentAccount = async () => {
		const url = 'http://localhost:8000/token';
		const response = await fetch(url, {
			credentials: 'include',
			method: 'get',
		});
		console.log(response);
		if (response.ok) {
			const data = await response.json();
			console.log('asdfasdfasdf', data);
			setAccount_id(data.account.id);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = {
			salary: parseInt(salary),
			years_exp: years_exp,
			location: location,
			account_id: account_id,
			company_id: company,
			position_id: position,
		};
		console.log('eggs', data);
		const url = 'http://localhost:8000/employees';
		const config = {
			method: 'POST',
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' },
		};
		// try {
		const response = await fetch(url, config);
		//console.log("beans", response)
		if (response.ok) {
			//console.log(response)
			event.target.reset();
			setSuccessAlert(true);
			const alertTimeout = setTimeout(() => {
				setSuccessAlert(false);
			}, 3000);
			return () => {
				clearTimeout(alertTimeout);
			};
			//     } else {
			//         throw new Error('network response error');
			//     }
			// } catch (error) {
			//     console.log('Error adding employee', error);
			// }
		}
	};

	const fetchCompany = async () => {
		const companyUrl = 'http://localhost:8000/companies';
		const response = await fetch(companyUrl);
		if (response.ok) {
			const data = await response.json();
			console.log('company data', data);
			setCompanies(data);
		} else {
			console.log('Error fetching companies', response.statusText);
		}
	};
	const fetchPosition = async () => {
		const positionUrl = 'http://localhost:8000/positions';
		const response = await fetch(positionUrl);
		if (response.ok) {
			const data = await response.json();
			console.log('position', data);
			setPositions(data);
		} else {
			console.log('Error fetching positions', response.statusText);
		}
	};

	useEffect(() => {
		fetchCompany();
		fetchPosition();
		currentAccount();
	}, [account_id]);

	const positionByCompany = (event) => {
		let filtered = [];
		for (let i = 0; i < positions.length; i++) {
			if (positions[i].company_id === event) {
				filtered.push(positions[i]);
			}
		}
		return filtered;
	};

	const handleYearsChange = (event) => {
		setYears_Exp(event.target.value);
		console.log(event.target.value);
	};
	const handleCompanyChange = (event) => {
		setCompany(parseInt(event.target.value));
		console.log(event.target.value);
	};
	const handlePositionChange = (event) => {
		setPosition(parseInt(event.target.value));
		console.log(event.target.value);
	};

	return (
		<div
			className="flex items-center justify-center min-h-screen bg-gray-100 py-2"
			style={{
				background: 'linear-gradient(to bottom, #87CEEB, #42098E)',
			}}
		>
			{successAlert && (
				<div
					className="alert alert-success"
					role="alert"
					style={{
						position: 'fixed',
						top: '1rem',
						right: '1rem',
						zIndex: 1000,
						color: 'white',
						backgroundColor: 'green',
						borderColor: 'darkgreen',
						border: '1px solid',
						borderRadius: '5px',
						padding: '0.75rem 1.25rem',
					}}
				>
					Job has been add to your account!
				</div>
			)}
			<div className="max-w-md w-full space-y-8 p-10 bg-white rounded-x1 shadow-md overflow-hidden">
				<h1 style={{ textAlign: 'center' }}>Add Your Job</h1>
				<form
					className="form-select appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
					onSubmit={handleSubmit}
					id="Account To Company"
				>
					{/* <div className="rounded-md shadow-sm -space-y-px"> */}
					<div>
						<select
							id="Company Name"
							name="Company Name"
							required
							// value={company}
							className="form-select appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
							onChange={(event) => handleCompanyChange(event)}
						>
							<option value="">Choose Company</option>
							{companies?.map((company) => {
								return (
									<option key={company.id} value={company.id}>
										{company.name}
									</option>
								);
							})}
						</select>
					</div>
					<div>
						<select
							id="Position"
							name="Position"
							required
							// value={position}
							className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 form-control"
							onChange={(event) => handlePositionChange(event)}
						>
							<option value="">Choose a Position</option>
							{positionByCompany(company).map((p) => {
								return (
									<option key={p.id} value={p.id}>
										{p.name}
									</option>
								);
							})}
						</select>
					</div>
					<div>
						<select
							id="Experience"
							name="Experience"
							required
							value={years_exp}
							className="form-select appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
							onChange={(event) => handleYearsChange(event)}
						>
							<option value="">Choose Experience Level</option>
							<option value="0-3">0-3</option>
							<option value="4-6">4-6</option>
							<option value="7-10">7-10</option>
							<option value="11+">11+</option>
						</select>
					</div>
					<div>
						<input
							id="Salary"
							name="Salary"
							type="text"
							required
							className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 form-control"
							placeholder="Salary"
							value={salary}
							onChange={(event) => updateInputState(event, setSalary)}
						/>
					</div>
					<div>
						<input
							id="Location"
							name="Location"
							type="text"
							className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 form-control"
							placeholder="Location"
							value={location}
							onChange={(event) => updateInputState(event, setLocation)}
						/>
					</div>
					<button
						type="submit"
						className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Update Account
					</button>
				</form>
			</div>
		</div>
	);
};

export default AccountToCompany;
