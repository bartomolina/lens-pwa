import { ProfileFragment, PublicationType } from "@lens-protocol/client";
import { useQuery } from "@tanstack/react-query";

import { lensClient } from "@/lib/lens-client";

interface ProfilePublicationsOptions {
  profile: ProfileFragment;
}

export const useProfilePublications = ({
  profile,
}: ProfilePublicationsOptions) => {
  return useQuery({
    queryKey: ["publications", profile.id],
    queryFn: async () => {
      const publications = await lensClient.publication.fetchAll({
        where: {
          from: [profile.id],
          publicationTypes: [PublicationType.Post],
        },
      });
      console.log("use profile publications:", publications);

      return publications;
    },
  });
};
