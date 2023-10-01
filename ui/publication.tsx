import { Card } from "konsta/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Publication } from "@/graphql/v1/generated/graphql";
import { imageKit, sanitizedStorageUrl } from "@/utils/images";
import { getTimeAgo } from "@/utils/time";

interface PublicationsProps {
  publication: Publication;
}

export function Publication({ publication }: PublicationsProps) {
  return (
    <Card key={publication.id} outline>
      {publication.metadata.media &&
        publication.metadata.media[0] &&
        publication.metadata.media[0].original.mimeType.includes("image") && (
          <div
            className="mb-4 flex h-48 items-end bg-cover bg-center p-4 text-white material:rounded-xl material:text-[22px] ios:-mx-4 ios:-mt-4 ios:font-bold"
            style={{
              backgroundImage: `url(${imageKit(
                sanitizedStorageUrl(publication.metadata.media[0].original.url)
              )})`,
            }}
          />
        )}
      <div>
        <div className="text-sm font-semibold">
          {publication.profile.handle}
        </div>
        <div className="mb-3 text-sm text-gray-500">
          {getTimeAgo(new Date(publication.createdAt).getTime())}
        </div>
      </div>
      <div className="prose-sm prose my-2 break-words text-base-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {publication.metadata.content}
        </ReactMarkdown>
      </div>
    </Card>
  );
}
