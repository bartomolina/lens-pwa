import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { getProfiles } from "./get-profiles";

export const useProfiles = () => {
  const { address } = useAccount();

  return useQuery({
    enabled: address != undefined,
    queryKey: ["profiles", address],
    queryFn: async () => {
      const result = await getProfiles({
        where: {
          ownedBy: [address],
        },
      });
      console.log("use owned profiles:", result);

      return result;
    },
  });
};
