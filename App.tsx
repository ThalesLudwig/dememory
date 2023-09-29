import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import { WalletConnectModal } from "@walletconnect/modal-react-native";

import Router from "./Components/Router";
import ThemeProvider from "./Components/ThemeProvider";
import store, { persistor } from "./config/store";
import LocaleProvider from "./Components/LocaleProvider";

import "./i18n";

const projectId = process.env.EXPO_PUBLIC_WALLET_CONNECT_ID || "";

const providerMetadata = {
  name: "Dememory",
  description: "Your memories on the Blockchain.",
  url: "https://your-project-website.com/",
  icons: ["https://your-project-logo.com/"],
  redirect: {
    native: "dememory://",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          <LocaleProvider>
            <NavigationContainer theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
              <WalletConnectModal projectId={projectId} providerMetadata={providerMetadata} />
              <StatusBar style="auto" />
              <Router />
            </NavigationContainer>
          </LocaleProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
