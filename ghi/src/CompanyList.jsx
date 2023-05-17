import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import TemperatureBarStack from './TemperatureBarStack';

function CompanyList() {

    const [companies, setCompanies] = useState([]);

    const fetchCompanies = async () => {
        const url = "http://localhost:8000/companies";
        const response = await fetch(url);
        if(response.ok) {
            const data = await response.json();
            console.log(data)
            setCompanies(data);
        }
    }
    useEffect(() => {
        fetchCompanies();
    }, [])
    return (
        <div>
        <div className="container flex flex-row">
            <div className="flex-col p-6 w-1/4 mx-4 bg-white rounded-xl shadow-lg flex items-center space-x-4">
            <h1 className="text-xl font-bold">Companies</h1>
            <div>
                {companies.map((companies) => {
                return <div key={companies.id}>{companies.name}</div>;
                })}
            </div>
            </div>
            <div className="p-6 w-3/4 mx-4 bg-white rounded-xl shadow-lg flex items-center space-x-4">
            <div>
                <div className="text-xl font-medium text-black"></div>
                <p className="text-slate-500">Company data here</p>
            </div>
            </div>
        </div>
        </div>
    );
}

export default CompanyList;
