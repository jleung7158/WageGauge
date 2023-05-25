import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
	const navigate = useNavigate();
	const [successAlert, setSuccessAlert] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const url = 'http://localhost:8000/token';
		const config = {
			method: 'delete',
		};
		const request = await fetch(url, config);
		if (request.ok) {
			setSuccessAlert(true);
			const data = await request.json();
			setTimeout(() => {
				setSuccessAlert(false);
			}, 3000);
			setTimeout(() => {
				navigate('/companies');
			}, 1000);
		}
	};

	return (
		<div>
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
					You have been logged out.
				</div>
			)}
			<button onClick={handleSubmit} type="submit">
				Logout
			</button>
		</div>
	);
}

export default Logout;
