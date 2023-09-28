// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { v4 as uuidv4 } from "uuid"; // eslint-disable-line import/no-unresolved

import {
  CreateDataAvailabilityPostRequest,
  CreateDataAvailabilityPostViaDispatcherDocument,
  PublicationMainFocus,
} from "@/graphql/v1/generated/graphql";
import { upload } from "@/lib/bundlr";

export const createPost = async (
  request: CreateDataAvailabilityPostRequest
) => {
  console.log("create post: creating post");

  const result = await upload({ data: uuidv4() });

  // const result = await uploadIpfs({
  //   version: "2.0.0",
  //   metadata_id: uuidv4(),
  //   content: "content",
  //   locale: "en",
  //   mainContentFocus: PublicationMainFocus.TextOnly,
  //   description: "content",
  //   name: "title",
  // });

  // console.log(result);
  // const result = await apolloClient.query({
  //   query: CreateDataAvailabilityPostViaDispatcherDocument,
  //   variables: {
  //     request,
  //   },
  // });

  // console.log("create post:", result.data);

  // return result.data.createDataAvailabilityPostViaDispatcher;

  return result;
};
