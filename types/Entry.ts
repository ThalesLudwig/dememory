import { EntryStorage } from "../constants/EntryStorage";
import { MoodEnum } from "../constants/moods";

export type PinnedImage = { path: string, cid?: string }

export type Entry = {
  id: string;
  content: string;
  imagesUrl?: PinnedImage[];
  tags?: string[];
  mood?: MoodEnum;
  storage?: EntryStorage;
  isPinned?: boolean;
  date: Date;
};
