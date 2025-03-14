import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import "../global.css";

const IndexScreen = () => {
  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar style="light" />
      <Text className="text-white">Welcome Screen</Text>
    </View>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({});
