import { AnyPublication } from "@lens-protocol/react-web";
import InfiniteScroll from "react-infinite-scroller";
import PullToRefresh from "react-simple-pull-to-refresh";

import { Loading } from "@/ui/common";
import { Publication as PublicationCard } from "@/ui/publication";

interface PulibcationsProps {
  publications: AnyPublication[];
  hasMore: boolean;
  prev: () => Promise<void>;
  next: () => Promise<void>;
}

export function Publications({
  publications,
  hasMore,
  prev,
  next,
}: PulibcationsProps) {
  return (
    <PullToRefresh
      onRefresh={prev}
      refreshingContent={<Loading />}
      pullingContent={""}
    >
      <div className="mb-28">
        <InfiniteScroll
          pageStart={0}
          loadMore={next}
          hasMore={hasMore}
          loader={<Loading key={0} />}
          useWindow={false}
        >
          {publications?.map((publication) => (
            <PublicationCard key={publication.id} publication={publication} />
          ))}
        </InfiniteScroll>
      </div>
    </PullToRefresh>
  );
}
