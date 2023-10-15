import { usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";

import { lensClient } from "@/lib/lens-client";

export const useProfiles = () => {
  const { user } = usePrivy();

  return useQuery({
    enabled: user?.wallet?.address != undefined,
    queryKey: ["profiles", user?.wallet?.address],
    queryFn: async () => {
      if (user?.wallet?.address) {
        const profiles = await lensClient.profile.fetchAll({
          where: {
            ownedBy: [user?.wallet?.address],
          },
        });
        console.log("use owned profiles:", profiles);

        return profiles;
      }
    },
  });
};
