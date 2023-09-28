import { Link, List, ListButton, ListInput, Navbar, Page } from "konsta/react";
import { Dispatch, SetStateAction, useState } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { v4 as uuidv4 } from "uuid"; // eslint-disable-line import/no-unresolved

import { PublicationMainFocus } from "@/graphql/v1/generated/graphql";
import { APP_URL } from "@/lib/constants";
import { useCreatePublication, useDefaultProfile } from "@/lib/lens/v1";

interface CreatePostProps {
  setPopupOpened: Dispatch<SetStateAction<boolean>>;
}

export function CreatePost({ setPopupOpened }: CreatePostProps) {
  const [content, setContent] = useState("");
  const { data: defaultProfile } = useDefaultProfile();
  const { mutate: createPost } = useCreatePublication({
    onSuccess: () => console.log("post created"),
  });

  const handleCreatePost = () => {
    createPost({
      version: "2.0.0",
      metadata_id: uuidv4(),
      content,
      description: content,
      external_url: APP_URL,
      name: `Post by @${defaultProfile?.handle}}`,
      mainContentFocus: PublicationMainFocus.TextOnly,
      locale: "en-US",
      attributes: [],
    });
  };

  return (
    <Page>
      <Navbar
        title="New post"
        right={
          <Link navbar onClick={() => setPopupOpened(false)}>
            Close
          </Link>
        }
      />
      <List strongIos insetIos>
        <ListInput
          label="Content"
          type="textarea"
          value={content}
          onChange={(event_) => setContent(event_.target.value)}
          placeholder="What's happening?"
          inputClassName="!h-80 resize-none"
        />
        <ListInput label="Image" type="file" />
        <ListButton onClick={handleCreatePost}>Post</ListButton>
      </List>
    </Page>
  );
}
