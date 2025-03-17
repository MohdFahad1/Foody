import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useRouter } from "expo-router";

const IndexScreen = () => {
  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);

  const router = useRouter();

  useEffect(() => {
    ring1Padding.value = 0;
    ring2Padding.value = 0;
    setTimeout(() => {
      ring1Padding.value = withSpring(ring1Padding.value + hp(5));
      ring2Padding.value = withSpring(ring2Padding.value + hp(5.5));
    }, 300);

    setTimeout(() => {
      router.replace("home");
    }, 2200);
  }, []);
  return (
    <View className="items-center justify-center flex-1 space-y-10 bg-amber-500">
      <StatusBar style="light" />

      {/* log image with rings */}
      <Animated.View
        className="rounded-full bg-white/20"
        style={{ padding: ring2Padding }}
      >
        <Animated.View
          className="rounded-full bg-white/20"
          style={{ padding: ring1Padding }}
        >
          <Image
            source={require("../assets/images/welcome.png")}
            style={{ width: hp(20), height: hp(20) }}
          />
        </Animated.View>
      </Animated.View>

      {/* titoe & punchline */}
      <View className="flex items-center space-y-2">
        <Text
          className="font-bold tracking-widest text-white"
          style={{ fontSize: hp(7) }}
        >
          Foody
        </Text>
        <Text
          className="font-medium tracking-widest text-white"
          style={{ fontSize: hp(2) }}
        >
          Food is always right
        </Text>
      </View>
    </View>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({});
