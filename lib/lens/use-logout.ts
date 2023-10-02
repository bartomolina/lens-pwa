import { useMutation } from "@tanstack/react-query";
import { useDisconnect } from "wagmi";

import { clearAuthenticationToken } from "@/lib/state";

interface LogoutOptions {
  onSuccess?: () => void;
}

export const useLogout = ({ onSuccess }: LogoutOptions) => {
  const { disconnect } = useDisconnect();

  return useMutation({
    mutationFn: async () => {
      clearAuthenticationToken();
      await disconnect();
      console.log("use logout: logged out");
    },
    onSuccess,
  });
};
