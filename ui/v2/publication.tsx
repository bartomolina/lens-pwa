import { Card } from "konsta/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Post, Quote } from "@/graphql/v2/generated/graphql";
import { imageKit, sanitizedStorageUrl } from "@/utils/images";
import { getTimeAgo } from "@/utils/time";

interface PublicationsProps {
  publication: Post | Quote;
}

export function Publication({ publication }: PublicationsProps) {
  const media =
    "media" in publication.metadata
      ? (publication.metadata.media
        ? publication.metadata.media[0]
        : undefined)
      : undefined;

  console.log(publication);
  return (
    <Card key={publication.id} outline>
      {media &&
        "image" in media &&
        media.image.raw.mimeType.includes("image") && (
          <div
            className="mb-4 flex h-48 items-end bg-cover bg-center p-4 text-white material:rounded-xl material:text-[22px] ios:-mx-4 ios:-mt-4 ios:font-bold"
            style={{
              backgroundImage: `url(${imageKit(
                sanitizedStorageUrl(media.image.raw.uri)
              )})`,
            }}
          />
        )}
      <div>
        <div className="text-sm font-semibold">{publication.by.handle}</div>
        <div className="mb-3 text-sm text-gray-500">
          {getTimeAgo(new Date(publication.createdAt).getTime())}
        </div>
      </div>
      <div className="prose my-2 break-words">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {"content" in publication.metadata && publication.metadata.content}
        </ReactMarkdown>
      </div>
    </Card>
  );
}
