import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import { CachedImage } from "../helpers/image";

const Categories = ({ activeCategory, handleChangeCategory, categories }) => {
  return (
    <Animated.View
      entering={FadeInDown.duration(500).springify()}
      className="mx-4"
      style={{ marginTop: 10 }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((cat, index) => {
          let isActive = cat.strCategory == activeCategory;

          const activeButtonStyle = isActive
            ? { backgroundColor: "#fbbf24" }
            : { backgroundColor: "rgba(0, 0, 0, 0.1)" };

          return (
            <TouchableOpacity
              key={cat.idCategory}
              onPress={() => handleChangeCategory(cat.strCategory)}
              className="flex items-center space-y-1"
              style={{ marginRight: 16 }}
            >
              <View className="rounded-full p-[6px]" style={activeButtonStyle}>
                {/* <Image
                  source={{ uri: cat.strCategoryThumb }}
                  style={{ width: hp(6), height: hp(6) }}
                  className="rounded-full"
                /> */}
                <CachedImage
                  uri={cat.strCategoryThumb}
                  style={{ width: hp(6), height: hp(6) }}
                  className="rounded-full"
                />
              </View>
              <Text className="text-neutral-600">{cat.strCategory}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;
