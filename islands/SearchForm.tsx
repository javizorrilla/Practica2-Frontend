import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";
import { JSX } from "preact/jsx-runtime";

export const SearchForm: FunctionComponent = () => {
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string>("");

  const submitHandler = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    const errorMsg: string[] = [];
    if (name === "") errorMsg.push("You must provide a name");
    if (errorMsg.length > 0) setError(errorMsg.join(" | "));
    else {
      setError("");
      e.currentTarget.submit();
    }
  };

  return (
    <div>
      <h2>Pokemon Searcher</h2>
      <p>Which pokemon's name do you want to search?</p>
      <form action="/pokemonSearch" method="GET" onSubmit={submitHandler}>
        <div>
          <label for="name">Name:</label>
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
          <button type="submit" disabled={error !== ""}>Search</button>
        </div>
        <div>
          <button
            type="reset"
            onClick={(e) => {
              setName("");
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

export default SearchForm;