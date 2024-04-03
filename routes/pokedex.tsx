import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import PokedexContainer from "../components/PokedexContainer.tsx";
import { Pokemon } from "../types.ts";
import Axios from "npm:axios";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Pokemon[]>) => {
    try {
      const response = await Axios.get<Pokemon[]>(
        "https://lospoquimones.deno.dev/"
      );

        //if(response) console.log("funcionaaa")

      if (!response || response.status !== 200) {
        throw new Error("Failed to connect with API!");
      }

      const pokemons = response.data;

      //console.log("Son pokemons: " + pokemons)

      return ctx.render(pokemons);

    } catch (error) {
      throw new Error("Failed to fetch pokemon data!");
    }
  },
};

const Page = (props: PageProps<Pokemon[]>) => {
  return (
    <PokedexContainer pokemons={props.data} />
  );
}

export default Page;