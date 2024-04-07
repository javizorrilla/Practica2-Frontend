import { FunctionComponent } from "preact";
import { PokedexContainerProps } from "../types.ts";
import PokemonComponent from "./PokemonComponent.tsx";

const PokedexContainer: FunctionComponent<PokedexContainerProps> = (props) => {
  const { pokemons } = props;

  return (
    <div class="pokemonContainer">
      {pokemons.map((p) => {
        return (
          <div>
            <PokemonComponent name={p.name} image={p.image} sound={p.sound} />
          </div>
        );
      })}
    </div>
  );
};

export default PokedexContainer;
