import { useState } from "react";

const pinataAPIKey = process.env.EXPO_PUBLIC_PINATA_API_KEY || "";

const useUnpinFileToIPFS = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const unpinFile = async (cid: string): Promise<string | undefined> => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`https://api.pinata.cloud/pinning/unpin/${cid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${pinataAPIKey}`,
      },
    });

    try {
      const data: string = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        throw new Error(await (data as any).error.message);
      }
    } catch (error) {
      console.log(error);
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    unpinFile,
  };
};

export default useUnpinFileToIPFS;
