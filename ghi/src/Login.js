import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from '@galvanize-inc/jwtdown-for-react';

const LoginForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const [successAlert, setSuccessAlert] = useState(false);
	const { login } = useToken();

	const handleSubmit = (e) => {
		e.preventDefault();
		login(username, password);
		console.log(login);
		e.target.reset();
		setSuccessAlert(true);
		const alertTimeout = setTimeout(() => {
			setSuccessAlert(false);
		}, 3000);
		const navigateTime = setTimeout(() => {
			navigate('/companies');
		}, 1000);
		return () => {
			clearTimeout(alertTimeout);
			clearTimeout(navigateTime);
		};
	};

	const handleEmail = (event) => {
		setUsername(event.target.value);
	};

	const handlePassword = (event) => {
		setPassword(event.target.value);
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
					Logged in!
				</div>
			)}
			<div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md overflow-hidden">
				<h1 style={{ textAlign: 'center' }}>Login</h1>
				<form
					className="mt-8 space-y-6"
					onSubmit={handleSubmit}
					id="sign-up-form"
				>
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<input
								id="email"
								name="email"
								type="email"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Email address"
								value={username}
								onChange={handleEmail}
							/>
						</div>
						<div>
							<input
								id="password"
								name="password"
								type="password"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Password"
								value={password}
								onChange={handlePassword}
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default LoginForm;
