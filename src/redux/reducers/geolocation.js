import {
  ERROR_GEOLOCATION_HANDLER,
  SET_GEOLOCATION,
  SET_GEOCODE,
  BEGIN_UPDATE,
  SET_WEATHER,
  SET_HISTORY_DATA,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  location: null,
  geocode: null,
  errorMessage: "",
  weather: null,
  historyData: [],
  isHistory: false,
};

export default function geolocation(state = INITIAL_STATE, action) {
  switch (action.type) {
    case BEGIN_UPDATE:
      return {
        ...state,
        location: null,
        geocode: null,
        errorMessage: "",
        isHistory: action.isHistory,
      };
    case ERROR_GEOLOCATION_HANDLER:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };

    case SET_GEOLOCATION:
      return {
        ...state,
        location: action.location,
      };

    case SET_GEOCODE:
      return {
        ...state,
        geocode: action.geocode,
      };
    case SET_WEATHER:
      return {
        ...state,
        weather: action.weather,
      };
    case SET_HISTORY_DATA:
      return {
        ...state,
        historyData: action.historyData,
      };
    default:
      return state;
  }
}
