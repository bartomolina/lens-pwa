import { PostFragment, QuoteFragment } from "@lens-protocol/client";
import { Card } from "konsta/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { imageKit, sanitizedStorageUrl } from "@/utils/images";
import { getTimeAgo } from "@/utils/time";

interface PublicationsProps {
  publication: PostFragment | QuoteFragment;
}

export function Publication({ publication }: PublicationsProps) {
  const asset =
    "asset" in publication.metadata
      ? publication.metadata.asset ?? publication.metadata.asset
      : undefined;

  const cover =
    asset && "image" in asset
      ? asset.image.raw.uri
      : asset && "audio" in asset
      ? asset.cover?.raw.uri
      : undefined;

  return (
    <Card key={publication.id} outline>
      {cover && (
        <div
          className="mb-4 flex h-48 items-end bg-cover bg-center p-4 text-white material:rounded-xl material:text-[22px] ios:-mx-4 ios:-mt-4 ios:font-bold"
          style={{
            backgroundImage: `url(${imageKit(sanitizedStorageUrl(cover))})`,
          }}
        />
      )}
      <div>
        <div className="text-sm font-semibold">{publication.by.handle}</div>
        <div className="mb-3 text-sm text-gray-500">
          {getTimeAgo(new Date(publication.createdAt).getTime())}
        </div>
      </div>
      <div className="prose dark:text-white my-2 break-words">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {"content" in publication.metadata
            ? publication.metadata.content
            : undefined}
        </ReactMarkdown>
      </div>
    </Card>
  );
}
