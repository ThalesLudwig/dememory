import { Entry } from "../types/Entry";

const mockContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In condimentum non ex a scelerisque. Nulla facilisi...";

export const entryMock: Entry[] = [
  { id: "1", content: mockContent, mood: 1 },
  { id: "2", content: mockContent, mood: 2, imageUrl: "https://picsum.photos/700", tag: "#trip" },
  { id: "3", content: mockContent, mood: 5 },
  { id: "4", content: mockContent, isPinned: true },
  { id: "5", content: mockContent, mood: 7, isCrypto: true, tag: "#letsGo", isPinned: true },
  { id: "6", content: mockContent, mood: 6 },
  { id: "7", content: mockContent, mood: 3, imageUrl: "https://picsum.photos/701", isPinned: true },
  { id: "8", content: mockContent, mood: 4, isCrypto: true },
];

export const favoriteMock: Entry[] = [
  { id: "4", content: mockContent },
  { id: "5", content: mockContent, mood: 7, isCrypto: true, tag: "#letsGo" },
  { id: "7", content: mockContent, mood: 3, imageUrl: "https://picsum.photos/701" },
];
