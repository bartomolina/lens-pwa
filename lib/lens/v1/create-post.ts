import {
  CreateDataAvailabilityPostRequest,
  CreateDataAvailabilityPostViaDispatcherDocument,
} from "@/graphql/v1/generated/graphql";
import { apolloClient } from "@/lib/apollo-client";

export const createPost = async (
  request: CreateDataAvailabilityPostRequest
) => {
  console.log("create post: creating post");

  const result = await apolloClient.query({
    query: CreateDataAvailabilityPostViaDispatcherDocument,
    variables: {
      request,
    },
  });

  console.log("create post:", result.data);

  return result.data.createDataAvailabilityPostViaDispatcher;
};
