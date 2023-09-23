import { EntryStorage } from "./EntryStorage";

export const storageButtons = [
  {
    value: EntryStorage.LOCAL.toString(),
    label: "Local Device",
    icon: "cellphone",
  },
  {
    value: EntryStorage.BLOCKCHAIN.toString(),
    label: "Blockchain",
    icon: "ethereum",
    disabled: true,
  },
];
