import {
  Profile,
  PublicationType,
  usePublications,
} from "@lens-protocol/react-web";

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
    hasMore,
    prev,
    next,
    error,
  } = usePublications({
    where: { from: [profile.id], publicationTypes: [PublicationType.Post] },
  });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      {publications && (
        <Publications
          publications={publications}
          hasMore={hasMore}
          prev={prev}
          next={next}
        />
      )}
      <CreatePost prev={prev} />
    </>
  );
}
