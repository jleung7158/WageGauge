import { useNavigate } from 'react-router-dom';

function heCheckAndHeProtec() {
	const nav = useNavigate();
	const fetchData = async () => {
		const url = 'http://localhost:8100/api/protected/';
		const response = await fetch(url);
		if (!response.ok) {
			return nav('/signup');
		}
	};
}
export default heCheckAndHeProtec;
