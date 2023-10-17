export async function POST(req: Request) {
  const formData = await req.formData();
  const json = formData.get("message");
  console.log("test:uploadingjson", json);
  console.log("test:uploadingjson", formData);
  if (!json) {
    return Response.json({ success: false });
  }
  console.log("test:uploadingjson:done");

  const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PINATA_JWT}`,
    },
    body: json,
  });
  console.log("test:uploadingjson:done2", res);
  const resData = await res.json();
  console.log("test:uploadingjson:done3", resData);
  return Response.json(resData);
}
