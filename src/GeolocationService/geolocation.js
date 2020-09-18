import React from "react";
import { View, Text, ImageBackground, StyleSheet, Button } from "react-native";
import WeatherComponent from "../components/WeatherComponent";
import { fetchGeolocationWithWeather } from "../redux/actions/geolocation";
import { connect } from "react-redux";
import { Loader } from "../components/Loader";
import { getWeather } from "../redux/actions/history";

class Geolocation extends React.Component {
  state = {
    isHistory: this.props.isHistory,
  };
  componentDidMount() {
    if (!this.props.location && !this.props.geocode) {
      this.props.fetchGeolocationWithWeather();
    }
  }

  render() {
    return (
      <View style={styles.main}>
        {this.props.location && this.props.geocode ? (
          <View>
            <Text style={styles.countryHeader}>
              {this.props.historyWeather.city || this.props.geocode[0].city},
              {this.props.historyWeather.country ||
                this.props.geocode[0].country}
            </Text>
            {this.props.weather && <WeatherComponent />}
            <Text style={styles.geolocation}>
              Geolocation:
              {this.props.historyWeather.geolocation ||
                `${this.props.location.coords.latitude
                  .toString()
                  .slice(
                    0,
                    4
                  )}- ${this.props.location.coords.longitude
                  .toString()
                  .slice(0, 4)}`}
            </Text>
            {(this.props.historyWeather.street ||
              this.props.geocode[0].street) && (
              <Text>
                Address:
                {this.props.historyWeather.street ||
                  this.props.geocode[0].street}
              </Text>
            )}
            <View style={styles.refreshButton}>
            <Button
              style={{fontSize:20}}
              color= {"#fff"}
              
              onPress={() => {
                this.props.fetchGeolocationWithWeather();
                this.props.getWeather({});
              }}
              title="Refresh"
            />
            </View>
            
          </View>
        ) : (
          <View style={styles.loading}>
            <Loader />
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    width: "80%",
    height: "35%",
    backgroundColor: "rgba(0, 0, 0,0.5)",
    flexDirection: "row",
    justifyContent: "flex-start",
    borderWidth: 2,
    borderColor: "#ccc",
    borderStyle: "solid",
    borderRadius: 15,
  },
  loading: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    width: "100%",
  },
  countryHeader: {
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  geolocation: {
    fontSize: 20,
    marginHorizontal: 10,
    fontWeight: "bold",
    color: "#fff",
    width: "100%",
  },
  refreshButton:{
    alignSelf: "flex-start",
  },
  button:{
    fontSize:20,
  }
});

function mapStateToProps(state) {
  return {
    location: state.geolocation.location,
    geocode: state.geolocation.geocode,
    errorMessage: state.geolocation.errorMessage,
    weather: state.geolocation.weather,
    isHistory: state.geolocation.isHistory,
    historyWeather: state.history.historyWeather,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchGeolocationWithWeather: () => {
      dispatch(fetchGeolocationWithWeather());
    },
    getWeather: (weather) => dispatch(getWeather(weather)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Geolocation);
