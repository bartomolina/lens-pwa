import {
  AnyPublicationFragment,
  PaginatedResult,
  PostFragment,
  QuoteFragment,
} from "@lens-protocol/client";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import PullToRefresh from "react-simple-pull-to-refresh";

import { Loading } from "@/ui/common";
import { Publication as PublicationCard } from "@/ui/publication";

interface PulibcationsProps {
  publications: (PostFragment | QuoteFragment)[];
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<
    QueryObserverResult<PaginatedResult<AnyPublicationFragment>, unknown>
  >;
}

export function Publications({ publications, refetch }: PulibcationsProps) {
  return (
    <PullToRefresh
      onRefresh={refetch}
      refreshingContent={<Loading />}
      pullingContent={""}
    >
      <div className="mb-28">
        {publications?.map((publication) => (
          <PublicationCard key={publication.id} publication={publication} />
        ))}
      </div>
    </PullToRefresh>
  );
}
