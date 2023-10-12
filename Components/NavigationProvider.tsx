import { ReactNode, useMemo } from "react";
import { useColorScheme } from "react-native";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { RootState } from "../config/store";

export default function NavigationProvider({ children }: { children: ReactNode }) {
  const colorScheme = useColorScheme();
  const { value: selectedTheme } = useSelector((state: RootState) => state.theme);

  const theme = useMemo(() => {
    if (selectedTheme === "device") {
      return colorScheme === "dark" ? DarkTheme : DefaultTheme;
    } else {
      return selectedTheme === "dark" ? DarkTheme : DefaultTheme;
    }
  }, [colorScheme, selectedTheme]);

  return <NavigationContainer theme={theme}>{children}</NavigationContainer>;
}
