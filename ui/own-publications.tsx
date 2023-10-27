import {
  Profile,
  PublicationType,
  usePublications,
} from "@lens-protocol/react-web";
import { useEffect } from "react";

import { ErrorMessage, Loading } from "@/ui/common";
import { CreatePost } from "@/ui/create-post";
import { Publications } from "@/ui/publications";

interface OwnPublicationsProps {
  profile: Profile;
}

export function OwnPublications({ profile }: OwnPublicationsProps) {
  const {
    data: publications,
    loading,
    prev,
    error,
  } = usePublications({
    where: { from: [profile.id], publicationTypes: [PublicationType.Post] },
  });

  useEffect(() => {
    console.log("me:publications:", publications);
  }, [publications]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      {publications && <Publications publications={publications} prev={prev} />}
      <CreatePost />
    </>
  );
}
