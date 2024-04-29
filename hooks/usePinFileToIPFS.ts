import { useState } from "react";

import { IPFSFile } from "../types/IPFSFile";

const pinataAPIKey = process.env.EXPO_PUBLIC_PINATA_API_KEY || "";

const usePinFileToIPFS = () => {
  const [cid, setCid] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const pinFile = async (fileURI: string): Promise<IPFSFile | undefined> => {
    setIsLoading(true);
    setError(null);
    const fileName = fileURI.split("/").pop() || "user-image";
    const formData = new FormData();
    formData.append("file", { uri: fileURI, name: fileName, type: "image/jpeg" } as any);
    const pinataMetadata = JSON.stringify({ name: fileName });
    formData.append("pinataMetadata", pinataMetadata);
    const pinataOptions = JSON.stringify({ cidVersion: 0 });
    formData.append("pinataOptions", pinataOptions);

    try {
      const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${pinataAPIKey}`,
        },
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to pin file to IPFS");
      const data: IPFSFile = await response.json();
      setCid(data.IpfsHash);
      return { ...data, localPath: fileURI };
    } catch (error) {
      console.log(error);
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cid,
    isLoading,
    error,
    pinFile,
  };
};

export default usePinFileToIPFS;
