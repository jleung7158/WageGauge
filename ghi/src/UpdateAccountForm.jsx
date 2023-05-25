import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AccountEdit = () => {
    const [company, setCompany] = useState([]);
    const [position, setPosition] = useState([]);
    const [salary, setSalary] = useState('');
    const navigate = useNavigate();
    const [successAlert, setSuccessAlert] = useState(false);


    const updateInputState = function({ target }, cb) {
        const { value } = target;
        cb(value);
    }

    const handleSubmit = async function (event) {
        event.preventDefault();
        const data = {
            company,
            position,
            salary
        };
        const employeeUrl = "http://localhost:8000/employees/{employee_id}"
        const fetchConfig = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type' : 'application/json'
            }
        };

        try {
            const response = await fetch(employeeUrl, fetchConfig);
            if (response.ok) {
                navigate('/companies');
            } else {
                throw new Error ('Network Response Issue')
            }
        } catch (error) {
            console.log('Error changing information', error);
        }
    }

    return(
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
					Information Updated!
				</div>
			)}
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-x1 shadow-md overflow-hidden">
                <h1 style={{ textAlign: 'center' }}>Update Account</h1>
                <form
                className="mt-8 space-y-6"
                onSubmit={handleSubmit}
                id="Account Update">
                    <div classname="rounded-md shadow-sm -space-y-px">
                        <div>
                            <select
                                id="Company Name"
                                name="Company Name"
                                type="text"
                                required
                                className="opaque-list form-select"
                                value={company}
                                onChange={(event) => updateInputState(event.target.value)}
                                >
                                <option value=''>Choose Company</option>
                                {companies.map((company) => (
                                        <option
                                        key={company.name}>
                                        </option>
                                ))}
                            </select>
                            </div>
                            <div>
                                <input
                                id="Position"
                                name="Position"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 form-control"
                                placeholder="Position"
                                onChange={(event) => updateInputState(event, setPosition)}
                                />
                                </div>
                                <div>
                                <input
                                id="Salary"
                                name="Salary"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Salary"
                                onChange={(event) => updateInputState(event, setSalary)}
                                />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Update
                            </button>
                        </form>
                    </div>
            </div>
    )
}


export default AccountEdit;
