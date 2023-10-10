import { lensClient } from "@/lib/lens-client";
import { ExplorePublicationsOrderByType } from "@lens-protocol/client";
import { useQuery } from "@tanstack/react-query";

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
