import { combineReducers } from "redux";
import geolocation from "./geolocation";
import history from "./history";

export const rootReducer = combineReducers({
  geolocation: geolocation,
  history: history,
});
