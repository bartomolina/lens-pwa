import { useQuery } from "@apollo/client";
import { useState } from "react";

import {
  Post,
  PublicationsDocument,
  PublicationType,
  Query,
} from "@/graphql/v2/generated/graphql";
import { ErrorMessage } from "@/ui/error-message";
import { Loading } from "@/ui/loading";
import { Publications } from "@/ui/v2/publications";

import { CreatePost } from "./create-post";

interface OwnPublicationsProps {
  profile: string;
}

export function OwnPublications({ profile }: OwnPublicationsProps) {
  const { data, refetch, loading, error } = useQuery<Query>(
    PublicationsDocument,
    {
      variables: {
        request: {
          where: {
            from: profile,
            publicationTypes: [PublicationType.Post],
          },
        },
      },
    }
  );
  const [popupOpened, setPopupOpened] = useState(false);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const ownPublications = data?.result.items;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      {ownPublications && (
        <Publications
          publications={ownPublications as Post[]}
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
