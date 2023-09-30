import {
  FeedRequest,
  PaginatedFeedResult,
  ProfileFeedDocument,
} from "@/graphql/v1/generated/graphql";
import { apolloClient } from "@/lib/apollo-client";

export const getFeed = async (request: FeedRequest) => {
  const result = await apolloClient.query({
    query: ProfileFeedDocument,
    variables: {
      request,
    },
  });

  return result.data?.feed as PaginatedFeedResult;
};
