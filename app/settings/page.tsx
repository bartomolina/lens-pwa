"use client";

import {
  SessionType,
  useLogout,
  useSession,
  useUpdateProfileManagers,
} from "@lens-protocol/react-web";
import { usePrivy } from "@privy-io/react-auth";
import {
  BlockTitle,
  List,
  ListButton,
  ListItem,
  Page,
  Toggle,
} from "konsta/react";
import { useTheme } from "next-themes";
import { useContext, useEffect, useMemo } from "react";

import { useLoginRedirect } from "@/hooks";
import { Button, NotificationContext, NotificationType } from "@/ui/common";
import { NavbarWithDebug, Navigation } from "@/ui/layout";

export default function Settings() {
  const { user } = usePrivy();
  const { theme, setTheme } = useTheme();
  const { isLoggedIn } = useLoginRedirect();
  const { data: session, loading: loadingSession } = useSession();
  const { execute: logout } = useLogout();
  const notification = useContext(NotificationContext);
  const {
    execute: updateProfileManagers,
    loading: updatingManager,
    called,
    error,
  } = useUpdateProfileManagers();

  const signlessText = useMemo<
    { text: string; loading: string } | undefined
  >(() => {
    if (
      !loadingSession &&
      session?.authenticated &&
      session.type == SessionType.WithProfile
    ) {
      return session.profile.signless
        ? {
            text: "Disable signless transactions",
            loading: "Disabling signless transactions",
          }
        : {
            text: "Enable signless transactions",
            loading: "Enabling signless transactions",
          };
    }
  }, [loadingSession, session]);

  useEffect(() => {
    if (!updatingManager && called) {
      error
        ? notification.show(
            `Error updating the profile manager: ${error.message}`,
            NotificationType.ERROR
          )
        : notification.show("Profile manager updated");
    }
  }, [updatingManager, called, error, notification]);

  return (
    <Page>
      {isLoggedIn && (
        <>
          <NavbarWithDebug title="Settings" />
          <BlockTitle>Profile</BlockTitle>
          <List strong inset>
            <ListButton onClick={() => logout()}>Log out</ListButton>
            <Button
              text={signlessText?.text}
              textLoading={signlessText?.loading}
              isLoading={updatingManager}
              isFetching={loadingSession}
              onClick={() => {
                session?.type == SessionType.WithProfile &&
                !session.profile.signless
                  ? updateProfileManagers({ approveSignless: true })
                  : updateProfileManagers({ approveSignless: false });
              }}
            />
          </List>
          <BlockTitle>Theme</BlockTitle>
          <List strong inset>
            <ListItem
              label
              title="Dark Mode"
              after={
                <Toggle
                  checked={theme === "light" ? false : true}
                  onChange={() =>
                    theme === "light" ? setTheme("dark") : setTheme("light")
                  }
                />
              }
            />
          </List>
          <BlockTitle>Wallet</BlockTitle>
          <List strong inset>
            <ListItem
              header="Address"
              title={user?.wallet?.address}
              titleWrapClassName="font-mono text-xs"
            />
          </List>
          <Navigation activeTab="settings" />
        </>
      )}
    </Page>
  );
}
