import { Handlers } from "$fresh/server.ts";
import { Pokemon } from "../../types.ts";

export const handler: Handlers = {
    POST: async(req: Request) => {
        try {
            const response = await fetch("https://lospoquimones.deno.dev/");
            const pokemonList: Pokemon[] = await response.json();
            const body = await req.json();
            const {name} = body;
            const exists = pokemonList.some(pokemon => pokemon.name === name);
            return new Response(JSON.stringify({exists}), {
                headers: {"Content-Type": "application/json"}
            });
        } catch(error) {
            throw new Error("Failed to check pokemon name");
        }
    }
}