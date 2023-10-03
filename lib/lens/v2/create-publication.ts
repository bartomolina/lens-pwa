import {
  MomokaPostRequest,
  PostOnMomokaDocument,
} from "@/graphql/v2/generated/graphql";
import { apolloClient } from "@/lib/apollo-client";

export const createPublication = async (request: MomokaPostRequest) => {
  console.log("create publication: creating publication");

  const result = await apolloClient.query({
    query: PostOnMomokaDocument,
    variables: {
      request,
    },
  });

  console.log("create publication:", result.data);

  return result.data.postOnMomoka;
};
