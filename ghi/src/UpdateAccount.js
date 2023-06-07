import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from '@galvanize-inc/jwtdown-for-react';

function UpdateAccountInfo() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [account_id, setAccount_id] = useState('');
	const [successAlert, setSuccessAlert] = useState(false);
	const [error, setError] = useState(null);
	const { login, logout } = useToken();
	const navigate = useNavigate();

	const currentAccount = async () => {
		const url = `${process.env.REACT_APP_API_HOST}/token`;
		const response = await fetch(url, {
			credentials: 'include',
			method: 'get',
		});
		if (response.ok) {
			const data = await response.json();
			setFirstName(data.account.first_name);
			setLastName(data.account.last_name);
			setEmail(data.account.email);
			setAccount_id(data.account.id);
		}
	};

	const updateAccount = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setError(
				'Confirmation password does not match your password, please try again.'
			);
			return;
		}
		const account = {
			first_name: firstName,
			last_name: lastName,
			email: email,
			password: password,
		};

		const url = `${process.env.REACT_APP_API_HOST}/api/accounts/${account_id}`;
		const config = {
			method: 'put',
			body: JSON.stringify(account),
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		};
		const response = await fetch(url, config);
		console.log(response);
		if (response.ok) {
			// newAcctInfo = await response.json();
			setSuccessAlert(true);
			logout();
			// e.target.reset();
			const alertTimeout = setTimeout(() => {
				login(email, password);
				setSuccessAlert(false);
				navigate('/updateACcount'); //Change this later to my profile page
			}, 3000);
			return () => {
				clearTimeout(alertTimeout);
			};
		}
	};

	useEffect(() => {
		currentAccount();
	}, [account_id]);

	return (
		<>
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
						Account updated!
					</div>
				)}
				<div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md overflow-hidden">
					<h1 style={{ textAlign: 'center' }}>Update your account</h1>
					<form
						className="mt-8 space-y-6"
						onSubmit={updateAccount}
						id="Update-Account-form"
					>
						<div className="rounded-md shadow-sm -space-y-px">
							<div>
								<input
									id="grid-first-name"
									name="First Name"
									type="text"
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="First name"
									value={firstName}
									onChange={(event) => setFirstName(event.target.value)}
								/>
							</div>
							<div>
								<input
									id="Last-name"
									name="Last-name"
									type="text"
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Last name"
									value={lastName}
									onChange={(event) => setLastName(event.target.value)}
								/>
							</div>
							<div>
								<input
									id="email"
									name="email"
									type="email"
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Email address"
									value={email}
									onChange={(event) => setEmail(event.target.value)}
								/>
							</div>
							<div style={{ marginTop: '10px', textAlign: 'center' }}>
								<p>Please re-enter/change your current password</p>
								<input
									id="password"
									name="password"
									type="password"
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Password"
									value={password}
									onChange={(event) => setPassword(event.target.value)}
								/>
								<input
									id="confirm-password"
									name="confirm-password"
									type="password"
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Confirm Password"
									value={confirmPassword}
									onChange={(event) => setConfirmPassword(event.target.value)}
								/>
								{error && <p>{error}</p>}
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Confrim update
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default UpdateAccountInfo;
