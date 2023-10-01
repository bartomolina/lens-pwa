import { useQuery } from "@apollo/client";
import { useState } from "react";

import {
  Profile,
  PublicationsDocument,
  PublicationTypes,
  Query,
} from "@/graphql/v1/generated/graphql";
import { ErrorMessage } from "@/ui/error-message";
import { Loading } from "@/ui/loading";
import { Publications } from "@/ui/publications";

import { CreatePost } from "./create-post";

interface OwnPublicationsProps {
  profile: Profile;
}

export function OwnPublications({ profile }: OwnPublicationsProps) {
  const { data, loading, error } = useQuery<Query>(PublicationsDocument, {
    variables: {
      request: {
        profileId: profile.id,
        publicationTypes: [PublicationTypes.Post],
      },
    },
  });
  const [popupOpened, setPopupOpened] = useState(false);

  const ownPublications = data?.publications;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;

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
