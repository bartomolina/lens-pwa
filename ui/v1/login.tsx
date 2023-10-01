import { BlockTitle, List, ListButton } from "konsta/react";
import { useRouter } from "next/navigation";
import { useDisconnect } from "wagmi";

import { useLogin } from "@/lib/lens/v1";
import { clearAuthenticationToken } from "@/lib/state";

export function Login() {
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const { mutate: login } = useLogin({
    onSuccess: () => router.push("/feed"),
  });

  return (
    <>
      <BlockTitle>
        Default profile
        <div className="text-right text-xs font-light">Mainnnet - Lens V1</div>
      </BlockTitle>
      <List strongIos insetIos>
        <ListButton onClick={() => login()}>Log in</ListButton>
      </List>
      <BlockTitle>Log out</BlockTitle>
      <List strongIos insetIos>
        <ListButton
          onClick={() => {
            clearAuthenticationToken();
            disconnect();
          }}
        >
          Disconnect
        </ListButton>
      </List>
    </>
  );
}
