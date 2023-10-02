import {
  ApolloClient,
  ApolloLink,
  type DefaultOptions,
  from,
  fromPromise,
  HttpLink,
  InMemoryCache,
  toPromise,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import jwt_decode from "jwt-decode";

import { LENS_API } from "./constants";
import { JWT, refresh } from "./lens/v1/auth";
import {
  clearAuthenticationToken,
  getAuthenticationToken,
  getRefreshToken,
  setAuthenticationToken,
  setRefreshToken,
} from "./state";

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

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAuthenticationToken();
  const refreshToken = getRefreshToken();

  if (!accessToken || !refreshToken) {
    return forward(operation);
  }

  const expiringSoon = Date.now() >= jwt_decode<JWT>(accessToken)?.exp * 1000;
  const refreshExpired =
    Date.now() >= jwt_decode<JWT>(refreshToken)?.exp * 1000;

  if (refreshExpired) {
    clearAuthenticationToken();
    return forward(operation);
  }

  if (!expiringSoon) {
    operation.setContext({
      headers: {
        "x-access-token": accessToken ? `Bearer ${accessToken}` : "",
      },
    });

    return forward(operation);
  }

  return fromPromise(
    refresh().then((data) => {
      const accessToken = data?.accessToken;
      const refreshToken = data?.refreshToken;
      operation.setContext({
        headers: { "x-access-token": `Bearer ${accessToken}` },
      });

      setAuthenticationToken(accessToken);
      setRefreshToken(refreshToken);

      return toPromise(forward(operation));
    })
  );
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});
