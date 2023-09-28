import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { getDefaultProfile } from "./get-default-profile";

export const useDefaultProfile = () => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["profile", address],
    queryFn: async () => {
      const result = await getDefaultProfile({ ethereumAddress: address });
      console.log("use profile:", result);

      return result;
    },
  });
};