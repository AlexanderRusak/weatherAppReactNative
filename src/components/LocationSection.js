import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Button,
  AsyncStorage,
} from "react-native";
import { WeatherComponent } from "./WeatherComponent";

export const LocationSection = ({
  location,
  geocode,
  errorMessage,
  updateCurrentLocation,
}) => {
  const [isLoading, setLoading] = useState("false");
  const getComponentState = (isReady) => {
    isReady ? setLoading(true) : setLoading(false);
  };
  return (
    <View style={styles.overlay}>
      <View style={styles.mainHeader}>
        <Text style={styles.heading1}>
          {geocode ? `${geocode[0].city}, ${geocode[0].isoCountryCode}` : ""}
        </Text>
     
        {isLoading && (
          <WeatherComponent
            isReady={() => getComponentState}
            lat={location.latitude}
            lon={location.longitude}
          />
        )}
      </View>
      <Text style={styles.heading2}>
        {location ? `${location.latitude}` : ""}
      </Text>
      <Text style={styles.heading2}>
        {location ? `${location.longitude}` : ""}
      </Text>
      <Text style={styles.heading2}>{errorMessage}</Text>
      <Button
        color="#fff"
        style={styles.buttonRefresh}
        title="Refresh"
        onPress={() => updateCurrentLocation()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainHeader: {
    flexDirection: "row",
  },
  overlay: {
    backgroundColor: "blue",
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  heading1: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 20,
  },
  heading2: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 10,
  },

  buttonRefresh: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 30,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    borderStyle: "solid",
  },
});
