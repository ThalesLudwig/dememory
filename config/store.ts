import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dateReducer from "./dateSlice";

const rootReducer = combineReducers({
  date: persistReducer({ key: "date", storage: AsyncStorage }, dateReducer),
  // date: dateReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [],
});

export const persistor = persistStore(store);

export default store;
