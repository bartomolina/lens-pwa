import { Link, List, ListButton, ListInput, Navbar, Page } from "konsta/react";
import { Dispatch, SetStateAction } from "react";

import { useCreatePost } from "@/lib/lens/v1";

interface CreatePostProps {
  setPopupOpened: Dispatch<SetStateAction<boolean>>;
}

export function CreatePost({ setPopupOpened }: CreatePostProps) {
  const { mutate: createPost } = useCreatePost({
    onSuccess: () => console.log("post created"),
  });

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
          placeholder="What's happening?"
          inputClassName="!h-80 resize-none"
        />
        <ListInput label="Image" type="file" placeholder="aaaa" />
        <ListButton
          onClick={() =>
            createPost("ar://Xu37cbQd-fBiY8cykrp3-ShKNlk-AJqhkaoRL2F3n-w")
          }
        >
          Post
        </ListButton>
      </List>
    </Page>
  );
}
