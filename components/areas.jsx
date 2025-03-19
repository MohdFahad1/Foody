import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";

const Areas = ({ areas, handleChangeArea, activeArea }) => {
  return (
    <View className="mx-4" style={{ marginTop: 10 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {areas.map((area, index) => {
          let isActive = area.strArea === activeArea;

          const activeButtonStyle = isActive
            ? { backgroundColor: "#fbbf24" }
            : { backgroundColor: "rgba(0, 0, 0, 0.1)" };

          return (
            <Animated.View
              key={index}
              entering={FadeInRight.duration(500).delay(index * 100)} // Apply staggered delay
              style={{ marginRight: 16 }}
            >
              <TouchableOpacity
                onPress={() => handleChangeArea(area.strArea)}
                className="flex items-center space-y-1"
              >
                <View className="rounded-full p-[6px] bg-black/5">
                  <Text className="text-neutral-600">{area.strArea}</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Areas;
