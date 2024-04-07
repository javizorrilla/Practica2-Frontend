import { FreshContext } from "$fresh/server.ts";
import BackButton from "../components/BackButton.tsx";
import { Pokemon } from "../types.ts";

const Layout = async (req: Request, ctx: FreshContext) => {
  const Component = ctx.Component;
  return (
    <div class="layout">
      <h1>WELCOME TO MY POKEMON'S WEB!</h1>
      <div class="header">
        <a href="/pokedex">Show pokedex</a>
        <a href="/pokemonSearch">Search pokemon</a>
        <a href="/addPokemon">Add pokemon</a>
      </div>
      <Component />
      <div>
        <BackButton />
      </div>
    </div>
  );
};

export default Layout;
