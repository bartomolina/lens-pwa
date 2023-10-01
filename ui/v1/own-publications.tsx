import { useState } from "react";

import { useOwnPublications } from "@/lib/lens/v1";
import { Publications } from "@/ui/publications";

import { CreatePost } from "./create-post";

export function OwnPublications() {
  const { data: ownPublications } = useOwnPublications();
  const [popupOpened, setPopupOpened] = useState(false);

  return (
    <>
      {ownPublications && (
        <Publications
          publications={ownPublications.items}
          setPopupOpened={setPopupOpened}
          popupOpened={popupOpened}
        >
          <CreatePost setPopupOpened={setPopupOpened} />
        </Publications>
      )}
    </>
  );
}
