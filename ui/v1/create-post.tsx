import { Link, List, ListButton, ListInput, Navbar, Page } from "konsta/react";
import { Dispatch, SetStateAction, useState } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { v4 as uuidv4 } from "uuid"; // eslint-disable-line import/no-unresolved

import { PublicationMainFocus } from "@/graphql/v1/generated/graphql";
import { upload } from "@/lib/bundlr";
import { APP_URL } from "@/lib/constants";
import { useCreatePublication, useDefaultProfile } from "@/lib/lens/v1";

function toBuffer(arrayBuffer: ArrayBuffer) {
  const buffer = Buffer.alloc(arrayBuffer.byteLength);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i];
  }
  return buffer;
}

interface CreatePostProps {
  setPopupOpened: Dispatch<SetStateAction<boolean>>;
}

export function CreatePost({ setPopupOpened }: CreatePostProps) {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File>();
  const { data: defaultProfile } = useDefaultProfile();
  const { mutate: createPost } = useCreatePublication({
    onSuccess: () => console.log("post created"),
  });

  const handleCreatePost = async (event_: React.FormEvent<HTMLFormElement>) => {
    event_.preventDefault();

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      if (arrayBuffer instanceof ArrayBuffer) {
        const imageURI = await upload(toBuffer(arrayBuffer), file.type);
        createPost({
          version: "2.0.0",
          metadata_id: uuidv4(),
          content,
          description: content,
          external_url: APP_URL,
          image: `ipfs://${imageURI}`,
          name: `Post by @${defaultProfile?.handle}}`,
          mainContentFocus: PublicationMainFocus.Image,
          media: [
            {
              item: `ipfs://${imageURI}`,
              type: file.type,
            },
          ],
          locale: "en-US",
          attributes: [],
        });
      }
    } else {
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
    }
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
        <form onSubmit={handleCreatePost}>
          <ListInput
            label="Content"
            type="textarea"
            value={content}
            onChange={(event_) => setContent(event_.target.value)}
            placeholder="What's happening?"
            inputClassName="!h-80 resize-none"
          />
          <ListInput
            label="Image"
            type="file"
            accept="image/*"
            onChange={(event_) => setFile(event_.target.files?.[0])}
          />
          <ListButton type="submit">Post</ListButton>
        </form>
      </List>
    </Page>
  );
}
