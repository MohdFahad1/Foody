import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import Animated, { FadeInDown } from "react-native-reanimated";
import Loading from "./loading";
import { CachedImage } from "../helpers/image";

const Recipes = ({ meals, categories }) => {
  return (
    <View className="mx-4" style={{ marginTop: 12 }}>
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600"
      >
        Recipes
      </Text>
      <View>
        {categories.length == 0 || meals.length == 0 ? (
          <Loading size="large" />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => <RecipeCard item={item} index={i} />}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
};

export default Recipes;

const RecipeCard = ({ item, index }) => {
  let isEven = index % 2 == 0;
  return (
    <Animated.View
      entering={FadeInDown.duration(600)
        .springify()
        .delay(index * 100)
        .damping(20)}
      className="flex mb-4 space-y-1"
      style={{ width: "100%", marginTop: 10 }}
    >
      <Pressable
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
      >
        {/* <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          }}
        /> */}
        <CachedImage
          uri={item.strMealThumb}
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          }}
        />
        <Text
          className="font-semibold text-neutral-600"
          style={{ marginLeft: 2, fontSize: hp(1.5) }}
        >
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
