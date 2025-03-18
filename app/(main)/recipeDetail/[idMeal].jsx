import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";

const RecipeDetail = () => {
  const router = useRouter();
  const { idMeal } = useLocalSearchParams();
  const [mealData, setMealData] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);

  const getMealById = async () => {
    try {
      let response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
      );

      if (response && response.data) {
        setMealData(response.data.meals[0]);
      }
    } catch (error) {
      console.log("ERROR GETTING DETAILS FROM ID: ", error.message);
    }
  };

  useEffect(() => {
    getMealById();
  }, [idMeal]);

  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style="light" />

      {/* recipe image */}
      <Image
        source={{ uri: mealData?.strMealThumb }}
        style={{
          width: wp(98),
          height: hp(55),
          borderRadius: 35,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          marginTop: 4,
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        }}
      />
      <View className="absolute flex-row items-center justify-between w-full pt-14">
        <TouchableOpacity
          className="p-2 ml-5 bg-white rounded-full"
          onPress={() => router.back()}
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color={"#fbbf24"} />
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 mr-5 bg-white rounded-full"
          onPress={() => setIsFavourite(!isFavourite)}
        >
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color={isFavourite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RecipeDetail;
