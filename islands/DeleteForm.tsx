import { useState } from "preact/hooks";
import { FunctionComponent, JSX } from "preact";
import { Pokemon } from "../types.ts";

type PokemonProps = {
  pokemon: Pokemon;
};

export const DeleteForm: FunctionComponent<PokemonProps> = (props) => {
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [creator, setCreator] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const submitHandler = async (
    e: JSX.TargetedEvent<HTMLFormElement, Event>,
  ) => {
    e.preventDefault();
    const errorMsg: string[] = [];
    if (name === "") errorMsg.push("You must provide a name");
    if (creator === "") errorMsg.push("You must provide a creator");

    if (errorMsg.length > 0) setError(errorMsg.join(" | "));
    else {
      setError("");
      setShowModal(true);
    }
  };

  const handleDeleteModal = async () => {
    try {
      const response = await fetch(`deletePokemon/${name}`, {
        method: "DELETE",
        body: JSON.stringify({
          name: name,
          creator: creator,
        }),
      });

      if (response.status === 200) {
        console.log("Pokemon deleted successfully");
        setError("");
        setShowModal(false);
      } else {
        setError("Status code: " + response.status);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      setError("Failed to delete pokemon");
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h2>Delete Pokemon: {name}</h2>
        <div>
          <label for="name">Name</label>
        </div>
        <div>
          <input
            onInput={(e) => setName(e.currentTarget.value)}
            type="text"
            id="name"
            value={name}
          />
        </div>

        <div>
          <label for="creator">Creator</label>
        </div>
        <div>
          <input
            onInput={(e) => setCreator(e.currentTarget.value)}
            type="text"
            id="creator"
            value={creator}
          />
        </div>

        <div>
          <button type="submit" disabled={error !== ""}>Delete</button>
        </div>

        <div>
          <button
            type="reset"
            onClick={(e) => {
              setName("");
              setCreator("");
              setError("");
            }}
          >
            Clear
          </button>
        </div>
        {error !== "" && <div>{error}</div>}
      </form>

      {showModal &&
        (
          <div>
            <div>
              <h2>Are you sure you want to delete "{name}"?</h2>
              <button onClick={handleDeleteModal}>Yes</button>
              <button onClick={(e) => setShowModal(false)}>No</button>
            </div>
          </div>
        )}
    </div>
  );
};

export default DeleteForm;
