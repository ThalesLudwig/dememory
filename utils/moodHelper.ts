import { useTranslation } from "react-i18next";

import { MoodEnum } from "../constants/moods";

const COLORS = {
  ANGRY: "#ff908a",
  FANTASTIC: "#fff1d4",
  GREAT: "#d1f3ff",
  HAPPY: "#90d4cc",
  NEUTRAL: "#fce0d8",
  SAD: "#ffdeea",
  STRESSED: "#c4b3e6",
  NERVOUS: "#FAC898",
};

const COLORS_DARK = {
  ANGRY: "#cc6560",
  FANTASTIC: "#b39c70",
  GREAT: "#82a0ab",
  HAPPY: "#588265",
  NEUTRAL: "#a3868a",
  SAD: "#dba2b7",
  STRESSED: "#9b7fd4",
  NERVOUS: "#9c6b3d",
};

export const getMoodName = (mood: MoodEnum): string => {
  const { t } = useTranslation("common");

  switch (mood) {
    case MoodEnum.ANGRY:
      return t("common:moods.angry");
    case MoodEnum.FANTASTIC:
      return t("common:moods.fantastic");
    case MoodEnum.GREAT:
      return t("common:moods.great");
    case MoodEnum.HAPPY:
      return t("common:moods.happy");
    case MoodEnum.NEUTRAL:
      return t("common:moods.neutral");
    case MoodEnum.SAD:
      return t("common:moods.sad");
    case MoodEnum.STRESSED:
      return t("common:moods.stressed");
    case MoodEnum.NERVOUS:
      return t("common:moods.nervous");
    default:
      return t("common:moods.neutral");
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
  moods[MoodEnum.NERVOUS] = { key: MoodEnum.NERVOUS, name: getMoodName(MoodEnum.NERVOUS) };
  return moods;
};

export const getMoodColor = (mood: MoodEnum, isDarkMode: boolean = false) => {
  switch (mood) {
    case MoodEnum.ANGRY:
      return (isDarkMode ? COLORS_DARK : COLORS).ANGRY;
    case MoodEnum.FANTASTIC:
      return (isDarkMode ? COLORS_DARK : COLORS).FANTASTIC;
    case MoodEnum.GREAT:
      return (isDarkMode ? COLORS_DARK : COLORS).GREAT;
    case MoodEnum.HAPPY:
      return (isDarkMode ? COLORS_DARK : COLORS).HAPPY;
    case MoodEnum.NEUTRAL:
      return (isDarkMode ? COLORS_DARK : COLORS).NEUTRAL;
    case MoodEnum.SAD:
      return (isDarkMode ? COLORS_DARK : COLORS).SAD;
    case MoodEnum.STRESSED:
      return (isDarkMode ? COLORS_DARK : COLORS).STRESSED;
    case MoodEnum.NERVOUS:
      return (isDarkMode ? COLORS_DARK : COLORS).NERVOUS;
    default:
      return (isDarkMode ? COLORS_DARK : COLORS).NEUTRAL;
  }
};
