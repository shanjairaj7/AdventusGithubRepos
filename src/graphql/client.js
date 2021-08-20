import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Create the HTTP Link
const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
});

// Get the personal access token from the environment variable
const token = process.env.REACT_APP_TOKEN;

// Set the headers, so the user is authenticated
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: `bearer ${token}`,
    },
  };
});

// Set up Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
