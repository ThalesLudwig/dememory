import { isValid } from "date-fns";
import { inRange } from "lodash";

export const validateDateStr = (text: string): boolean => {
  const parsedText = text.replaceAll("/", "-");
  const newDate = new Date(parsedText);
  const month = parseInt(parsedText.substring(5, 7));
  const day = parseInt(parsedText.substring(8, 10));
  const isValidDate = isValid(newDate) && inRange(month, 0, 13) && inRange(day, 0, 32);
  return isValidDate;
};
