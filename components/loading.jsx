import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const Loading = (props) => {
  return (
    <View
      className="flex items-center justify-center flex-1"
      style={{ marginTop: 100 }}
    >
      <ActivityIndicator {...props} />
    </View>
  );
};

export default Loading;
