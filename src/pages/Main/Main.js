import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  ImageBackground,
} from "react-native";
import Geolocation from "../../GeolocationService/geolocation";

export class Main extends React.Component {
  state = {
    image: "",
  };
  componentWillMount() {
    this.setState(() => {
      return {
        image: require("../../images/background.jpg"),
      };
    });
  }

  render() {
    return (
      <ImageBackground source={this.state.image} style={styles.image}>
        <View style={[styles.scene]}>
          <Geolocation
            getGeolocation={this.getGeoData}
            generateHistoryData={this.props.generateHistoryData}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    paddingTop: 150,
    alignItems: "center",
  },
  locationContainer: {
    backgroundColor: "#ccc",
    marginTop: 20,
    alignItems: "flex-start",
    marginHorizontal: 20,
  },
  weatherContainer: {
    backgroundColor: "#ccc",
    marginTop: 20,
    alignItems: "center",
    marginHorizontal: 20,
  },
  locationText: {
    fontSize: 22,
  },
  image: {
    flex: 1,
  },
});
