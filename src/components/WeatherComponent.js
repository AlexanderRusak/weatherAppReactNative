import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";

class WeatherComponent extends React.Component {
  render() {
    return (
      <View style={styles.weatherHeader}>
        <Text style={styles.weatherFeelsLike}>
          {this.props.historyWeather.temperature ||
            Math.round(this.props.weather.main.temp - 273.15)}
          ℃, 
          {this.props.historyWeather.weather ||
            this.props.weather.weather[0].main}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  weatherHeader: {
 
  },
  weatherFeelsLike: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    marginLeft:10,
    marginBottom:10,
  },
});

function mapStateToProps(state) {
  return {
    weather: state.geolocation.weather,
    historyWeather: state.history.historyWeather,
  };
}
export default connect(mapStateToProps, null)(WeatherComponent);
