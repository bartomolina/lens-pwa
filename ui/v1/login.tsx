import { BlockTitle, List, ListButton, Preloader } from "konsta/react";
import { useRouter } from "next/navigation";

import { useLogin } from "@/lib/lens/v1";

export function Login() {
  const router = useRouter();
  const { mutate: login, isLoading } = useLogin({
    onSuccess: () => router.push("/feed"),
  });

  return (
    <>
      <BlockTitle>
        Default profile
        <div className="text-right text-xs font-light">Mainnnet - Lens V1</div>
      </BlockTitle>
      <List strongIos insetIos>
        <ListButton
          onClick={() => login()}
          type="submit"
          className="flex gap-2"
        >
          {isLoading && <Preloader size="w-10 h-10 p-2" />}
          <span>{isLoading ? "Logging in" : "Log in"}</span>
        </ListButton>
      </List>
    </>
  );
}
