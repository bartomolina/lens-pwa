"use client";

import { Navbar, Page } from "konsta/react";

import { NETWORK } from "@/lib/constants";
import { Navigation } from "@/ui/layout/navigation";

import { V1 } from "./v1";
import { V2 } from "./v2";

export default function Me() {
  return (
    <Page>
      <Navbar title="Me" />
      {NETWORK === "mainnet" ? <V1 /> : <V2 />}
      <Navigation activeTab="me" />
    </Page>
  );
}
