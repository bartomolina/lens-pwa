// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Plus } from "framework7-icons/react";
import { Fab, Popup } from "konsta/react";
import { Dispatch, ReactNode, SetStateAction } from "react";

import { Publication } from "@/graphql/v1/generated/graphql";

import { Publication as PublicationCard } from "./publication";

interface PulibcationsProps {
  publications: Array<Publication>;
  setPopupOpened: Dispatch<SetStateAction<boolean>>;
  popupOpened: boolean;
  children: ReactNode;
}

export function Publications({
  publications,
  setPopupOpened,
  popupOpened,
  children,
}: PulibcationsProps) {
  return (
    <div className="mb-28">
      <Fab
        className="fixed z-20 right-4-safe bottom-28-safe"
        icon={<Plus />}
        onClick={() => setPopupOpened(true)}
      />
      {publications?.map((publication) => (
        <PublicationCard key={publication.id} publication={publication} />
      ))}
      <Popup opened={popupOpened} onBackdropClick={() => setPopupOpened(false)}>
        {children}
      </Popup>
    </div>
  );
}
