const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
//const fetch = require('node-fetch');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }
  enum CharacterStatus{
    Alive
    Dead
    unknown
  }
  type Character {
    name: String
    id: ID
    status: CharacterStatus
    image: String
    gender: String
    url: String
    created: String
  }
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    character(id:ID):Character
    characters:[Character]
  }
`;
const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },

  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

// Resolvers define how to fetch the types defined in your schema.

// This resolver retrieves books from the "books" array above.

const resolvers = {
  Query: {
    books: () => books,
    characters: () => fetchCharacters(),
    character: (parents, args) => {
      const { id } = args;

      return fetchCharacterById({ id });
    },
  },
};

function fetchEpisodes() {
  // More info about the fetch function? https://github.com/bitinn/node-fetch#json
  return fetch('https://rickandmortyapi.com/api/episode/')
    .then((res) => res.json())
    .then((json) => json.results);
}

function fetchEpisodeById(id) {
  return fetch('https://rickandmortyapi.com/api/episode/' + id)
    .then((res) => res.json())
    .then((json) => json);
}

function fetchEpisodeByUrl(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((json) => json);
}

function fetchCharacters() {
  return fetch('https://rickandmortyapi.com/api/character/')
    .then((res) => res.json())
    .then((json) => json.results);
}

function fetchCharacterById({ id }) {
  return fetch('https://rickandmortyapi.com/api/character/' + id)
    .then((res) => res.json())
    .then((json) => json);
}

function fetchCharacterByUrl(url) {
  // More info about the fetch function? https://github.com/bitinn/node-fetch#json
  return fetch(url)
    .then((res) => res.json())
    .then((json) => json);
}
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const listenServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
};
listenServer();
// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });
