import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { lensClient } from "@/lib/lens-client";

export const useProfiles = () => {
  const { address } = useAccount();

  return useQuery({
    enabled: address != undefined,
    queryKey: ["profiles", address],
    queryFn: async () => {
      if (address) {
        const profiles = await lensClient.profile.fetchAll({
          where: {
            ownedBy: [address],
          },
        });
        console.log("use owned profiles:", profiles);

        return profiles;
      }
    },
  });
};
