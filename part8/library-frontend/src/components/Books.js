import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { BOOKS } from "../queries";

const Books = (props) => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreTitle, setGenreTitle] = useState(null);

  const { loading, error, data } = useQuery(BOOKS, {
    onCompleted: () => {
      setBooks(data.allBooks);
      const allGenresList = [].concat.apply(
        [],
        data.allBooks.map((book) => {
          return book.genres.map((genre) => genre);
        })
      );
      const allGenres = allGenresList.filter(
        (item, index) => allGenresList.indexOf(item) === index
      );
      setGenres(allGenres);
    },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  if (!props.show) {
    return null;
  }

  const filterByGenre = async (genre) => {
    if (genre === "all") {
      setBooks(data.allBooks);
      setGenreTitle(null);
    } else {
      const filteredBooks = data.allBooks.filter((book) =>
        book.genres.includes(genre)
      );
      setBooks(filteredBooks);
      setGenreTitle(genre);
    }
  };

  return (
    <div>
      <h2>books</h2>
      <div>
        {genreTitle ? (
          <p>
            In genre <strong>{genreTitle}</strong>
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
      <div style={{ paddingTop: "20px" }}>
        {genres.map((genre) => (
          <button key={genre} onClick={() => filterByGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => filterByGenre("all")}>All genres</button>
      </div>
    </div>
  );
};

export default Books;
