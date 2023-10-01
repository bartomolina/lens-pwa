import { useState } from "react";

import { useFeed } from "@/lib/lens/v1";
import { Publications } from "@/ui/publications";

import { CreatePost } from "./create-post";

export function Feed() {
  const { data: feed } = useFeed();
  const [popupOpened, setPopupOpened] = useState(false);

  const publications = feed?.items.map((item) => item.root);

  return (
    <>
      {publications && (
        <Publications
          publications={publications}
          setPopupOpened={setPopupOpened}
          popupOpened={popupOpened}
        >
          <CreatePost setPopupOpened={setPopupOpened} />
        </Publications>
      )}
    </>
  );
}
