import React from "react";
import { useQuery } from "@apollo/client";
import SetBirthYear from "./SetBirthYear";
import { AUTHORS } from "../queries";

const Authors = (props) => {
  const result = useQuery(AUTHORS, {
    pollInterval: 2000,
  });

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (!props.show) {
    return null;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token ? <SetBirthYear authors={authors} /> : null}
    </div>
  );
};

export default Authors;
