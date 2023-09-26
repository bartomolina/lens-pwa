"use client";

import {
  Globe,
  Person,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
} from "framework7-icons/react";
import { Icon, Tabbar, TabbarLink } from "konsta/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navigation() {
  const [activeTab, setActiveTab] = useState("tab-feed");
  const router = useRouter();

  return (
    <Tabbar className="fixed bottom-0 left-0 h-24 pt-6">
      <TabbarLink
        active={activeTab === "tab-feed"}
        onClick={() => {
          setActiveTab("tab-feed");
          router.push("/feed");
        }}
        icon={<Icon ios={<Globe className="h-7 w-7" />} />}
        label={"Feed"}
      />
      <TabbarLink
        active={activeTab === "tab-settings"}
        onClick={() => {
          setActiveTab("tab-settings");
          router.push("/settings");
        }}
        icon={<Icon ios={<Person className="h-7 w-7" />} />}
        label={"Settings"}
      />
    </Tabbar>
  );
}
