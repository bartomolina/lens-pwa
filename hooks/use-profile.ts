import { useQuery } from "@tanstack/react-query";

import { lensClient } from "@/lib/lens-client";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const forProfileId = await lensClient.authentication.getProfileId();

        alert(`test:profileId:${forProfileId}`);

        if (forProfileId) {
          const profile = await lensClient.profile.fetch({ forProfileId });
          alert(`test:profile.id:${profile?.id}`);
          return profile;
        }
      } catch {
        alert("test:error");
        // logout();
      }
      // eslint-disable-next-line unicorn/no-null
      return null;
    },
  });
};
