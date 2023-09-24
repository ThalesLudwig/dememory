import { ReactNode, useMemo } from "react";
import { Platform, useColorScheme } from "react-native";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import * as NavigationBar from "expo-navigation-bar";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";

// import { Platform } from "react-native";
// import { MaterialYouService, useMaterialYouPalette, defaultPalette } from "@assembless/react-native-material-you";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const isDarkMode = useMemo(() => colorScheme === "dark", [colorScheme]);

  if (Platform.OS === "android") {
    NavigationBar.setBackgroundColorAsync(isDarkMode ? theme.dark.surfaceContainerHigh : theme.light.surfaceContainer);
  }

  const paperTheme = useMemo(
    () => (isDarkMode ? { ...MD3DarkTheme, colors: theme.dark } : { ...MD3LightTheme, colors: theme.light }),
    [colorScheme, theme],
  );

  // if (Platform.OS === "android") -> apply Material You
  return <PaperProvider theme={paperTheme}>{children}</PaperProvider>;
}
