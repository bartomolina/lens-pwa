import { useQuery } from "@tanstack/react-query";

import { lensClient } from "@/lib/lens-client";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const isAuthenticated = await lensClient.authentication.isAuthenticated();
      if (isAuthenticated) {
        const forProfileId = await lensClient.authentication.getProfileId();

        if (forProfileId) {
          const profile = await lensClient.profile.fetch({ forProfileId });
          return profile;
        }
      }
      // eslint-disable-next-line unicorn/no-null
      return { id: "false" };
    },
  });
};
