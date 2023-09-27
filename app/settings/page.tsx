"use client";

import { Block, BlockTitle, Button, Navbar, Page } from "konsta/react";
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
      <Block strong outlineIos className="space-y-2">
        <div className="w-24">
          <Button large onClick={() => logout()}>
            Logout
          </Button>
        </div>
      </Block>
    </Page>
  );
}
