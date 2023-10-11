import "../utils/calendarLocaleLoader";

import { useEffect, useMemo, useState } from "react";
import { Dialog, useTheme } from "react-native-paper";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { format } from "date-fns";
import { Theme } from "react-native-calendars/src/types";

import { useDateLocale } from "../hooks/useDateLocale";

type DialogProps = {
  isOpen: boolean;
  setIsOpen: Function;
  onSelect: Function;
};

const CalendarDialog = ({ isOpen, onSelect, setIsOpen }: DialogProps) => {
  const { colors } = useTheme();
  const locale = useDateLocale();

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

  return (
    <Dialog key={colors.primary} visible={isOpen} onDismiss={() => setIsOpen(false)}>
      <Dialog.Content>
        <Calendar
          enableSwipeMonths
          theme={theme}
          maxDate={today}
          markedDates={{
            [selectedDay]: { selected: true },
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
