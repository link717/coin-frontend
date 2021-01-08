import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import setViewRedeucer from "./CheckView";
import setCurrencyRedeucer from "./CheckCurrency";
import setCountRedeucer from "./CheckCount";
import setCoinDataRedeucer from "./CheckCoinData";
import setBookmarkDataRedeucer from "./CheckBookmark";
import setPageRedeucer from "./CheckPage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

const rootReducer = combineReducers({
  setViewRedeucer,
  setCurrencyRedeucer,
  setCountRedeucer,
  setCoinDataRedeucer,
  setBookmarkDataRedeucer,
  setPageRedeucer,
});

export default persistReducer(persistConfig, rootReducer);
