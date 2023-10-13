import { useQuery } from "@tanstack/react-query";

import { lensClient } from "@/lib/lens-client";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const isAuthenticated = await lensClient.authentication.isAuthenticated();
      if (isAuthenticated) {
        alert("test:is authenticated");
        const forProfileId = await lensClient.authentication.getProfileId();
        alert(`test:profileId:${forProfileId}`);

        if (forProfileId) {
          const profile = await lensClient.profile.fetch({ forProfileId });
          alert(`test:profile.id:${profile?.id}`);
          return profile;
        }
      }
      alert("test:error");
      // eslint-disable-next-line unicorn/no-null
      return null;
    },
  });
};
