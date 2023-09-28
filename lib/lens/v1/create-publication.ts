import {
  CreateDataAvailabilityPostRequest,
  CreateDataAvailabilityPostViaDispatcherDocument,
} from "@/graphql/v1/generated/graphql";
import { apolloClient } from "@/lib/apollo-client";

export const createPublication = async (
  request: CreateDataAvailabilityPostRequest
) => {
  console.log("create publication: creating publication");

  const result = await apolloClient.query({
    query: CreateDataAvailabilityPostViaDispatcherDocument,
    variables: {
      request,
    },
  });

  console.log("create publication:", result.data);

  return result.data.createDataAvailabilityPostViaDispatcher;
};
