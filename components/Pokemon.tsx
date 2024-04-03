import { FunctionComponent } from "preact";
import { PokemonProps } from "../types.ts"

const Pokemon: FunctionComponent<PokemonProps> = (props) => {
    const {name, image, sound} = props;

    return (
        <div>
            <h2>{name}</h2>
            <img src={image} alt={name}/>
            <p>
                <audio controls>
                    <source src={sound} type="audio/mpeg">Audio = </source>
                </audio>
            </p>
        </div>
    )
}

export default Pokemon;