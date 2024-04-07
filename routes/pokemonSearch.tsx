import Axios from "npm:axios";
import { Pokemon } from "../types.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import PokedexContainer from "../components/PokedexContainer.tsx";
import SearchForm from "../islands/SearchForm.tsx";
import BackButton from "../components/BackButton.tsx";

const fetchData = async (name: string | undefined): Promise<Pokemon[]> => {
  try {
    const response = await Axios.get<Pokemon[]>(
      `https://lospoquimones.deno.dev/${name}`,
    );
    if (!response || response.status !== 200) {
      throw new Error("Failed to connect with API!");
    }
    const pokemons = response.data;
    return pokemons;
  } catch (error) {
    throw new Error("Failed to fetch pokemon data!");
  }
};

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext<unknown, Pokemon[]>) => {
    try {
      const url = new URL(req.url);
      const name = url.searchParams.get("name") || undefined;
      const pokemon = await fetchData(name);
      return ctx.render(pokemon);
    } catch (error) {
      throw new Error("Failed to fetch pokemon data!");
    }
  },
};

const Page = (props: PageProps<Pokemon[]>) => {
  return (
    <div>
      <SearchForm />
      <PokedexContainer pokemons={props.data} />
    </div>
  );
};

export default Page;
