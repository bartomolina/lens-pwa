"use client";

import { BlockTitle, List, ListButton } from "konsta/react";
import { useRouter } from "next/navigation";

import { useLogout } from "@/lib/lens";
import { useEnableProfileManager } from "@/lib/lens/v2";
import { clearProfileId } from "@/lib/state";

export function V2() {
  const router = useRouter();
  const { mutate: logout } = useLogout({
    onSuccess: () => router.push("/"),
  });
  const { mutate: enableProfileManager } = useEnableProfileManager({
    onSuccess: () => alert("enabled"),
  });

  return (
    <>
      <BlockTitle>Account</BlockTitle>
      <List strongIos insetIos>
        <ListButton
          onClick={() => {
            clearProfileId();
            router.push("/");
          }}
        >
          Profile log out
        </ListButton>
        <ListButton onClick={() => logout()}>Log out</ListButton>
        <ListButton onClick={() => enableProfileManager()}>
          Enable profile manager
        </ListButton>
      </List>
    </>
  );
}
