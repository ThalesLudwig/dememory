export const walletShortener = (address?: string) => {
  if (!address) return "";
  const lastIndex = address.length - 1;
  return `${address.slice(0, 4)}...${address.slice(lastIndex - 3, lastIndex + 1)}`;
};

//0x44913c3eB4794A97CbB471c94eF2376f58A1F52B
