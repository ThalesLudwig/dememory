import "../utils/calendarLocaleLoader";

import { useEffect, useMemo, useState } from "react";
import { Dialog, useTheme } from "react-native-paper";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { format } from "date-fns";
import { Theme } from "react-native-calendars/src/types";

import { useDateLocale } from "../hooks/useDateLocale";
import { useEntryDates } from "../hooks/useEntryDates";

type DialogProps = {
  isOpen: boolean;
  setIsOpen: Function;
  onSelect: Function;
};

const CalendarDialog = ({ isOpen, onSelect, setIsOpen }: DialogProps) => {
  const { colors } = useTheme();
  const locale = useDateLocale();
  const entryDates = useEntryDates();

  useEffect(() => {
    LocaleConfig.defaultLocale = locale.code;
  }, [locale]);

  const today = useMemo(() => {
    const rawDate = new Date();
    return format(new Date(rawDate.valueOf() + rawDate.getTimezoneOffset() * 60 * 1000), "yyyy-MM-dd", { locale });
  }, [locale]);

  const [selectedDay, setSelectedDay] = useState(today);

  const theme: Theme = useMemo(
    () => ({
      backgroundColor: colors.elevation.level3,
      calendarBackground: colors.elevation.level3,
      arrowColor: colors.primary,
      selectedDayTextColor: colors.primary,
      dayTextColor: colors.onBackground,
      monthTextColor: colors.onBackground,
      textDisabledColor: colors.outline,
      todayTextColor: colors.primary,
      selectedDayBackgroundColor: colors.primaryContainer,
    }),
    [colors],
  );

  const markedDates = useMemo(() => {
    const dates = entryDates.map((date) => ({ [date]: { marked: true, dotColor: colors.primary } }))
    if (dates.length === 0) return {};
    return dates.reduce((acc, val) => ({ ...acc, ...val }));
  }, [entryDates]);

  return (
    <Dialog key={colors.primary} visible={isOpen} onDismiss={() => setIsOpen(false)}>
      <Dialog.Content>
        <Calendar
          enableSwipeMonths
          theme={theme}
          maxDate={today}
          markedDates={{
            ...markedDates,
            [selectedDay]: { selected: true, marked: entryDates.includes(selectedDay), selectedColor: colors.primary, selectedTextColor: colors.onPrimary },
          }}
          onDayPress={(day) => {
            setSelectedDay(day.dateString);
            onSelect(day.dateString);
          }}
        />
      </Dialog.Content>
    </Dialog>
  );
};

export default CalendarDialog;
