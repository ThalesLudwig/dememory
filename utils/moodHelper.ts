import { MoodEnum } from "../constants/moods";

const COLORS = {
  ANGRY: "#ff908a",
  FANTASTIC: "#fff1d4",
  GREAT: "#d1f3ff",
  HAPPY: "#90d4cc",
  NEUTRAL: "#fce0d8",
  SAD: "#ffdeea",
  STRESSED: "#c4b3e6",
};

export const getMoodName = (mood: MoodEnum): string => {
  switch (mood) {
    case MoodEnum.ANGRY:
      return "Angry";
    case MoodEnum.FANTASTIC:
      return "Fantastic";
    case MoodEnum.GREAT:
      return "Great";
    case MoodEnum.HAPPY:
      return "Happy";
    case MoodEnum.NEUTRAL:
      return "Neutral";
    case MoodEnum.SAD:
      return "Sad";
    case MoodEnum.STRESSED:
      return "Stressed";
    default:
      return "Neutral";
  }
};

export const getMoodsArray = () => {
  const moods = [];
  moods[MoodEnum.NEUTRAL] = { key: MoodEnum.NEUTRAL, name: getMoodName(MoodEnum.NEUTRAL) };
  moods[MoodEnum.HAPPY] = { key: MoodEnum.HAPPY, name: getMoodName(MoodEnum.HAPPY) };
  moods[MoodEnum.SAD] = { key: MoodEnum.SAD, name: getMoodName(MoodEnum.SAD) };
  moods[MoodEnum.FANTASTIC] = { key: MoodEnum.FANTASTIC, name: getMoodName(MoodEnum.FANTASTIC) };
  moods[MoodEnum.ANGRY] = { key: MoodEnum.ANGRY, name: getMoodName(MoodEnum.ANGRY) };
  moods[MoodEnum.GREAT] = { key: MoodEnum.GREAT, name: getMoodName(MoodEnum.GREAT) };
  moods[MoodEnum.STRESSED] = { key: MoodEnum.STRESSED, name: getMoodName(MoodEnum.STRESSED) };
  return moods;
};

export const getMoodColor = (mood: MoodEnum) => {
  switch (mood) {
    case MoodEnum.ANGRY:
      return COLORS.ANGRY;
    case MoodEnum.FANTASTIC:
      return COLORS.FANTASTIC;
    case MoodEnum.GREAT:
      return COLORS.GREAT;
    case MoodEnum.HAPPY:
      return COLORS.HAPPY;
    case MoodEnum.NEUTRAL:
      return COLORS.NEUTRAL;
    case MoodEnum.SAD:
      return COLORS.SAD;
    case MoodEnum.STRESSED:
      return COLORS.STRESSED;
    default:
      return COLORS.NEUTRAL;
  }
};
