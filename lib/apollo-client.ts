import {
  ApolloClient,
  ApolloLink,
  type DefaultOptions,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

import { LENS_API } from "./constants";
import { getAuthenticationToken } from "./state";

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const httpLink = new HttpLink({
  uri: LENS_API,
  fetch,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    for (const { message, locations, path } of graphQLErrors)
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
          locations
        )}, Path: ${path}`
      );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// example how you can pass in the x-access-token into requests using `ApolloLink`
const authLink = new ApolloLink((operation, forward) => {
  const token = getAuthenticationToken();

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      "x-access-token": token ? `Bearer ${token}` : "",
    },
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});
