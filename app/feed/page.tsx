"use client";

import { Navbar, Page } from "konsta/react";

import Navigation from "@/ui/layout/navigation";

export default function Feed() {
  return (
    <Page>
      <Navbar title="Feed" />
      <Navigation activeTab="feed" />
    </Page>
  );
}
