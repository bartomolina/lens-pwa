import {
  PaginatedPublicationResult,
  PublicationsDocument,
  PublicationsQueryRequest,
} from "@/graphql/v1/generated/graphql";
import { apolloClient } from "@/lib/apollo-client";

export const getPublications = async (request: PublicationsQueryRequest) => {
  const result = await apolloClient.query({
    query: PublicationsDocument,
    variables: {
      request,
    },
  });

  return result.data?.publications as PaginatedPublicationResult;
};
