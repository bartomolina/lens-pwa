import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { createProfile } from "./create-profile";

interface LoginOptions {
  onSuccess?: () => void;
}

export const useCreateProfile = ({ onSuccess }: LoginOptions) => {
  const { address: to } = useAccount();

  return useMutation({
    mutationFn: async (handle: string) => {
      console.log("use create profile with handle:", handle);

      // create profile with handle
      const createProfileresponse = createProfile({
        to,
        handle,
      });

      console.log(
        "use create profile with handle:",
        await createProfileresponse
      );
    },
    onSuccess,
  });
};
