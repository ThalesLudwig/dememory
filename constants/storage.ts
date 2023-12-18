import { useTranslation } from "react-i18next";
import { useAccount } from "wagmi";

import { EntryStorage } from "./EntryStorage";

export const storageButtons = () => {
  const { t } = useTranslation("common");
  const { isConnected } = useAccount();

  return [
    {
      value: EntryStorage.LOCAL.toString(),
      label: t("common:local-device"),
      icon: "cellphone",
    },
    {
      value: EntryStorage.BLOCKCHAIN.toString(),
      label: t("common:blockchain"),
      icon: "ethereum",
      disabled: !isConnected,
    },
  ];
};
