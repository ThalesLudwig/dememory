import { ReactNode, useMemo } from "react";
import { Platform, useColorScheme } from "react-native";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import * as NavigationBar from "expo-navigation-bar";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useSelector } from "react-redux";

import { RootState } from "../config/store";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const { value: selectedTheme } = useSelector((state: RootState) => state.theme);
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const isDarkMode = useMemo(() => colorScheme === "dark", [colorScheme]);

  if (Platform.OS === "android") {
    NavigationBar.setBackgroundColorAsync(isDarkMode ? theme.dark.surfaceContainerHigh : theme.light.surfaceContainer);
  }
  console.log(selectedTheme);
  const paperTheme = useMemo(() => {
    const darkTheme = { ...MD3DarkTheme, colors: theme.dark };
    const lightTheme = { ...MD3LightTheme, colors: theme.light };
    switch (selectedTheme) {
      case "dark":
        return darkTheme;
      case "light":
        return lightTheme;
      case "device":
        return isDarkMode ? darkTheme : lightTheme;
      default:
        return isDarkMode ? darkTheme : lightTheme;
    }
  }, [colorScheme, theme, selectedTheme]);

  return <PaperProvider theme={paperTheme}>{children}</PaperProvider>;
}
