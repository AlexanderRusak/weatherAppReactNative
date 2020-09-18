import { UPDATE_HISTORY_DATA } from "./actionTypes";

export const getWeather = (weather) => {
  return (dispatch) => {
   
    
    dispatch(updateweather(weather));
  };
};

const updateweather = (weather) => {

  return {
    type: UPDATE_HISTORY_DATA,
    weather,
  };
};
