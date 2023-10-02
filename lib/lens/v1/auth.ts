import axios from "axios";
import jwt_decode from "jwt-decode";

import {
  AuthenticateDocument,
  ChallengeDocument,
  ChallengeRequest,
  SignedAuthChallenge,
} from "@/graphql/v1/generated/graphql";
import { apolloClient } from "@/lib/apollo-client";
import { LENS_API } from "@/lib/constants";
import { getAuthenticationToken,getRefreshToken } from "@/lib/state";

const REFRESH_MUTATION_QUERY = `
mutation refresh($request: RefreshRequest!) {
  refresh(request: $request) {
    accessToken
    refreshToken
  }
}`;

export interface JWT {
  name: string;
  exp: number;
}

export const generateChallenge = async (request: ChallengeRequest) => {
  const result = await apolloClient.query({
    query: ChallengeDocument,
    variables: {
      request,
    },
  });

  return result.data.challenge;
};

export const authenticate = async (request: SignedAuthChallenge) => {
  const result = await apolloClient.mutate({
    mutation: AuthenticateDocument,
    variables: {
      request,
    },
  });

  return result.data?.authenticate;
};

export const isAuthenticated = () => {
  const accessToken = getAuthenticationToken();
  const refreshToken = getRefreshToken();

  if (refreshToken) {
    const refreshJWT = jwt_decode<JWT>(refreshToken);
    const refreshTokenIsValid = Date.now() <= refreshJWT?.exp * 1000;
    return accessToken !== undefined && refreshTokenIsValid;
  }
  return false;
};

export const refresh = async () => {
  const result = await axios.post(
    LENS_API,
    {
      operationName: "refresh",
      query: REFRESH_MUTATION_QUERY,
      variables: { request: { refreshToken: getRefreshToken() } },
    },
    { headers: { "Content-Type": "application/json" } }
  );

  return result.data?.data?.refresh;
};
