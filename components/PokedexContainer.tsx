import { FunctionComponent } from "preact";
import { PokedexContainerProps } from "../types.ts";
import Pokemon from "./Pokemon.tsx";
import BackButton from "./BackButton.tsx";

const PokedexContainer: FunctionComponent<PokedexContainerProps> = (props) => {
  const { pokemons } = props;

  return (
    <div>
      <h1>POKEMONS COLLECTION</h1>
      <div>
        {pokemons.map((p) => {
          <Pokemon name={p.name} image={p.image} sound={p.sound}/>;
        })}
        <BackButton/>
      </div>
    </div>
  );
};

export default PokedexContainer;
