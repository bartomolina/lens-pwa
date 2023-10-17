export async function POST(req: Request) {
  console.log("test:json:start");
  const formData = await req.formData();
  console.log("test:json:formdata", formData);
  const json = formData.get("message");
  if (!json) {
    return Response.json({ success: false });
  }
  console.log("test:json:json", json);

  const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PINATA_JWT}`,
    },
    body: json,
  });
  console.log("test:json:res", res);
  const resData = await res.json();
  console.log("test:json:resData", resData);
  return Response.json(resData);
}
