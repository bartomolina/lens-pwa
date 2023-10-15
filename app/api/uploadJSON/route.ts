export async function POST(req: Request) {
  const formData = await req.formData();
  const json = formData.get("message");
  // const body = new FormData();
  // body.append("message", json);

  console.log("test:json", json);

  const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PINATA_JWT}`,
    },
    body: json,
  });
  const resData = await res.json();
  return Response.json(resData);
}