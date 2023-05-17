import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CompanyList() {

    const [companies, setCompanies] = useState([]);

    const fetchCompanies = async () => {
        const url = "http://localhost:8000/docs#/default/get_all_companies_get";
        const response = await fetch(url);
        if(response.ok) {
            const data = await response.json();
            setCompanies(data.companies)
        }
    }
    useEffect(() => {
        fetchCompanies();
    }, [])
    return (
        <p>hello</p>
    )
}

export default CompanyList
