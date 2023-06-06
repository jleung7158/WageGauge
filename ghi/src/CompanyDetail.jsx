import React, { useState } from 'react';
import PositionFigure from './PositionFigure';
import CompanyDropdown from './components/CompanyDropdown';

import { useGetPositionsQuery, useGetCompaniesQuery } from './services/api';
import { useSelector } from 'react-redux';
import PokemonGrabber from './features/pokemon/Pokemon';
import circleRight from './img/circleright.svg';
import user from './img/userCircle.svg';
import chart from './img/chart.svg';

const CompanyDetail = () => {
	const company = useSelector((state) => state.companyFilter.company);
	const { data: pData, isLoading: isPLoading } = useGetPositionsQuery();
	const { data: cData } = useGetCompaniesQuery();

	const [isFigureOpen, setIsFigureOpen] = useState(false);
	const [figureData, setFigureData] = useState(null);

	/* eslint-disable */
	const getFilteredPositions = (company, pData) => {
		if (!company) {
			return pData;
		} else {
			return pData?.filter((position) => {
				for (const [key, value] of Object.entries([position])) {
					if (position.company.includes(company)) {
						return position.company.includes(company);
					}
				}
			});
		}
	};
	/* eslint-enable */

	const filteredPositions = getFilteredPositions(company, pData);

	const handleFigureClick = (position) => {
		setFigureData(position);
		setIsFigureOpen(true);
	};

	const handleCloseFigure = () => {
		setIsFigureOpen(false);
	};

	if (isPLoading) {
		return (
			<progress className="progress is-primary" max="100">
				Positions loading
			</progress>
		);
	}

	return (
		<div className="">
			<div
				className="
      container flex flex-row
      h-full items-center
      "
			>
				<div
					className="
        flex flex-col
        m-8 px-4 py-4 w-64
        bg-slate-200
        rounded shadow-xl items-center
        "
				>
					<CompanyDropdown options={cData} />
					<h1
						className="
          p-2 my-4 w-max flex
          text-xl font-bold text-black
          rounded text-center shadow-lg
          bg-gradient-to-r items-center
          dark:text-darktext
          "
					>
						Positions
						<img
							alt="positions"
							src={user}
							className="w-[30px] opacity-50 mx-2"
						/>
					</h1>
					<div
						className="
          mx-4 px-8
          border-y-2 border-slate-300 overflow-y-auto h-80
          "
					>
						{filteredPositions.map((position) => {
							return (
								<button
									className="
                  p-2 w-48 my-4
                  flex
                  justify-center text-center items-center
                  text-gray-700 font-semibold
                  rounded shadow-lg
                  bg-slate-100
                  transition ease-in delay-50
                  hover:translate-x-4
                  hover:from-cyan-500
                  hover:to-blue-500
                  "
									key={position.id}
									onClick={() => {
										handleFigureClick(position);
									}}
								>
									{position.company} - {position.name}
									<img
										alt="companies"
										src={circleRight}
										className="w-[30px] opacity-50"
									/>
								</button>
							);
						})}
					</div>
				</div>
				<div
					className="
        flex
        p-6 mx-4
        w-[960px] h-3/5
        rounded shadow-xl
        bg-slate-200 items-center space-x-4
        "
				>
					<div className="flex flex-col">
						{isFigureOpen ? (
							''
						) : (
							<>
								<img
									alt="chart"
									src={chart}
									className="w-[25px] opacity-50 mx-2 rotate-90 -scale-100"
								/>
								<p className="text-2xl m-4 p-4 bg-slate-100 font-semibold rounded">
									Click a position to populate this figure!
								</p>
							</>
						)}

						<div className="h-full">
							{isFigureOpen ? <PositionFigure position={figureData} /> : ''}
						</div>
						{isFigureOpen ? (
							<button
								className="p-2 bg-slate-300
              rounded font-semibold
              w-max
              "
								onClick={() => {
									handleCloseFigure();
								}}
							>
								Close
							</button>
						) : (
							''
						)}
					</div>
				</div>
			</div>
			<PokemonGrabber />
		</div>
	);
};

export default CompanyDetail;
