export async function POST(req: Request) {
  const formData = await req.formData();
  const json = formData.get("message");

  console.log("test:json:uploading");
  const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PINATA_JWT}`,
    },
    body: json,
  });
  console.log("test:json:1:", res);
  const resData = await res.json();
  console.log("test:json:2:", resData);
  return Response.json(resData);
}
