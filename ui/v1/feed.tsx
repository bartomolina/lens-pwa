import { useQuery } from "@apollo/client";
import { useState } from "react";

import {
  Profile,
  ProfileFeedDocument,
  Query,
} from "@/graphql/v1/generated/graphql";
import { ErrorMessage } from "@/ui/error-message";
import { Loading } from "@/ui/loading";
import { Publications } from "@/ui/publications";
import { CreatePost } from "@/ui/v1/create-post";

interface FeedProps {
  profile: Profile;
}
export function Feed({ profile }: FeedProps) {
  const { data, refetch, loading, error } = useQuery<Query>(
    ProfileFeedDocument,
    {
      variables: {
        request: {
          profileId: profile.id,
        },
      },
    }
  );
  const [popupOpened, setPopupOpened] = useState(false);

  const publications = data?.feed.items.map((item) => item.root);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      {publications && (
        <Publications
          publications={publications}
          setPopupOpened={setPopupOpened}
          popupOpened={popupOpened}
        >
          <CreatePost setPopupOpened={setPopupOpened} refetch={refetch} />
        </Publications>
      )}
    </>
  );
}
