import { UPDATE_HISTORY_DATA } from "../actions/actionTypes";

const INITIAL_STATE = {
  historyWeather: {},
};

export default function history(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_HISTORY_DATA:
      return {
        ...state,
        historyWeather: action.weather,
      };
    default:
      return state;
  }
}
