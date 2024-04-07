import { FunctionComponent } from "preact";
import { PokemonProps } from "../types.ts"

const PokemonComponent: FunctionComponent<PokemonProps> = (props) => {
    const {name, image, sound} = props;

    return (
        <div>
            <strong><p class="pokemonName">{name.toUpperCase()}</p></strong>
            <img class="pokemonImg" src={image} alt={name}/>
            <p>
                <audio controls>
                    <source src={sound} type="audio/mpeg"/>
                </audio>
            </p>
        </div>
    )
}

export default PokemonComponent;