export const truncateAddr = (address: string, separator = "…") => {
  const match = address.match(
    /^(0x[\dA-Za-z]{4})[\dA-Za-z]+([\dA-Za-z]{4})$/
  );

  if (!match) return address;
  return `${match[1]}${separator}${match[2]}`;
};
