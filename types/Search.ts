import { EntryStorage } from "../constants/EntryStorage";
import { MoodEnum } from "../constants/moods";

export type SearchType = {
  content: string;
  moods: MoodEnum[];
  storages: EntryStorage[];
  tags: string[];
  fromDate?: string;
  toDate?: string;
};
