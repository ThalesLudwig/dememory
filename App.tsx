import { StatusBar } from "expo-status-bar";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import Router from "./Components/Router";
import ThemeProvider from "./Components/ThemeProvider";
import store, { persistor } from "./config/store";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <Router />
          </NavigationContainer>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
