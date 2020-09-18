import React from "react";


import { View, Text, ActivityIndicator } from "react-native";

export const Loader = () => {
  return (
    <View>
      <ActivityIndicator 
        size="large"
      />
    </View>
  );
};
