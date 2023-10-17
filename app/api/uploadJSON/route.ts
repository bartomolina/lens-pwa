export async function POST(req: Request) {
  console.log("api:uploadJSON:start");
  const formData = await req.formData();
  const json = formData.get("message");
  if (!json) {
    return Response.json({ success: false });
  }

  const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PINATA_JWT}`,
    },
    body: json,
  });
  const resData = await res.json();
  console.log("api:uploadJSON:result:", resData);
  return Response.json(resData);
}
