import { NextResponse } from "next/server";

import { env } from "@/env.mjs";

export async function POST(req: Request) {
  console.log("api:uploadFile:start");
  const formData = await req.formData();
  const file = formData.get("file") as Blob | null;

  if (!env.PINATA_JWT || env.PINATA_JWT.length === 0) {
    return NextResponse.json({ success: false, message: "Pinata JWT not set" });
  }

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const options = {
    name: file.name,
  };

  const data = new FormData();
  data.append("file", file);
  data.append("pinataMetadata", JSON.stringify(options));

  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.PINATA_JWT}`,
    },
    body: data,
  });
  const resData = await res.json();
  console.log("api:uploadFile:result:", resData);
  return NextResponse.json(resData);
}
