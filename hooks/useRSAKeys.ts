import { RSA } from 'react-native-rsa-native';
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useMemo, useState } from "react";

import { RootState } from "../config/store";
import { setKeys } from '../config/keysSlice';

export const useRSAKeys = () => {
  const dispatch = useDispatch();
  const { public: publicKey, private: privateKey } = useSelector((state: RootState) => state.keys);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateKeys = async () => {
    setIsLoading(true);
    try {
      const keys = await RSA.generateKeys(4096);
      dispatch(setKeys(keys));
      setIsLoading(false);
      return keys.public;
    } catch (error: any) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const hasKeys = useMemo(() => publicKey && privateKey, [publicKey, privateKey]);

  const encryptContent = useCallback(async (content: string) => {
    setIsLoading(true);
    let newPublicKey;
    if (!hasKeys) newPublicKey = await generateKeys();
    const encrypted = await RSA.encrypt(content, newPublicKey ?? publicKey);
    setIsLoading(false);
    return encrypted;
  }, [publicKey, hasKeys]);

  const decryptContent = useCallback(async (content: string) => {
    setIsLoading(true);
    try {
      const decrypted = await RSA.decrypt(content, privateKey);
      setIsLoading(false);
      return decrypted;
    } catch (error: any) {
      setError(error.message);
      setIsLoading(false);
    }
  }, [privateKey, hasKeys]);


  return {
    publicKey,
    privateKey,
    error,
    isLoading,
    generateKeys,
    hasKeys,
    encryptContent,
    decryptContent,
  };
};
