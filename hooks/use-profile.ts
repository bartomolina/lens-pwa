import { useQuery } from "@tanstack/react-query";

import { lensClient } from "@/lib/lens-client";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      alert("test:fetching");
      const forProfileId = await lensClient.authentication.getProfileId();
      alert("test:fetched");

      if (forProfileId) {
        alert(`test:exist ${forProfileId}`);
        const profile = await lensClient.profile.fetch({ forProfileId });
        alert("test:returning");
        return profile;
      } else if (forProfileId === null) {
        alert("test:does not exist");
        return forProfileId;
      }
    },
  });
};
