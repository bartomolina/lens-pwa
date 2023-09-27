"use client";

import {
  Globe,
  Person,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
} from "framework7-icons/react";
import { Icon, Tabbar, TabbarLink } from "konsta/react";
import { useRouter } from "next/navigation";

export function Navigation({ activeTab }: { activeTab: string }) {
  const router = useRouter();

  return (
    <Tabbar className="fixed bottom-0 left-0 h-24 pt-6">
      <TabbarLink
        active={activeTab === "feed"}
        onClick={() => router.push("/feed")}
        icon={<Icon ios={<Globe className="h-7 w-7" />} />}
        label={"Feed"}
      />
      <TabbarLink
        active={activeTab === "settings"}
        onClick={() => router.push("/settings")}
        icon={<Icon ios={<Person className="h-7 w-7" />} />}
        label={"Settings"}
      />
    </Tabbar>
  );
}
