import { useQuery } from "@tanstack/react-query";

import { lensClient } from "@/lib/lens-client";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      console.log("test:fetching");
      const forProfileId = await lensClient.authentication.getProfileId();
      console.log("test:fetched");

      if (forProfileId) {
        console.log(`test:exist ${forProfileId}`);
        const profile = await lensClient.profile.fetch({ forProfileId });
        console.log("test:returning");
        return profile;
      }
      // eslint-disable-next-line unicorn/no-null
      return null;
    },
  });
};
