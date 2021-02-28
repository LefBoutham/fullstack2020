import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_AUTHOR } from "../queries";

const SetBirthYear = ({ authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [changeBorn] = useMutation(UPDATE_AUTHOR);

  const submit = async (event) => {
    event.preventDefault();

    changeBorn({ variables: { name, born } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <select
            value={name}
            onChange={(event) => setName(event.target.value)}
          >
            <option value="Choose author">Choose author</option>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  );
};

export default SetBirthYear;
