import { ReactNode } from "react";
import { Platform } from "react-native";
import { PaperProvider } from "react-native-paper";

import * as NavigationBar from "expo-navigation-bar";

// import { Platform } from "react-native";
// import { MaterialYouService, useMaterialYouPalette, defaultPalette } from "@assembless/react-native-material-you";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  if (Platform.OS === "android") {
    NavigationBar.setBackgroundColorAsync("#eee8f4");
  }

  // if (Platform.OS === "android") -> apply Material You
  return <PaperProvider>{children}</PaperProvider>;
}
