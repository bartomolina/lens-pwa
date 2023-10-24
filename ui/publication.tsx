import { AnyPublication } from "@lens-protocol/react-web";
import { Card } from "konsta/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { imageKit, sanitizedStorageUrl } from "@/utils/images";
import { getTimeAgo } from "@/utils/time";

interface PublicationsProps {
  publication: AnyPublication;
}

export function Publication({ publication }: PublicationsProps) {
  let cover;
  if ("metadata" in publication) {
    const asset =
      "asset" in publication.metadata
        ? publication.metadata.asset ?? publication.metadata.asset
        : undefined;

    if (asset && "image" in asset) {
      cover = asset.image.raw.uri;
    }
    if (asset && "audio" in asset) {
      cover = asset.cover?.raw.uri;
    }
  }

  return (
    <Card outline>
      {cover && (
        <div
          className="mb-4 flex h-48 items-end bg-cover bg-center p-4 text-white material:rounded-xl material:text-[22px] ios:-mx-4 ios:-mt-4 ios:font-bold"
          style={{
            backgroundImage: `url(${imageKit(sanitizedStorageUrl(cover))})`,
          }}
        />
      )}
      <div>
        <div className="text-sm font-semibold">
          {publication.by.handle?.fullHandle}
        </div>
        <div className="mb-3 text-sm text-gray-500">
          {getTimeAgo(new Date(publication.createdAt).getTime())}
        </div>
      </div>
      {"metadata" in publication && (
        <div className="prose my-2 break-words dark:text-white">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {"content" in publication.metadata
              ? publication.metadata.content
              : undefined}
          </ReactMarkdown>
        </div>
      )}
    </Card>
  );
}
