import { gql } from "@apollo/client";

export const AUTHORS = gql`
  query {
    allAuthors {
      name
      born
    }
  }
`;

export const BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String]
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation chnageBirthYear($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;

export const USER_AND_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
    me {
      username
      favoriteGenre
    }
  }
`;
