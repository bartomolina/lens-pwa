import {
  ARWEAVE_GATEWAY,
  IPFS_GATEWAY,
  LENS_MEDIA_SNAPSHOT_URL,
} from "@/lib/constants";

export const sanitizedStorageUrl = (hash?: string): string => {
  if (!hash) {
    return "";
  }

  let link = hash.replaceAll(/^Qm[1-9A-Za-z]{44}/gm, `${IPFS_GATEWAY}${hash}`);
  link = link.replace("https://ipfs.io/ipfs/", IPFS_GATEWAY);
  link = link.replace("ipfs://ipfs/", IPFS_GATEWAY);
  link = link.replace("ipfs://", IPFS_GATEWAY);
  link = link.replace("ar://", ARWEAVE_GATEWAY);

  return link;
};

export const imageKit = (url: string, name?: string): string => {
  if (!url) {
    return "";
  }

  if (url.includes(LENS_MEDIA_SNAPSHOT_URL)) {
    const splitedUrl = url.split("/");
    const path = splitedUrl.at(-1);

    return name ? `${LENS_MEDIA_SNAPSHOT_URL}/${name}/${path}` : url;
  }

  return url;
};
