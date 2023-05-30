import { useState } from "react";
import PositionFigure from "./PositionFigure";
import Dropdown from "./components/Dropdown";
// import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
// import Counter from "./features/counter/Counter.jsx";
import { useGetPositionsQuery, useGetCompaniesQuery } from "./services/api";
import { useGetPokemonByNameQuery } from "./services/pokemon";
import { useSelector, useDispatch } from "react-redux";

const CompanyDetail = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const handlePokeChange = (e) => {
    setInputValue(e.target.value.toLowerCase());
    dispatch();
  };

  const {
    data: pokeData,
    error: pokeError,
    isLoading: isPokeLoading,
  } = useGetPokemonByNameQuery(inputValue);
  const company = useSelector((state) => state.positionFilter.company);

  const { data: pData, isLoading: isPLoading } = useGetPositionsQuery();
  const { data: cData } = useGetCompaniesQuery();
  // const { token } = useAuthContext();

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
        p-4 mx-4 w-96 
        color-bg 
        rounded-xl shadow-lg items-center
        "
        >
          <Dropdown options={cData} />
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
      <input
        type="text"
        value={inputValue}
        onChange={(e) => handlePokeChange(e)}
        placeholder="Enter pokemon name"
        className="rounded placeholder:text-slate-700 p-2 outline-none"
      ></input>
      {/* <div>
        {pokeError ? (
          <>Oh no, there was an error</>
        ) : isPokeLoading ? (
          <>Loading...</>
        ) : pokeData ? (
          <>
            <h3>{pokeData.species.name}</h3>
            <img
              src={pokeData.sprites.front_shiny}
              alt={pokeData.species.name}
            />
          </>
        ) : null}
      </div> */}
    </div>
  );
};

export default CompanyDetail;
