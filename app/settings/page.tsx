"use client";

import { usePrivy } from "@privy-io/react-auth";
import {
  BlockTitle,
  List,
  ListButton,
  ListItem,
  Page,
  Toggle,
} from "konsta/react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useContext, useEffect, useMemo, useState } from "react";

import { useLoginRedirect, useProfile, useUpdateProfileManager } from "@/hooks";
import { logout } from "@/lib/lens-client";
import { Button, NotificationContext, NotificationType } from "@/ui/common";
import { NavbarWithDebug, Navigation } from "@/ui/layout";

import { AlchemyAAContext } from "../alchemy-aa";

export default function Settings() {
  const router = useRouter();
  const { user } = usePrivy();
  const { provider } = useContext(AlchemyAAContext);
  const [AAAddress, setAAAddress] = useState("");
  const { theme, setTheme } = useTheme();
  const { isLoggedIn } = useLoginRedirect();
  const { data: profile, refetch, isFetching } = useProfile();
  const notification = useContext(NotificationContext);
  const { mutate: enableProfileManager, isLoading } = useUpdateProfileManager({
    onSuccess: async () => {
      notification.show("Profile manager updated");
      await refetch();
    },
    onError: (error) => {
      notification.show(
        `Error updating the profile manager: ${error.message}`,
        NotificationType.ERROR
      );
    },
  });

  useEffect(() => {
    provider?.getAddress().then((address) => setAAAddress(address));
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
          <List strong inset>
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
              header="EOA"
              title={user?.wallet?.address}
              titleWrapClassName="font-mono text-xs"
            />
            <ListItem
              header="Alchemy's Account Abstraction"
              title={AAAddress}
              titleWrapClassName="font-mono text-xs"
            />
          </List>
          <Navigation activeTab="settings" />
        </>
      )}
    </Page>
  );
}
