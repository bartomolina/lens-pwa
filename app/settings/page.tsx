"use client";

import { BlockTitle, List, ListButton, Navbar, Page } from "konsta/react";
import { useRouter } from "next/navigation";

import { lensClient, logout } from "@/lib/lens-client";
import { Navigation } from "@/ui/layout/navigation";

export default function Settings() {
  const router = useRouter();

  return (
    <Page>
      <Navbar title="Settings" />
      <BlockTitle>Profile</BlockTitle>
      <List strongIos insetIos>
        <ListButton
          onClick={() => {
            logout();
            router.push("/");
          }}
        >
          Log out
        </ListButton>
        <ListButton
          onClick={() => {
            lensClient.profile.createChangeProfileManagersTypedData({
              approveLensManager: true,
            });
          }}
        >
          Enable profile manager
        </ListButton>
      </List>
      <Navigation activeTab="settings" />
    </Page>
  );
}
