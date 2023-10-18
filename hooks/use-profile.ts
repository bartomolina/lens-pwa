import { useQuery } from "@tanstack/react-query";

import { lensClient, logout } from "@/lib/lens-client";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      console.log("hook:profile:start");
      try {
        const forProfileId = await lensClient.authentication.getProfileId();
        if (forProfileId) {
          const profile = await lensClient.profile.fetch({ forProfileId });
          console.log("hook:profile:result:", profile);
          return profile;
        }
      } catch (error) {
        console.log("hook:profile:error:", error);
        logout();
      }
      // eslint-disable-next-line unicorn/no-null
      return null;
    },
  });
};
