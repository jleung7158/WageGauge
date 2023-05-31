import { useLazyGetPokemonByNameQuery } from "../../services/pokemon";
import { setPokemon, clearPokemon } from "../../slices/pokemonSlice";
import { useSelector, useDispatch } from "react-redux";

const PokemonGrabber = () => {
  const dispatch = useDispatch();
  const pokemonName = useSelector((state) => state.pokemonFilter.pokemonName);

  const handlePokeChange = (e) => {
    dispatch(setPokemon(e.target.value.toLowerCase()));
  };
  const [
    trigger,
    { data: pokeData, error: pokeError, isLoading: isPokeLoading },
  ] = useLazyGetPokemonByNameQuery({});

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col m-4">
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
              w-48
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
            className=" w-48 rounded placeholder:text-slate-700 p-2 outline-none"
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
  );
};

export default PokemonGrabber;
