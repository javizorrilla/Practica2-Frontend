import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";
import { JSX } from "preact/jsx-runtime";

export const AddForm: FunctionComponent = () => {
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [sound, setSound] = useState<string>("");
  const [creator, setCreator] = useState<string>("");

  const submitHandler = async (
    e: JSX.TargetedEvent<HTMLFormElement, Event>,
  ) => {
    e.preventDefault();
    const errorMsg: string[] = [];
    if (name === "") errorMsg.push("You must provide a name");
    if (image === "") errorMsg.push("You must provide an image");
    if (sound === "") errorMsg.push("You must provide a sound");
    if (creator === "") errorMsg.push("You must provide a creator");

    if (errorMsg.length > 0) setError(errorMsg.join(" | "));
    else {
      setError("");
      e.currentTarget.submit();

      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", image);
        formData.append("sound", sound);
        formData.append("creator", creator);

        const response = await fetch("/addPokemon", {
          method: "POST",
          body: formData,
        });

        if (response.status === 200) {
          console.log("Pokemon added successfully");
          setName("");
          setImage("");
          setSound("");
          setCreator("");
          setError("");
        } else {
          setError("Failed to add pokemon");
        }

        const data = await response.json();
        return data;
      } catch (error) {
        setError("Failed to add pokemon");
      }
    }
  };

  return (
    <div>
      <h1>Add pokemon</h1>
      <form action="/addPokemon" method="POST" onSubmit={submitHandler}>
        <div>
          <label for="name">Name</label>
        </div>
        <div>
          <input
            onFocus={(e) => setError("")}
            onInput={(e) => setName(e.currentTarget.value)}
            type="text"
            id="name"
            name="name"
          />
        </div>

        <div>
          <label for="image">Image</label>
        </div>
        <div>
          <input
            onFocus={(e) => setError("")}
            onInput={(e) => setImage(e.currentTarget.value)}
            type="text"
            id="image"
            name="image"
          />
        </div>

        <div>
          <label for="sound">Sound</label>
        </div>
        <div>
          <input
            onFocus={(e) => setError("")}
            onInput={(e) => setSound(e.currentTarget.value)}
            type="text"
            id="sound"
            name="sound"
          />
        </div>

        <div>
          <label for="creator">Creator</label>
        </div>
        <div>
          <input
            onFocus={(e) => setError("")}
            onInput={(e) => setCreator(e.currentTarget.value)}
            type="text"
            id="creator"
            name="creator"
          />
        </div>

        <div>
          <button type="submit" disabled={error !== ""}>Add</button>
        </div>
        <div>
          <button
            type="reset"
            onClick={(e) => {
              setName("");
              setImage("");
              setSound("");
              setCreator("");
              setError("");
            }}
          >
            Clear
          </button>
        </div>
        {error !== "" && <div>{error}</div>}
      </form>
    </div>
  );
};

export default AddForm;
