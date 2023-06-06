import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useToken from '@galvanize-inc/jwtdown-for-react';
const LoginForm = ({ onClose }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [successAlert, setSuccessAlert] = useState(false);
	const { login } = useToken();
	const handleSubmit = (e) => {
		e.preventDefault();
		login(username, password);
		onClose();
		e.target.reset();
		setSuccessAlert(true);
		const alertTimeout = setTimeout(() => {
			setSuccessAlert(false);
		}, 3000);
		return () => {
			clearTimeout(alertTimeout);
		};
	};
	const handleEmail = (event) => {
		setUsername(event.target.value);
	};
	const handlePassword = (event) => {
		setPassword(event.target.value);
	};
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div
				className="fixed inset-0 bg-black opacity-70"
				onClick={onClose}
			></div>
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
			<div
				className="relative z-10 max-w-md w-full space-y-8 p-10 bg-opacity-85 rounded-xl shadow-md overflow-hidden"
				style={{
					background: 'linear-gradient(to bottom, #87CEEB, #42098E)',
				}}
			>
				<button
					onClick={onClose}
					className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
				<h1 className="text-center" style={{ fontSize: '25px', margin: '0px' }}>
					Welcome back!
				</h1>
				<form onSubmit={handleSubmit} id="login-form">
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<input
								id="email"
								name="email"
								type="email"
								style={{ marginBottom: '10px' }}
								required
								className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
								style={{ marginBottom: '25px' }}
								required
								className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Password"
								value={password}
								onChange={handlePassword}
							/>
						</div>
					</div>
					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Login
						</button>
					</div>
					<div className="mt-2">
						<NavLink
							to="/signup"
							className="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-large text-white bg-wageblue hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Signup
						</NavLink>
					</div>
				</form>
			</div>
		</div>
	);
};
export default LoginForm;
