import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { openWeatherApiKey } from "../../OpenweatherApiKey";
import {
  ERROR_GEOLOCATION_HANDLER,
  SET_GEOLOCATION,
  SET_GEOCODE,
  BEGIN_UPDATE,
  SET_WEATHER,
  SET_HISTORY_DATA,
} from "./actionTypes";
const informationArr = [];
export const fetchGeolocationWithWeather = () => {
  return async (dispatch) => {
    dispatch(beginUpdate(false));
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        dispatch(
          geolocationErrorHandler("Permission to access location was denied")
        );
      }
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      const { latitude, longitude } = location.coords;

      dispatch(setGeoLocation(location));
      let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
      dispatch(setReverseGeocode(geocode));
      //get weather object after response with latitude and longitude
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude.toFixed(
        2
      )}&lon=${longitude.toFixed(2)}&appid=${openWeatherApiKey}`;
      const response = await fetch(url);
      const responseJson = await response.json();
      dispatch(setWeather(responseJson));

      ////arr for history table
      informationArr.push({
        date: getFullDate(),
        temperature: (+responseJson.main.temp - 273).toFixed(1),
        city: geocode[0].city,
        country: geocode[0].country,
        geolocation: `${location.coords.latitude.toFixed(
          2
        )} - ${location.coords.longitude.toFixed(2)}`,
        street: geocode[0].street ? geocode[0].street : "",
        weather: responseJson.weather[0].main,
        isHistory: true,
      });
      dispatch(setHistoryData(informationArr));
    } catch (err) {
      dispatch(geolocationErrorHandler(err, "Error"));
    }
  };
};
function beginUpdate(isHistory) {
  return {
    type: BEGIN_UPDATE,
    isHistory,
  };
}
function setReverseGeocode(geocode) {
  return {
    type: SET_GEOCODE,
    geocode,
  };
}

function geolocationErrorHandler(errorMessage) {
  return {
    type: ERROR_GEOLOCATION_HANDLER,
    errorMessage,
  };
}
function setGeoLocation(location) {
  return {
    type: SET_GEOLOCATION,
    location,
  };
}
function setWeather(weather) {
  return {
    type: SET_WEATHER,
    weather,
  };
}
function setHistoryData(arrayData) {
  return {
    type: SET_HISTORY_DATA,
    historyData: arrayData,
  };
}
function getFullDate() {
  const date = new Date();
  const fullDate = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getHours()}:${date.getMinutes()}`;
  return fullDate;
}
