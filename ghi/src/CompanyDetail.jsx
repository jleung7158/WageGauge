import { useEffect, useState } from "react";
import PositionFigure from "./PositionFigure";
import Dropdown from "./components/Dropdown";

const CompanyDetail = () => {
  const [positions, setPositions] = useState([]);
  const [companies, setCompanies] = useState([]);

  const fetchPositionData = async () => {
    const pUrl = "http://localhost:8000/positions/";
    const pResponse = await fetch(pUrl);
    if (pResponse.ok) {
      const pData = await pResponse.json();
      setPositions(pData);
    }
  };

  const fetchCompanyData = async () => {
    const cUrl = "http://localhost:8000/companies/";
    const cResponse = await fetch(cUrl);
    if (cResponse.ok) {
      const cData = await cResponse.json();
      setCompanies(cData);
    }
  };

  const [isFigureOpen, setIsFigureOpen] = useState(false);
  const [figureData, setFigureData] = useState(null);

  const [companySelect, setCompanySelect] = useState("");

  const [reCompany, setReCompany] = useState("");
  const updateReCompany = () => {
    setCompanySelect("Successful company select");
    setReCompany(companySelect);
  };

  const getFilteredPositions = (companySelect, positions) => {
    if (!companySelect) {
      return positions;
    }
    return positions.filter((position) => {
      for (const [key, value] of Object.entries([position])) {
        if (position.company.includes(reCompany)) {
          return position.company.includes(reCompany);
        }
      }
    });
  };

  // useEffect(() => {

  //   console.log(companySelect);
  // }, [companySelect]);

  const filteredPositions = getFilteredPositions(companySelect, positions);

  const handleFigureClick = (position) => {
    setFigureData(position);
    setIsFigureOpen(true);
  };

  const handleCloseFigure = () => {
    setIsFigureOpen(false);
  };

  useEffect(() => {
    fetchCompanyData();
    fetchPositionData();
    updateReCompany(reCompany);
  }, []);

  return (
    <div className="">
      <div className="container flex flex-row h-full items-center">
        <div
          className="
        flex flex-col
        p-4 mx-4 w-96 
        color-bg 
        rounded-xl shadow-lg items-center
        "
        >
          <Dropdown
            companies={companies}
            fetchPositionData={fetchPositionData}
            reCompany={reCompany}
            setReCompany={setReCompany}
          />
          <h1
            className="
          p-2 my-4 w-72
          text-xl font-bold text-center text-gray-700
          rounded
          bg-gradient-to-r bg-slate-500
          "
          >
            Positions
          </h1>
          <div className="mx-0">
            {filteredPositions.map((position) => {
              return (
                <button
                  className="
                  p-2 w-48 my-4
                  flex justify-center text-center text-gray-700 font-semibold
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
        w-screen
        rounded-xl shadow-lg
        bg-slate-300 items-center space-x-4"
        >
          <div>
            <div className="text-xl font-medium text-black"></div>
            <p className="text-slate-500">Position data here</p>
            <div className="w-screen">
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
    </div>
  );
};

export default CompanyDetail;
