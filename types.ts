export type Pokemon = {
    _id: string;
    name: string;
    image: string;
    sound: string;
}

export type PokemonProps = {
    name: string;
    image: string;
    sound: string;
}

export type PokedexContainerProps = {
    pokemons: PokemonProps[];
}