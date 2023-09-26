import type { Item } from "./item";

export const runtime = "edge";

export async function GET() {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}

const data: Item[] = [{ name: "One" }, { name: "Two" }, { name: "Three" }];
