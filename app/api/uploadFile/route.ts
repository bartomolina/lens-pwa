export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as Blob | null;
  if (!file) {
    return Response.json({ success: false });
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
      Authorization: `Bearer ${process.env.PINATA_JWT}`,
    },
    body: data,
  });
  console.log("test:posted1", res);
  const resData = await res.json();
  console.log("test:posted2", resData);
  return Response.json(resData);
}
