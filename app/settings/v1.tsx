"use client";

import { BlockTitle, List, ListButton } from "konsta/react";
import { useRouter } from "next/navigation";

import { useLogout } from "@/lib/lens";

export function V1() {
  const router = useRouter();
  const { mutate: logout } = useLogout({
    onSuccess: () => router.push("/"),
  });

  return (
    <>
      <BlockTitle>Account</BlockTitle>
      <List strongIos insetIos>
        <ListButton onClick={() => router.push("/")}>
          Profile log out
        </ListButton>
        <ListButton onClick={() => logout()}>Log out</ListButton>
      </List>
    </>
  );
}
