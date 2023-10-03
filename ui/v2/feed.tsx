import { useQuery } from "@apollo/client";
import { useState } from "react";

import {
  ExplorePublicationsDocument,
  ExplorePublicationsOrderByType,
  Query,
} from "@/graphql/v2/generated/graphql";
import { ErrorMessage } from "@/ui/error-message";
import { Loading } from "@/ui/loading";
import { Publications } from "@/ui/v2/publications";

export function Feed() {
  const { data, loading, error } = useQuery<Query>(
    ExplorePublicationsDocument,
    {
      variables: {
        request: {
          orderBy: ExplorePublicationsOrderByType.Latest,
        },
      },
    }
  );
  const [popupOpened, setPopupOpened] = useState(false);

  const publications = data?.explorePublications.items;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;

  if (!publications) {
    // eslint-disable-next-line unicorn/no-null
    return null;
  }

  return (
    <Publications
      publications={publications}
      setPopupOpened={setPopupOpened}
      popupOpened={popupOpened}
    />
  );
}
