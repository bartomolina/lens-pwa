import { PostFragment } from "@lens-protocol/client";
import { useState } from "react";

import { useProfilePublications } from "@/hooks/use-profile-publications";
import { ErrorMessage } from "@/ui/error-message";
import { Loading } from "@/ui/loading";
import { Publications } from "@/ui/publications";

import { CreatePost } from "@/ui/create-post";

interface OwnPublicationsProps {
  profileId: string;
}

export function OwnPublications({ profileId }: OwnPublicationsProps) {
  const {
    data: publications,
    refetch,
    isLoading,
    error,
  } = useProfilePublications({ profileId });
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
