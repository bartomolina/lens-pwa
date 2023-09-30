// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Plus } from "framework7-icons/react";
import { Card, Fab, Popup } from "konsta/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Publication } from "@/graphql/v1/generated/graphql";
import { imageKit, sanitizedStorageUrl } from "@/utils/images";
import { getTimeAgo } from "@/utils/time";

import { CreatePost } from "./create-post";

interface PulibcationsProps {
  publications: Array<Publication>;
}

export function Publications({ publications }: PulibcationsProps) {
  const [popupOpened, setPopupOpened] = useState(false);

  return (
    <div className="mb-28">
      <Fab
        className="fixed z-20 right-4-safe bottom-28-safe"
        icon={<Plus />}
        onClick={() => setPopupOpened(true)}
      />
      {publications?.map((publication) => (
        <Card key={publication.id} outline>
          {publication.metadata.media &&
            publication.metadata.media[0] &&
            publication.metadata.media[0].original.mimeType.includes(
              "image"
            ) && (
              <div
                className="mb-4 flex h-48 items-end bg-cover bg-center p-4 text-white material:rounded-xl material:text-[22px] ios:-mx-4 ios:-mt-4 ios:font-bold"
                style={{
                  backgroundImage: `url(${imageKit(
                    sanitizedStorageUrl(
                      publication.metadata.media[0].original.url
                    )
                  )})`,
                }}
              />
            )}
          <div>
            <div className="font-semibold">{publication.profile.handle}</div>
            <div className="mb-3 text-gray-500">
              {getTimeAgo(new Date(publication.createdAt).getTime())}
            </div>
          </div>
          <div className="prose-sm prose my-2 break-words text-lg text-base-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {publication.metadata.content}
            </ReactMarkdown>
          </div>
        </Card>
      ))}
      <Popup opened={popupOpened} onBackdropClick={() => setPopupOpened(false)}>
        <CreatePost setPopupOpened={setPopupOpened} />
      </Popup>
    </div>
  );
}
