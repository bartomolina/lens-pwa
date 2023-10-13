import { PostFragment, QuoteFragment } from "@lens-protocol/client";

import { Publication as PublicationCard } from "@/ui/publication";

interface PulibcationsProps {
  publications: (PostFragment | QuoteFragment)[];
}

export function Publications({ publications }: PulibcationsProps) {
  return (
    <div className="mb-28">
      {publications?.map((publication) => (
        <PublicationCard key={publication.id} publication={publication} />
      ))}
    </div>
  );
}
