import { lensClient } from "@/lib/lens-client";
import { PublicationType } from "@lens-protocol/client";
import { useQuery } from "@tanstack/react-query";

interface ProfilePublicationsOptions {
  profileId: string;
}

export const useProfilePublications = ({
  profileId,
}: ProfilePublicationsOptions) => {
  return useQuery({
    queryKey: ["publications", profileId],
    queryFn: async () => {
      const publications = await lensClient.publication.fetchAll({
        where: {
          from: [profileId],
          publicationTypes: [PublicationType.Post],
        },
      });
      console.log("use profile publications:", publications);

      return publications;
    },
  });
};
