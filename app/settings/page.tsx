"use client";

import { BlockTitle, List, ListButton, Page } from "konsta/react";
import { useRouter } from "next/navigation";
import { useContext, useMemo } from "react";

import { useLoginRedirect, useProfile, useUpdateProfileManager } from "@/hooks";
import { logout } from "@/lib/lens-client";
import { Button, NotificationContext } from "@/ui/common";
import { NavbarWithDebug, Navigation } from "@/ui/layout";

export default function Settings() {
  const router = useRouter();
  const { isLoggedIn } = useLoginRedirect();
  const { data: profile, refetch, isFetching } = useProfile();
  const notification = useContext(NotificationContext);
  const { mutate: enableProfileManager, isLoading } = useUpdateProfileManager({
    onSuccess: async () => {
      notification.show("Profile manager updated");
      await refetch();
    },
    onError: (error) => {
      notification.show(`Error updating the profile manager: ${error.message}`);
    },
  });

  const text = useMemo(() => {
    if (!isFetching) {
      return profile?.lensManager
        ? "Disable profile manager"
        : "Enable profile manager";
    }
    return "";
  }, [isFetching, profile?.lensManager]);

  const textLoading = useMemo(() => {
    if (!isFetching) {
      return profile?.lensManager
        ? "Disabling profile manager"
        : "Enabling profile manager";
    }
    return "";
  }, [isFetching, profile?.lensManager]);

  return (
    <Page>
      {isLoggedIn && (
        <>
          <NavbarWithDebug title="Settings" />
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
              text={text}
              textLoading={textLoading}
              isLoading={isLoading}
              isFetching={isFetching}
              onClick={() => {
                profile?.lensManager
                  ? enableProfileManager(false)
                  : enableProfileManager(true);
              }}
            />
          </List>
          <Navigation activeTab="settings" />
        </>
      )}
    </Page>
  );
}
