import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import PokedexContainer from "../components/PokedexContainer.tsx";
import { DeleteForm } from "../islands/DeleteForm.tsx";
import { Pokemon } from "../types.ts";
import Axios from "npm:axios";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Pokemon[]>) => {
    try {
      const response = await Axios.get<Pokemon[]>(
        "https://lospoquimones.deno.dev/"
      );

      if (!response || response.status !== 200) {
        throw new Error("Failed to connect with API");
      }

      const pokemons = response.data;
      return ctx.render(pokemons);

    } catch (error) {
      throw new Error("Failed to fetch pokemon data");
    }
  },
};

const Page = (props: PageProps<Pokemon[]>) => {
  return (
    <div>
      <h2>Pokemons Collection</h2>
      <PokedexContainer pokemons={props.data}/>
      <DeleteForm pokemon={props.data[0]}/>
    </div>
  );
};

export default Page;
