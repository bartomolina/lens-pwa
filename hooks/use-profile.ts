import { useQuery } from "@tanstack/react-query";

import { lensClient } from "@/lib/lens-client";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const forProfileId = await lensClient.authentication.getProfileId();

      if (forProfileId) {
        const profile = await lensClient.profile.fetch({ forProfileId });
        return profile;
      } else if (forProfileId === null) {
        return forProfileId;
      }
    },
  });
};
