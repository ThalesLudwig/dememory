import { useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { Surface, Text, MD3Colors } from "react-native-paper";
import * as Haptics from "expo-haptics";
import { format } from "date-fns";

import { Day } from "../types/Day";
import { setDate } from "../config/dateSlice";

type MonthDayButtonProps = {
  date: Day;
  isSelected?: boolean;
};

const MonthDayButton = ({ date, isSelected }: MonthDayButtonProps) => {
  const dispatch = useDispatch();

  const onSelect = useCallback(() => {
    dispatch(setDate(format(new Date(), date.key)));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  return (
    <Pressable style={styles.ripple} onPress={onSelect}>
      <Surface style={styles.container}>
        <View style={isSelected ? styles.daySelected : styles.day}>
          <Text style={isSelected ? styles.dayTextSelected : styles.dayText}>{date.value}</Text>
        </View>
        <Text>{date.name.toUpperCase()}</Text>
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
    backgroundColor: MD3Colors.primary90,
  },
  day: {
    width: 55,
    height: 55,
    backgroundColor: MD3Colors.primary80,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  daySelected: {
    width: 55,
    height: 55,
    backgroundColor: MD3Colors.primary40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  dayText: {
    fontWeight: "bold",
  },
  dayTextSelected: {
    fontWeight: "bold",
    color: "white",
  },
});

export default MonthDayButton;
