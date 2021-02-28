import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { USER_AND_BOOKS } from "../queries";

const Recommendations = (props) => {
  const [books, setBooks] = useState([]);

  const { loading, error, data } = useQuery(USER_AND_BOOKS, {
    onCompleted: () => {
      setBooks(
        data.allBooks.filter((book) =>
          book.genres.includes(data.me.favoriteGenre)
        )
      );
    },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>
      <div>
        {data.me.favoriteGenre ? (
          <p>
            Books in your favorite genre{" "}
            <strong>{data.me.favoriteGenre}</strong>
          </p>
        ) : null}
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
