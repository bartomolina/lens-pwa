import "server-only";

import { notFound } from "next/navigation";

import { getBaseUrl } from "@/lib/get-base-url";

import type { Item } from "./item";

export async function GetItems() {
  const response = await fetch(`${getBaseUrl()}/api/items`);

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const items = (await response.json()) as Item[];

  if (items.length === 0) {
    notFound();
  }

  return items;
}
