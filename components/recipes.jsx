import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";

const Recipes = ({ meals }) => {
  return (
    <View className="mx-4" style={{ marginTop: 12 }}>
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600"
      >
        Recipes
      </Text>
      <View>
        <MasonryList
          data={meals}
          keyExtractor={(item) => item.idMeal.toString()} // Ensure unique keys
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => <RecipeCard item={item} index={i} />}
          onEndReachedThreshold={0.1}
        />
      </View>
    </View>
  );
};

export default Recipes;

const RecipeCard = ({ item, index }) => {
  return (
    <View className="flex mb-4 space-y-1" style={{ width: "100%" }}>
      <Pressable style={{ width: "100%" }}>
        <Image
          source={{ uri: item.strMealThumb }}
          style={{ width: "100%", height: hp(35), borderRadius: 10 }}
          className="bg-black/5"
        />
      </Pressable>
      <Text className="text-center text-neutral-600">{item.strMeal}</Text>
    </View>
  );
};
