import {
  ProfilesDocument,
  ProfilesRequest,
} from "@/graphql/v2/generated/graphql";
import { apolloClient } from "@/lib/apollo-client";

export const getProfiles = async (request: ProfilesRequest) => {
  const result = await apolloClient.query({
    query: ProfilesDocument,
    variables: {
      request,
    },
  });

  return result.data.profiles;
};
