import { AnyPublication } from "@lens-protocol/react-web";
import PullToRefresh from "react-simple-pull-to-refresh";

import { Loading } from "@/ui/common";
import { Publication as PublicationCard } from "@/ui/publication";

interface PulibcationsProps {
  publications: AnyPublication[];
  prev: () => Promise<void>;
}

export function Publications({ publications, prev }: PulibcationsProps) {
  return (
    <PullToRefresh
      onRefresh={prev}
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
