import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { EntryStorage } from "./EntryStorage";
import { RootState } from "../config/store";

export const storageButtons = () => {
  const { t } = useTranslation("common");
  const { wallet } = useSelector((state: RootState) => state.profile);

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
      // disabled: !wallet,
      disabled: true,
    },
  ];
};
