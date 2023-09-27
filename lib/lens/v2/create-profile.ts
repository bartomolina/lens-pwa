import {
  CreateProfileWithHandleDocument,
  CreateProfileWithHandleRequest,
} from "@/graphql/v2/generated/graphql";
import { apolloClient } from "@/lib/apollo-client";

export const createProfile = async (
  request: CreateProfileWithHandleRequest
) => {
  console.log("create profile: creating profile");

  const result = await apolloClient.query({
    query: CreateProfileWithHandleDocument,
    variables: {
      request,
    },
  });

  console.log("create profile:", result.data);

  return result.data.createProfileWithHandle;
};
