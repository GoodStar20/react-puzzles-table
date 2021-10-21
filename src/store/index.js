import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import configureStore from "./config";
import coreReducer from "./core/reducers";
import authReducer from "./auth/reducers";

const corePersistConfig = {
  key: "core",
  whitelist: ["users", "columns"],
  storage,
};

const authPersistConfig = {
  key: "auth",
  whitelist: [],
  storage,
};

const rootReducer = combineReducers({
  core: persistReducer(corePersistConfig, coreReducer),
  auth: persistReducer(authPersistConfig, authReducer),
});

const initialState = window.initialReduxState;
const { store } = configureStore(initialState, rootReducer);
const persistor = persistStore(store);

export { store, persistor };
