import { useQuery } from "@tanstack/react-query";

import { lensClient } from "@/lib/lens-client";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      alert("test:fetching profile");
      const forProfileId = await lensClient.authentication.getProfileId();
      alert("test:profile returned");

      if (forProfileId) {
        alert("test:profile exists");
        const profile = await lensClient.profile.fetch({ forProfileId });
        console.log("use profile:", profile);
        return profile;
      } else if (forProfileId === null) {
        alert("test:profile doesn't exist");
        return forProfileId;
      }
    },
  });
};
