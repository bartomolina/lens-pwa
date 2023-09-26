import { useMutation } from "@tanstack/react-query";
import { useDisconnect } from "wagmi";

import { clearAuthenticationToken } from "@/lib/state";

export const useLogout = () => {
  const { disconnect } = useDisconnect();

  return useMutation({
    mutationFn: async () => {
      clearAuthenticationToken();
      disconnect();
      console.log("logout: logged out");
    },
  });
};
