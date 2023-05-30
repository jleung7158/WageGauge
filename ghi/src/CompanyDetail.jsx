import { useState } from "react";
import PositionFigure from "./PositionFigure";
import CompanyDropdown from "./components/CompanyDropdown";

import { useGetPositionsQuery, useGetCompaniesQuery } from "./services/api";
import { useLazyGetPokemonByNameQuery } from "./services/pokemon";
import { setPokemon, clearPokemon } from "./slices/pokemonSlice";
import { useSelector, useDispatch } from "react-redux";

const CompanyDetail = () => {
  const dispatch = useDispatch();

  const company = useSelector((state) => state.companyFilter.company);
  const pokemonName = useSelector((state) => state.pokemonFilter.pokemonName);

  const handlePokeChange = (e) => {
    dispatch(setPokemon(e.target.value.toLowerCase()));
  };
  const [
    trigger,
    { data: pokeData, error: pokeError, isLoading: isPokeLoading },
  ] = useLazyGetPokemonByNameQuery({});

  const { data: pData, isLoading: isPLoading } = useGetPositionsQuery();
  const { data: cData } = useGetCompaniesQuery();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
          <CompanyDropdown options={cData} />
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
            <div className="w-full">
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
      <div className="flex flex-col">
        <div className="mx-4">
          {pokeError ? (
            <>Oh no, there was an error</>
          ) : isPokeLoading ? (
            <>Loading...</>
          ) : pokeData ? (
            <>
              <p>{pokeData.species.name}</p>
              <img
                src={pokeData.sprites.front_shiny}
                alt={pokeData.species.name}
              />
            </>
          ) : null}
        </div>
        <form className="flex-row" onSubmit={(e) => handleSubmit(e)}>
          <label>
            <p
              className="
              bg-gradient-to-r
              from-wageblue via-weedgreen to-white
              rounded shadow-lg
              dark:bg-gradient-to-r
              dark:from-moredark
              dark:to-wageblue
              dark:text-darktext"
            >
              Pokemon name:
            </p>
            <input
              type="text"
              id="pokemon"
              value={pokemonName}
              onChange={(e) => {
                handlePokeChange(e);
              }}
              placeholder="Enter pokemon name"
              className="rounded placeholder:text-slate-700 p-2 outline-none"
            />
          </label>
          <div>
            <button
              disabled={pokemonName === ""}
              className="
                bg-wageblue hover:bg-blue-700 text-white flex-row
                font-bold py-2 px-4 rounded-full"
              onClick={() => trigger(pokemonName)}
              type="submit"
              value="submit"
            >
              Submit
            </button>
            <button
              className="
                bg-wageblue hover:bg-blue-700 text-white 
                font-bold py-2 px-4 rounded-full"
              onClick={() => dispatch(clearPokemon())}
              type="submit"
              value="submit"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyDetail;
