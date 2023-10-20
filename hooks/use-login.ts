import { usePrivy } from "@privy-io/react-auth";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

import { AlchemyAAContext } from "@/app/alchemy-aa";
import { useProfile } from "@/hooks";
import { lensClient } from "@/lib/lens-client";
import { NotificationContext, NotificationType } from "@/ui/common";

interface LoginOptions {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useLogin = ({ onSuccess, onError }: LoginOptions) => {
  const notification = useContext(NotificationContext);
  const { data: currentProfile } = useProfile();
  const { user } = usePrivy();
  const { signer } = useContext(AlchemyAAContext);

  return useMutation({
    mutationFn: async (profileId: string) => {
      console.log("hook:login:start:", profileId);
      if (currentProfile) {
        return;
      }

      if (user?.wallet?.address && signer) {
        try {
          console.log("hook:login:generating challenge");
          const { id, text } =
            await lensClient.authentication.generateChallenge({
              for: profileId,
              signedBy: user?.wallet?.address,
            });

          console.log("hook:login:signing");
          const signature = await signer.signMessage(text);

          console.log("hook:login:authenticating");
          await lensClient.authentication.authenticate({ id, signature });

          console.log("hook:login:result:authenticated");
        } catch (error) {
          console.log("hook:login:result:error:", error);
          notification.show(
            "There was an error logging in",
            NotificationType.ERROR
          );
          throw error;
        }
      }
    },
    onSuccess,
    onError,
  });
};
