import { View, Text } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Recipes = () => {
  return (
    <View className="mx-4" style={{ marginTop: 12 }}>
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600"
      >
        Recipes
      </Text>
      <View></View>
    </View>
  );
};

export default Recipes;
