import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import Animated, { FadeInRight } from "react-native-reanimated";

const Areas = ({ areas, handleChangeArea, activeArea }) => {
  return (
    <View style={{ marginHorizontal: 16, marginTop: 10 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {areas.map((area, index) => {
          const isActive = area.strArea === activeArea;

          const activeButtonStyle = isActive
            ? {
                backgroundColor: "rgba(0, 0, 0, 0.15)",
                borderRadius: 20,
                paddingVertical: 8,
                paddingHorizontal: 10,
              }
            : {
                backgroundColor: "transparent",
                borderRadius: 20,
                paddingVertical: 8,
                paddingHorizontal: 10,
                borderColor: "rgba(0, 0, 0, 0.05)",
                borderWidth: 1,
              };

          return (
            <Animated.View
              key={index}
              entering={FadeInRight.duration(500).delay(index * 100)}
              style={{ marginRight: 16 }}
            >
              <TouchableOpacity
                onPress={() => handleChangeArea(isActive ? null : area.strArea)}
                style={activeButtonStyle}
              >
                <Text
                  style={{
                    color: isActive ? "#333" : "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  {area.strArea}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Areas;
