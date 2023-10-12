import "./i18n";

import { StatusBar } from "expo-status-bar";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import Router from "./Components/Router";
import ThemeProvider from "./Components/ThemeProvider";
import store, { persistor } from "./config/store";
import LocaleProvider from "./Components/LocaleProvider";
import WalletProvider from "./Components/WalletProvider";
import NavigationProvider from "./Components/NavigationProvider";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          <LocaleProvider>
            <NavigationProvider>
              <WalletProvider />
              <StatusBar style="auto" />
              <Router />
            </NavigationProvider>
          </LocaleProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
