import { useEffect, useState } from 'react';
import PositionFigure from './PositionFigure';

function CompanyDetail() {
	const [positions, setPositions] = useState([]);

	const fetchData = async () => {
		const url = 'http://localhost:8000/positions/';
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			console.log(data);
			setPositions(data);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const [isFigureOpen, setIsFigureOpen] = useState(false);
	const [figureData, setFigureData] = useState(null);

	const handleFunctionClick = (position) => {
		setIsFigureOpen(!isFigureOpen);
		setFigureData(position);
		console.log(position);
	};

	const Function = () => {
		return;
	};

	return (
		<div className="">
			<div className="container flex flex-row h-full">
				<div
					className="
        flex flex-col
        p-4 mx-4 w-96
        bg-slate-300
        rounded-xl shadow-lg items-center
        "
				>
					<h1
						className="
          p-2 my-4 w-48
          text-xl font-bold text-center text-gray-700
          rounded
          bg-gradient-to-r bg-cyan-500
          transition ease-in delay-50
        hover:from-cyan-500
        hover:to-blue-500
          hover:text-white
          "
					>
						Positions
					</h1>
					<div className="mx-0">
						{positions.map((position) => {
							return (
								<button
									className="
                  p-2 w-32 my-4
                  flex items-center text-center text-gray-700 font-semibold
                  rounded shadow-lg
                  bg-gradient-to-r bg-cyan-500
                  transition ease-in delay-50
                  hover:translate-x-4
                  hover:scale-110
                  hover:text-xl
                hover:from-cyan-500
                hover:to-blue-500
                  hover:text-white
                  "
									key={position.id}
									onClick={() => {
										handleFunctionClick(position);
									}}
								>
									{position.name}
								</button>
							);
						})}
					</div>
				</div>
				<div
					className="
        flex
        p-6 mx-4
        min-w-max w-screen
        rounded-xl shadow-lg
        bg-slate-300 items-center space-x-4"
				>
					<div>
						<div>{isFigureOpen ? <PositionFigure /> : 'test'}</div>
						<div className="text-xl font-medium text-black">"Position1"</div>
						<p className="text-slate-500">Position data here</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CompanyDetail;
