import { ReactNode, useEffect, useMemo } from "react";
import { Platform } from "react-native";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import * as NavigationBar from "expo-navigation-bar";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useSelector } from "react-redux";

import { RootState } from "../config/store";
import blue from "../themes/blue";
import green from "../themes/green";
import pink from "../themes/pink";
import purple from "../themes/purple";
import red from "../themes/red";
import yellow from "../themes/yellow";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const { value: selectedTheme, color: selectedColor } = useSelector((state: RootState) => state.theme);
  const { theme: materialTheme } = useMaterial3Theme();

  const isDarkMode = useMemo(() => selectedTheme === "dark", [selectedTheme]);

  const palette = useMemo(() => {
    switch (selectedColor) {
      case "device":
        return materialTheme;
      case "blue":
        return blue;
      case "green":
        return green;
      case "pink":
        return pink;
      case "purple":
        return purple;
      case "red":
        return red;
      case "yellow":
        return yellow;
      default:
        return materialTheme;
    }
  }, [selectedColor]);

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync(
        isDarkMode ? palette.dark.elevation.level2 : palette.light.elevation.level2,
      );
    }
  }, [isDarkMode, palette]);

  const paperTheme = useMemo(() => {
    const darkTheme = { ...MD3DarkTheme, colors: palette.dark };
    const lightTheme = { ...MD3LightTheme, colors: palette.light };
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
  }, [materialTheme, selectedTheme, selectedColor]);

  return <PaperProvider theme={paperTheme}>{children}</PaperProvider>;
}
