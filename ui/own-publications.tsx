import { PostFragment, ProfileFragment } from "@lens-protocol/client";
import { useState } from "react";

import { useProfilePublications } from "@/hooks/use-profile-publications";
import { ErrorMessage, Loading } from "@/ui/common";
import { CreatePost } from "@/ui/create-post";
import { Publications } from "@/ui/publications";

interface OwnPublicationsProps {
  profile: ProfileFragment;
}

export function OwnPublications({ profile }: OwnPublicationsProps) {
  const {
    data: publications,
    refetch,
    isLoading,
    error,
  } = useProfilePublications({ profile });
  const [popupOpened, setPopupOpened] = useState(false);

  if (isLoading) return <Loading />;
  if (error instanceof Error) return <ErrorMessage message={error.message} />;

  return (
    <>
      {publications && (
        <Publications
          publications={publications.items as PostFragment[]}
          setPopupOpened={setPopupOpened}
          popupOpened={popupOpened}
        />
      )}
      <CreatePost
        setPopupOpened={setPopupOpened}
        popupOpened={popupOpened}
        refetch={refetch}
      />
    </>
  );
}