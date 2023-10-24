"use client";

import {
  development,
  LensConfig,
  LensProvider,
} from "@lens-protocol/react-web";
import {
  ConnectedWallet,
  PrivyProvider,
  usePrivy,
  useWallets,
} from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "konsta/react";
import { ThemeProvider } from "next-themes";
import { useCallback, useEffect, useState } from "react";

import { env } from "@/env.mjs";
import { APP_URL } from "@/lib/constants";
import { bindings as privyBindings } from "@/lib/lens-privy-bindings";
import { Notification, NotificationProvider } from "@/ui/common";
import { isiOS } from "@/utils/ios";

const lensConfig: LensConfig = {
  bindings: privyBindings,
  environment: development,
};

const queryClient = new QueryClient();

export function Client({ children }: { children: React.ReactNode }) {
  const [mounted, isMounted] = useState(false);
  const [theme, setTheme] = useState<"material" | "ios">("material");

  useEffect(() => {
    if (
      env.NEXT_PUBLIC_ONESIGNAL_APPID &&
      env.NEXT_PUBLIC_ONESIGNAL_APPID.length > 0
    ) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.OneSignalDeferred = window.OneSignalDeferred || [];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      OneSignalDeferred.push(function (OneSignal) {
        OneSignal.init({
          appId: env.NEXT_PUBLIC_ONESIGNAL_APPID,
          safari_web_id:
            "web.onesignal.auto.5a2165c8-9d94-4308-bfd9-99a8484077b6",
        });
        OneSignal.Slidedown.promptPush();
      });
      return () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.OneSignalDeferred = undefined;
      };
    }
  }, []);

  useEffect(() => {
    isMounted(true);
    if (isiOS()) {
      setTheme("ios");
    }
  }, [isMounted]);

  return mounted ? (
    <QueryClientProvider client={queryClient}>
      <PrivyProvider
        appId={env.NEXT_PUBLIC_PRIVY_APP_ID}
        config={{
          loginMethods: ["wallet", "email"],
          embeddedWallets: {
            createOnLogin: "users-without-wallets",
            noPromptOnSignature: true,
          },
          appearance: {
            theme: "light",
            logo: `${APP_URL}icons/icon-192x192.png`,
          },
        }}
      >
        <LensProvider config={lensConfig}>
          <NotificationProvider>
            <App theme={theme}>
              <ThemeProvider attribute="class" enableSystem={false}>
                <Notification />
                <PrivyBind>{children}</PrivyBind>
              </ThemeProvider>
            </App>
          </NotificationProvider>
        </LensProvider>
      </PrivyProvider>
    </QueryClientProvider>
  ) : (
    <></>
  );
}

function PrivyBind({ children }: { children: React.ReactNode }) {
  const { wallets } = useWallets();
  const { authenticated, ready } = usePrivy();

  const primaryWallet = wallets && wallets[0] ? wallets[0] : undefined;

  const updateBindings = useCallback(async (wallet: ConnectedWallet) => {
    try {
      await wallet.switchChain(80001);
      const provider = await wallet.getEthersProvider();
      const signer = provider.getSigner();
      privyBindings.update({
        signer,
        provider,
      });
    } catch (error) {
      console.error("privyBind:Failed to update bindings:", error);
    }
  }, []);

  useEffect(() => {
    if (ready && authenticated && primaryWallet) {
      updateBindings(primaryWallet);
    }
  }, [ready, authenticated, primaryWallet, updateBindings]);

  return <>{children}</>;
}
