"use client";

import { BlockTitle, List, ListButton, Navbar, Page } from "konsta/react";
import { useRouter } from "next/navigation";

import { useLogout } from "@/lib/lens";
import { Navigation } from "@/ui/layout/navigation";

export default function Settings() {
  const router = useRouter();
  const { mutate: logout } = useLogout({
    onSuccess: () => router.push("/"),
  });

  return (
    <Page>
      <Navbar title="Settings" />
      <Navigation activeTab="settings" />
      <BlockTitle>Account</BlockTitle>
      <List strongIos insetIos>
        <ListButton onClick={() => logout()}>Log out</ListButton>
      </List>
    </Page>
  );
}
