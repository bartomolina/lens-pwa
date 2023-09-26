import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { getDefaultProfile } from "./get-default-profile";

export const useDefaultProfile = () => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["profile", address],
    queryFn: async () => {
      let result;
      if (address) {
        result = await getDefaultProfile({ ethereumAddress: address });
        console.log("profile:", result);
      }

      return result;
    },
  });
};
