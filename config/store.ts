import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import dateReducer from "./dateSlice";
import entriesReducer from "./entriesSlice";
import themeReducer from "./themeSlice";
import localeReducer from "./localeSlice";
import profileReducer from "./profileSlice";
import settingsReducer from "./settingsSlice";
import keysReducer from "./keysSlice";

const rootReducer = combineReducers({
  date: dateReducer,
  entries: persistReducer({ key: "entries", storage: AsyncStorage }, entriesReducer),
  theme: persistReducer({ key: "theme", storage: AsyncStorage }, themeReducer),
  locale: persistReducer({ key: "locale", storage: AsyncStorage }, localeReducer),
  profile: persistReducer({ key: "profile", storage: AsyncStorage }, profileReducer),
  settings: persistReducer({ key: "settings", storage: AsyncStorage }, settingsReducer),
  keys: persistReducer({ key: "keys", storage: AsyncStorage }, keysReducer),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;
