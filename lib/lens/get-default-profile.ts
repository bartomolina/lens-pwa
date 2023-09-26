import {
  DefaultProfileDocument,
  DefaultProfileRequest,
} from "@/graphql/generated/graphql";
import { apolloClient } from "@/lib/apollo-client";

export const getDefaultProfile = async (request: DefaultProfileRequest) => {
  const result = await apolloClient.query({
    query: DefaultProfileDocument,
    variables: {
      request,
    },
  });

  return result.data.defaultProfile;
};
