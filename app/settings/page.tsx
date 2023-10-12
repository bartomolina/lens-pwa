"use client";

import { BlockTitle, List, ListButton, Navbar, Page } from "konsta/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import { useProfile, useUpdateProfileManager } from "@/hooks";
import { logout } from "@/lib/lens-client";
import { Button, NotificationContext } from "@/ui/common";
import { Navigation } from "@/ui/layout/navigation";

export default function Settings() {
  const router = useRouter();
  const { data: walletClient } = useWalletClient();
  const { data: profile, refetch } = useProfile();
  const notification = useContext(NotificationContext);
  const { mutate: enableProfileManager, isLoading } = useUpdateProfileManager({
    onSuccess: () => {
      notification.show("Profile manager updated");
      refetch();
    },
    onError: (error) => {
      notification.show(`Error updating the profile manager: ${error.message}`);
    },
  });

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
        <Button
          text={
            profile?.lensManager
              ? "Disable profile manager"
              : "Enable profile manager"
          }
          textLoading={
            profile?.lensManager
              ? "Disabling profile manager"
              : "Enabling profile manager"
          }
          isLoading={isLoading}
          onClick={() => {
            walletClient &&
              (profile?.lensManager
                ? enableProfileManager(false)
                : enableProfileManager(true));
          }}
        />
      </List>
      <Navigation activeTab="settings" />
    </Page>
  );
}
