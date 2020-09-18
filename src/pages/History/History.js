import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import HistoryTable from "../../components/historyTable";

export const History = ({ showHistory }) => (
  <View style={[styles.scene, { backgroundColor: "#673ab7" }]}>
    <HistoryTable showHistory={showHistory} />
  </View>
);

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
