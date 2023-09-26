import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import Router from "./Components/Router";
import ThemeProvider from "./Components/ThemeProvider";
import store, { persistor } from "./config/store";
import LocaleProvider from "./Components/LocaleProvider";

import "./i18n";

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          <LocaleProvider>
            <NavigationContainer theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
              <StatusBar style="auto" />
              <Router />
            </NavigationContainer>
          </LocaleProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
