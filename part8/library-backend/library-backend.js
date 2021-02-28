const { ApolloServer, AuthenticationError, gql } = require("apollo-server");
const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const { PubSub } = require("apollo-server");
const pubsub = new PubSub();

const JWT_SECRET = "SECRET_KEY";

const MONGODB_URI =
  "mongodb+srv://fullstack:fullstack@cluster1.cy6i5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String]
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Subscription {
    bookAdded: Book!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    me: async (root, args, context) => {
      return context.currentUser;
    },
    bookCount: async () => await Book.find({}).length,
    authorCount: async () => await Author.find({}).length,
    allBooks: async (root, args) => {
      let books = await Book.find({}).populate("author");

      if (args.genre && args.author) {
        return books
          .filter((book) => book.genres.includes(args.genre))
          .filter((book) => book.author === args.author);
      }

      if (!args.genre && !args.author) {
        return books;
      }

      if (args.genre && !args.author) {
        return books.filter((book) => book.genres.includes(args.genre));
      }

      if (!args.genre && args.author) {
        return books.filter((book) => book.author === args.author);
      }
    },
    allAuthors: async () => {
      let authors = await Author.find({});
      return authors;
    },
  },
  Book: {
    title: (root) => root.title,
    published: (root) => root.published,
    author: (root) => root.author,
    genres: (root) => root.genres,
  },
  Author: {
    name: (root) => root.name,
    bookCount: async (root) => {
      let books = await Book.find({});
      let bookCount = 0;

      books.forEach((book) =>
        book.author === root.name ? bookCount++ : bookCount
      );

      return bookCount;
    },
  },
  Mutation: {
    createUser: (root, args) => {
      if (args.username < 3) {
        throw new UserInputError("username too short");
      }

      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      if (args.username < 3) {
        throw new UserInputError("username too short");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.author });

      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres,
      });

      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      const finalBook = {
        title: args.title,
        published: args.published,
        author: args.author,
        genres: args.genres,
      };

      pubsub.publish("BOOK_ADDED", { bookAdded: finalBook });

      return finalBook;
    },
    editAuthor: async (root, args, context) => {
      let authors = await Author.find({});

      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      if (authors.some((author) => author.name === args.name) === false) {
        return null;
      }

      let modifiedAuthor = authors.find((author) => author.name === args.name);
      modifiedAuthor.born = args.setBornTo;

      try {
        await Author.findByIdAndUpdate(modifiedAuthor._id, modifiedAuthor, {
          overwrite: true,
        });
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return modifiedAuthor;
    },
  },
  Subscription: {
    bookAdded: { subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]) },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id).populate(
        "friends"
      );

      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
