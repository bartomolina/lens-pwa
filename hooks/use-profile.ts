import { lensClient } from "@/lib/lens-client";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const profile = await lensClient.authentication.getProfileId();
      console.log("use profile:", profile);

      return profile;
    },
  });
};
