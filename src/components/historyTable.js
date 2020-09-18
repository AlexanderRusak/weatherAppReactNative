import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { getWeather } from "../redux/actions/history";

class HistoryTable extends React.Component {
  render() {
    return (
      <View style={styles.historyContainer}>
        <FlatList
          data={this.props.historyData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableHighlight
              onPress={() => {            
                this.props.getWeather(this.props.historyData[index]);
                this.props.showHistory();
              }}
              underlayColor="#ccc"
              activeOpacity="0.9"
            >
              <View style={styles.flatItem}>
                <Text style={styles.flatText}>{item.date}</Text>
                <Text style={styles.flatText}>
                  {item.city},{item.temperature}C
                </Text>
                <Text style={styles.flatText}>{item.geolocation}</Text>
              </View>
            </TouchableHighlight>
          )}
        ></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  historyContainer: {
    width: "90%",
    height: "100%",
    alignSelf: "center",
    marginTop: 20,
  },
  flatItem: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "white",
    height: 60,
    marginTop:10,
  },
  flatText: {
    alignSelf: "center",
    fontSize: 20,
    color: "white",
  },
});
function mapStateToProps(state) {
  return {
    historyData: state.geolocation.historyData,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getWeather: (weather) => dispatch(getWeather(weather)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HistoryTable);
