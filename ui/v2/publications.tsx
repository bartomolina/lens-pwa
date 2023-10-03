import { Dispatch, SetStateAction } from "react";

import { Post, Quote } from "@/graphql/v2/generated/graphql";

import { Publication as PublicationCard } from "./publication";

interface PulibcationsProps {
  publications: Array<Post | Quote>;
  setPopupOpened: Dispatch<SetStateAction<boolean>>;
  popupOpened: boolean;
}

export function Publications({ publications }: PulibcationsProps) {
  console.log(publications);
  return (
    <div className="mb-28">
      {publications?.map((publication) => (
        <PublicationCard key={publication.id} publication={publication} />
      ))}
    </div>
  );
}
