export const upload = async (file: File) => {
  console.log("pinata:uploading image");
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/uploadFile", {
    method: "POST",
    body: formData,
  });

  const resData = await res.json();
  console.log("pinata:image uploaded:", resData);
  if (!resData.IpfsHash) {
    throw new Error("pinata:error:", resData);
  }
  return `ipfs://${resData.IpfsHash}`;
};
