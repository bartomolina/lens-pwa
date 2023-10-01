import { useQuery } from "@tanstack/react-query";

import { PublicationTypes } from "@/graphql/v1/generated/graphql";

import { getPublications } from "./get-publications";
import { useDefaultProfile } from "./use-default-profile";

export const useOwnPublications = () => {
  const { data: defaultProfile } = useDefaultProfile();

  return useQuery({
    enabled: defaultProfile?.id != undefined,
    queryKey: ["publications", defaultProfile?.id],
    queryFn: async () => {
      const result = await getPublications({
        profileId: defaultProfile?.id,
        publicationTypes: [PublicationTypes.Post],
      });
      console.log("use publications:", result);

      return result;
    },
  });
};
