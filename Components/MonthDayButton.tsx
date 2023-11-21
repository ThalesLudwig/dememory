import { useCallback, useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { Surface, Text, useTheme } from "react-native-paper";
import * as Haptics from "expo-haptics";
import { format } from "date-fns";

import { Day } from "../types/Day";
import { setDate } from "../config/dateSlice";

type MonthDayButtonProps = {
  date: Day;
  isSelected?: boolean;
  isMarked?: boolean;
};

const MonthDayButton = ({ date, isSelected, isMarked }: MonthDayButtonProps) => {
  const dispatch = useDispatch();
  const { colors, dark } = useTheme();

  const onSelect = useCallback(() => {
    dispatch(setDate(format(new Date(), date.key)));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const selectedDayTextStyle = useMemo(() => {
    if (!isSelected) return styles.dayText;
    return dark ? { ...styles.dayText, color: colors.scrim } : { ...styles.dayText, color: "white" };
  }, [dark, isSelected]);

  return (
    <Pressable style={styles.ripple} onPress={onSelect}>
      <Surface style={{ ...styles.container, backgroundColor: colors.primaryContainer }}>
        <View
          style={
            isSelected
              ? { ...styles.daySelected, backgroundColor: colors.primary }
              : { ...styles.day, backgroundColor: colors.inversePrimary }
          }
        >
          <Text style={selectedDayTextStyle}>{date.value}</Text>
        </View>
        <Text>{date.name.toUpperCase()}</Text>
        {isMarked && <View style={{ ...styles.dot, backgroundColor: colors.primary }} />}
      </Surface>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  ripple: {
    margin: 3,
    height: 115,
  },
  container: {
    alignItems: "center",
    height: 115,
    borderRadius: 100,
  },
  day: {
    width: 55,
    height: 55,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  daySelected: {
    width: 55,
    height: 55,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  dayText: {
    fontWeight: "bold",
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 100,
    marginTop: 10,
  }
});

export default MonthDayButton;
