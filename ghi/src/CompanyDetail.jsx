import React, { useState } from "react";
import PositionFigure from "./PositionFigure";
import CompanyDropdown from "./components/CompanyDropdown";

import { useGetPositionsQuery, useGetCompaniesQuery } from "./services/api";
import { useSelector, useDispatch } from "react-redux";
import PokemonGrabber from "./features/pokemon/Pokemon";

const CompanyDetail = () => {
  const company = useSelector((state) => state.companyFilter.company);
  const { data: pData, isLoading: isPLoading } = useGetPositionsQuery();
  const { data: cData } = useGetCompaniesQuery();

  const [isFigureOpen, setIsFigureOpen] = useState(false);
  const [figureData, setFigureData] = useState(null);

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
      <div className="container flex flex-row h-full items-center">
        <div
          className="
        flex flex-col
        m-8 px-2 py-4
        bg-slate-200
        rounded-xl shadow-lg items-center
        "
        >
          <CompanyDropdown options={cData} />
          <h1
            className="
          p-2 my-4 w-full
          text-xl font-bold text-gray-700
          rounded text-center
          bg-gradient-to-r bg-slate-500
          "
          >
            Positions
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
                  flex justify-center text-center text-gray-700 font-semibold
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
                </button>
              );
            })}
          </div>
        </div>
        <div
          className="
        flex
        p-6 mx-4
        w-max
        rounded-xl shadow-lg
        bg-slate-200 items-center space-x-4
        "
        >
          <div>
            <div className="text-xl font-medium text-black"></div>
            <p className="text-slate-500">Position data here</p>
            <div className="">
              {isFigureOpen ? <PositionFigure position={figureData} /> : ""}
            </div>
            <button
              onClick={() => {
                handleCloseFigure();
              }}
            >
              {isFigureOpen ? "Clear" : ""}
            </button>
          </div>
        </div>
      </div>
      <PokemonGrabber />
    </div>
  );
};

export default CompanyDetail;
