import { useState, useEffect } from 'react';

const AccountToCompany = (fetchEmployee) => {
    const [company, setCompany] = useState([]);
    const [position, setPosition] = useState([]);
    const [salary, setSalary] = useState('');
    const [successAlert, setSuccessAlert] = useState(false);

    const updateInputState = function({ target }, cb) {
        const { value } = target;
        cb(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            company,
            position,
            salary
        };
        const url = 'http://localhost:8000/employees';
        const config = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'},
        };
        try {
            const response = await fetch(url, config);
            if (response.ok) {
                fetchEmployee();
                event.target.reset();
            } else {
                throw new Error('network response error');
            }
        } catch (error) {
            console.log('Error adding employee', error);
        }
    }

    const fetchCompany = async () => {
        const companyUrl = 'http://localhost:8000/companies'
        const response = await fetch(companyUrl)
        if (response.ok) {
            const data = await response.json();
            setCompany(data);
        } else {
            console.log('Error fetching company', response.statusText);
        }
    }
    const fetchPosition = async () => {
        const positionUrl = 'http://localhost:8000/positions';
        const response = await fetch(positionUrl)
        if (response.ok) {
            const data = await response.json();
            setPosition(data);
        } else {
            console.log('Error fetching position', response.statusText);
        }
    }
    const fetchSalary = async () => {
        const employeeUrl = 'http://localhost:8000/employees';
        const response = await fetch(employeeUrl)
        if (response.ok) {
            const data = await response.json();
            setSalary(data);
        } else {
            console.log('Error fetching employee', response.statusText);
        }
    }
    useEffect(() => {
        fetchCompany();
        fetchPosition();
        fetchSalary();
    }, []);
    
    const PositionByCompanyId = (company) => {
        return position.filter((position) => position.company.name === company);
    }


    return (
        <div
			className="flex items-center justify-center min-h-screen bg-gray-100 py-2"
			style={{
				background: 'linear-gradient(to bottom, #87CEEB, #42098E)',
			}}
		>
            {/* {successAlert && (
                <div
                    className="alert alert-success"
                    role="alert"
                    style={{
                        position: 'fixed',
                        top: '1rem',
                        rigth: '1rem',
                        zIndex: 1000,
                        color: 'White',
                        backgroundColor: 'green',
                        borderColor: 'darkgreen',
                        border: '1px solid',
                        borderRadius: '5px',
                        padding: '0.75rem 1.25rem',
                    }}
                >
                Employee added to Company
                </div>
            )} */}
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-x1 shadow-md overflow-hidden">
                <h1 style={{ textAlign: 'center' }}>Add Job</h1>
                <form
                className="mt-8 space-y-6"
                onSubmit={handleSubmit}
                id="Account To Company">
                    <div className="rounded-md shadow-sm -space-y-px">
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
                                {company.map((company) => (
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
    );
}


export default AccountToCompany;
