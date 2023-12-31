import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from '@galvanize-inc/jwtdown-for-react';
import Reviews from './components/Reviews';
import { NavLink } from 'react-router-dom';
import Video from './splash_ad.mp4';

function SignUpForm() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const [successAlert, setSuccessAlert] = useState(false);
	const { login } = useToken();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const newAccount = {
			first_name: firstName,
			last_name: lastName,
			email: email,
			password: password,
		};

		const url = `${process.env.REACT_APP_API_HOST}/api/accounts`;
		const config = {
			method: 'post',
			body: JSON.stringify(newAccount),
			headers: { 'Content-Type': 'application/json' },
		};
		fetch(url, config)
			.then((response) => response.json())
			.then(() => {
				setSuccessAlert(true);
				const alertTimeout = setTimeout(() => {
					setSuccessAlert(false);
				}, 3000);
				const navigateTime = setTimeout(() => {
					login(email, password);
					navigate('/dashboard');
				}, 2000);
				return () => {
					clearTimeout(alertTimeout);
					clearTimeout(navigateTime);
				};
			});
	};

	const handleFirstName = (event) => {
		setFirstName(event.target.value);
	};

	const handleLastName = (event) => {
		setLastName(event.target.value);
	};

	const handleEmail = (event) => {
		setEmail(event.target.value);
	};

	const handlePassword = (event) => {
		setPassword(event.target.value);
	};
	/* eslint-disable */

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100 bg-gradient-to-b from-[#d7e4ef] from-50% to-wageblue dark:bg-gradient-to-b dark:from-moredark dark:to-moredark">
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
					Account created! Logging in...
				</div>
			)}
			<div className="flex flex-col items-center">
				<div className="w-[500px]">
					<video autoPlay muted className="w-full">
						<source src={Video} type="video/mp4" />
						Your browser does not support the video tag.
					</video>
				</div>
				<h1
					style={{ fontWeight: 'bold', paddingTop: '50px' }}
					className="text-3xl mb-8 text-center dark:text-white"
				>
					Welcome! We're happy to have you on board!
				</h1>

				<form
					className="space-y-6  mx-auto"
					onSubmit={handleSubmit}
					id="sign-up-form"
					style={{ width: '400px' }}
				>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<input
								id="grid-first-name"
								name="First Name"
								type="text"
								required
								className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								placeholder="First name"
								value={firstName}
								onChange={handleFirstName}
							/>
						</div>
						<div>
							<input
								id="Last-name"
								name="Last-name"
								type="text"
								required
								className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								placeholder="Last name"
								value={lastName}
								onChange={handleLastName}
							/>
						</div>
					</div>
					<div>
						<input
							id="email"
							name="email"
							type="email"
							required
							className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							placeholder="Email address"
							value={email}
							onChange={handleEmail}
						/>
					</div>
					<div>
						<input
							id="password"
							name="password"
							type="password"
							required
							className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							placeholder="Password"
							value={password}
							onChange={handlePassword}
						/>
					</div>
					<div>
						<button
							type="submit"
							className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-large text-white bg-wageblue hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Sign Up
						</button>
					</div>
					<div className="mt-2">
						<NavLink
							to="/dashboard"
							className="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-large text-white bg-wageblue hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Continue without signing up
						</NavLink>
					</div>
				</form>
				<div className="w-[2000px]">
					<Reviews />
				</div>
			</div>
		</div>
	);
}

export default SignUpForm;
/* eslint-enable */
