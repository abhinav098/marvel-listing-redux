import { combineReducers } from "redux";
import listingReducer from "./listingReducer";
import showReducer from "./showReducer";
const rootReducer = combineReducers({
  listingReducer: listingReducer,
  resourceShow: showReducer,
});

export default rootReducer;
