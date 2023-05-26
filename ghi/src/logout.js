import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from '@galvanize-inc/jwtdown-for-react';

function Logout() {
	const navigate = useNavigate();
	const [successAlert, setSuccessAlert] = useState(false);
	const { logout } = useToken();

	const handleSubmit = async (event) => {
		event.preventDefault();
		logout();
		if (Logout) {
			setSuccessAlert(true);
			setTimeout(() => {
				setSuccessAlert(false);
			}, 3000);
			setTimeout(() => {
				navigate('/companies');
			}, 3000);
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
