import { ExplorePublicationsOrderByType } from "@lens-protocol/client";
import { useQuery } from "@tanstack/react-query";

import { lensClient } from "@/lib/lens-client";

export const useExplorePublications = () => {
  return useQuery({
    queryKey: ["explore"],
    queryFn: async () => {
      const publications = await lensClient.explore.publications({
        orderBy: ExplorePublicationsOrderByType.Latest,
      });
      console.log("use explore publications:", publications);

      return publications;
    },
  });
};
