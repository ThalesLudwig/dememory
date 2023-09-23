import { EntryStorage } from "../constants/EntryStorage";
import { MoodEnum } from "../constants/moods";

export type Entry = {
  id: string;
  content: string;
  imagesUrl?: string[];
  tags?: string[];
  mood?: MoodEnum;
  storage?: EntryStorage;
  isPinned?: boolean;
  date: Date;
};
