/*
Para buscar un pokemon en la pokedex, se debe ingresar el nombre del pokemon en la url,
de la siguiente manera:
https://lospoquimones.deno.dev/pokemon/<nombreDelPokemon>
*/

import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Pokemon, PokedexContainerProps } from "../../types.ts";
import PokedexContainer from "../../components/PokedexContainer.tsx";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Pokemon[]>) => {
    const { name } = ctx.params;
    console.log(name);
    try {
      const response = await fetch(
        `https://lospoquimones.deno.dev/${name}`,
      );
      if (!response || response.status !== 200) {
        throw new Error("GET request failed");
      }
      const pokemon = await response.json();
      
      return new Response(JSON.stringify(pokemon), {
        headers: { "content-type": "application/json" }      
      });

    } catch (error) {
      throw new Error("Pokemon not found");
    }
  },
};

const Page = (props: PageProps<PokedexContainerProps>) => {
  const pokemon = props.data.pokemons;
  return (
    <div>
      <PokedexContainer pokemons={pokemon}/>
    </div>
  );
};

export default Page;
