import { FreshContext, Handlers } from "$fresh/server.ts";
import Axios from "npm:axios";
import AddForm from "../islands/AddForm.tsx";

type AddData = {
  name: string;
  image: string;
  sound: string;
  creator: string;
};

const addPokemon = async (data: AddData) => {
  try {
    const response = await Axios.post("https://lospoquimones.deno.dev/", data);
    return response;
  } catch (error) {
    throw new Error("Failed to add pokemon");
  }
};

export const handler: Handlers = {
  POST: async (req: Request, ctx: FreshContext) => {

      const formData = await req.formData();
      const data: AddData = {
        name: formData.get("name") as string,
        image: formData.get("image") as string,
        sound: formData.get("sound") as string,
        creator: formData.get("creator") as string,
      };
      console.log(data);
      const response = await addPokemon(data);
      //console.log(response.data);
      return ctx.render({
        status: response.status,
        body: { message: "Pokemon added successfully", data: response.data }
      })
  }
};

const Page = () => {
  return (
    <div>
      <AddForm/>
    </div>
  );
};

export default Page;