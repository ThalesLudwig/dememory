import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import dateReducer from "./dateSlice";
import entriesReducer from "./entriesSlice";
import themeReducer from "./themeSlice";

const rootReducer = combineReducers({
  date: dateReducer,
  entries: persistReducer({ key: "entries", storage: AsyncStorage }, entriesReducer),
  theme: persistReducer({ key: "theme", storage: AsyncStorage }, themeReducer),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;
