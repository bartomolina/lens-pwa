import { Page } from "konsta/react";
import { Dispatch, SetStateAction } from "react";

interface CreatePostProps {
  setPopupOpened: Dispatch<SetStateAction<boolean>>;
}

export function CreatePost({ setPopupOpened }: CreatePostProps) {
  return <Page>test</Page>;
}
