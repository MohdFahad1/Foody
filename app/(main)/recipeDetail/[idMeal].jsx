import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import { HeartIcon, Square3Stack3DIcon } from "react-native-heroicons/solid";
import Loading from "../../../components/loading";
import YoutubeIframe from "react-native-youtube-iframe";
import { CachedImage } from "../../../helpers/image";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

const RecipeDetail = () => {
  const router = useRouter();
  const { idMeal } = useLocalSearchParams();
  const [mealData, setMealData] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const [loading, setLoading] = useState(true);

  const getMealById = async (id) => {
    try {
      let response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );

      if (response && response.data) {
        setMealData(response.data.meals[0]);
        setLoading(false);
      }
    } catch (error) {
      console.log("ERROR GETTING DETAILS FROM ID: ", error.message);
    }
  };

  const ingredientsIndexes = (meal) => {
    if (!meal) {
      return [];
    }
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (
        meal["strIngredient" + i] &&
        meal["strIngredient" + i].trim() !== ""
      ) {
        indexes.push(i);
      }
    }

    return indexes;
  };
  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);

    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  useEffect(() => {
    getMealById(idMeal);
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
        sharedTransitionTag={`meal-${mealData?.idMeal}`}
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
      {/* <CachedImage 
        uri={isTemplateExpression.strMealThumb}
        sharedTransitionTag = {item.strMeal}
        style={{ width: wp(98), height: hp(50), borderRadius: 53,}}
      /> */}
      <Animated.View
        entering={FadeIn.delay(200).duration(800)}
        className="absolute flex-row items-center justify-between w-full pt-14"
      >
        {/* back button */}
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
      </Animated.View>

      {/* meal description */}
      {loading ? (
        <Loading size="large" className="mt-16" color="#fbbf24" />
      ) : (
        <View className="flex justify-between px-4 pt-8">
          {/* name & area */}
          <Animated.View
            entering={FadeInDown.duration(700).springify().damping(12)}
            className="my-2"
          >
            <Text
              style={{ fontSize: hp(3) }}
              className="flex-1 font-bold text-neutral-700"
            >
              {mealData?.strMeal}
            </Text>

            <Text
              style={{ fontSize: hp(2) }}
              className="flex-1 font-medium text-neutral-500"
            >
              {mealData?.strArea}
            </Text>
          </Animated.View>

          {/* misc */}
          <Animated.View
            entering={FadeInDown.delay(100)
              .duration(700)
              .springify()
              .damping(12)}
            className="flex-row justify-around my-3"
          >
            <View className="flex p-2 rounded-full bg-amber-300">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="flex items-center justify-center bg-white rounded-full"
              >
                <ClockIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
              </View>

              <View className="flex items-center py-2 space-y-2">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  35
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Mins
                </Text>
              </View>
            </View>

            <View className="flex p-2 rounded-full bg-amber-300">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="flex items-center justify-center bg-white rounded-full"
              >
                <UserIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
              </View>

              <View className="flex items-center py-2 space-y-2">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  03
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Servings
                </Text>
              </View>
            </View>

            <View className="flex p-2 rounded-full bg-amber-300">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="flex items-center justify-center bg-white rounded-full"
              >
                <FireIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
              </View>

              <View className="flex items-center py-2 space-y-2">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  103
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Cal
                </Text>
              </View>
            </View>

            <View className="flex p-2 rounded-full bg-amber-300">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="flex items-center justify-center bg-white rounded-full"
              >
                <Square3Stack3DIcon
                  size={hp(4)}
                  strokeWidth={2.5}
                  color={"#525252"}
                />
              </View>

              <View className="flex items-center py-2 space-y-2">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                ></Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Easy
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* ingredients */}
          <Animated.View
            entering={FadeInDown.delay(200)
              .duration(700)
              .springify()
              .damping(12)}
            className="my-4"
          >
            <Text
              style={{ fontSize: hp(2.5) }}
              className="flex-1 font-bold text-neutral-700"
            >
              Ingredients
            </Text>

            <View className="ml-3">
              {ingredientsIndexes(mealData).map((i) => {
                const measure = mealData[`strMeasure${i}`];
                const ingredient = mealData[`strIngredient${i}`];

                if (!ingredient || ingredient.trim() === "") {
                  return null;
                }
                return (
                  <View key={i} className="flex-row items-center gap-2 mt-4">
                    {/* Bullet point */}
                    <View
                      className="rounded-full bg-amber-300"
                      style={{ height: hp(1.5), width: hp(1.5) }}
                    ></View>

                    {/* Ingredient name and measure */}
                    <Text
                      style={{ fontSize: hp(1.7) }}
                      className="font-extrabold text-neutral-700"
                    >
                      {ingredient}
                    </Text>
                    <Text
                      style={{ fontSize: hp(1.7) }}
                      className="mx-2 font-medium text-neutral-600"
                    >
                      {measure}
                    </Text>
                  </View>
                );
              })}
            </View>
          </Animated.View>

          {/* Instructions */}
          <Animated.View
            entering={FadeInDown.delay(300)
              .duration(700)
              .springify()
              .damping(12)}
            className="mt-4"
          >
            <Text
              style={{ fontSize: hp(2.5) }}
              className="flex-1 font-bold text-neutral-700"
            >
              Instructions
            </Text>

            <Text style={{ fontSize: hp(1.6) }} className="text-neutral-700">
              {mealData?.strInstructions}
            </Text>
          </Animated.View>

          {/* recipe video */}
          {mealData?.strYoutube && (
            <Animated.View
              entering={FadeInDown.delay(400)
                .duration(700)
                .springify()
                .damping(12)}
              className="my-4"
            >
              <Text
                style={{ fontSize: hp(2.5) }}
                className="flex-1 font-bold text-neutral-700"
              >
                Recipe Video
              </Text>
              <View>
                <YoutubeIframe
                  videoId={getYoutubeVideoId(mealData?.strYoutube)}
                  height={hp(30)}
                />
              </View>
            </Animated.View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default RecipeDetail;
