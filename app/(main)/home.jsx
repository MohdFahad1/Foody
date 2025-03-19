import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import {
  BellIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Categories from "../../components/categories";
import axios from "axios";
import Recipes from "../../components/recipes";
import { useRouter } from "expo-router";
import RNPickerSelect from "react-native-picker-select";
import CustomDropdown from "../../components/dropdown";
import Areas from "../../components/areas";

const home = () => {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const router = useRouter();

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );

      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log("ERROR GETTING CATEGORIES: ", error.message);
    }
  };

  const handleChangeCategory = (category) => {
    getMealsByCategory(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getMealsByCategory = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );

      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.log("ERROR GETTING MEALS: ", error.message);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const response = await axios.get(
          `https://themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
        );
        if (response && response.data.meals && response.data.meals.length > 0) {
          router.push(`/recipeDetail/${response.data.meals[0].idMeal}`);
        } else {
          Alert.alert("No recipe found", "Please try another recipe");
        }
      } catch (error) {
        console.log("Error during search: ", error.message);
      } finally {
        setSearchQuery("");
      }
    }
  };

  const getAllAreas = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/list.php?a=list"
      );

      if (response && response.data) {
        setAreas(response.data.meals);
      }
    } catch (error) {
      console.log("ERROR GETTING AREAS:", error.message);
    }
  };

  const handleChangeArea = (area) => {
    setSelectedArea(area);
  };

  console.log("SELECTED AREA: ", selectedArea);

  useEffect(() => {
    getCategories();
    getMealsByCategory(activeCategory);
    getAllAreas();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="spac-y-6 pt-14"
      >
        {/* avatar and bell icon */}
        <View className="flex-row items-center justify-between mx-4 mb-2">
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{ height: hp(5.5), width: hp(5.5) }}
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* greetings and punchline */}
        <View className="mx-4 mb-2 space-y-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
            Hello, Fahad!
          </Text>
          <View>
            <Text
              style={{ fontSize: hp(3.8) }}
              className="font-semibold text-neutral-500"
            >
              Make your own food,
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-500"
          >
            stay at <Text className="text-amber-400">home</Text>
          </Text>
        </View>

        <View className="items-center">
          {/* search bar  */}
          <View className="flex-row items-center mx-4 p-[6px] rounded-full bg-black/5">
            <TextInput
              placeholder="Search any recipe"
              placeholderTextColor={"gray"}
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{ fontSize: hp(1.7) }}
              className="flex-1 pl-3 mb-1 tracking-wider"
            />
            <TouchableOpacity
              onPress={handleSearch}
              className="p-3 bg-white rounded-full"
            >
              <MagnifyingGlassIcon
                size={hp(2.7)}
                strokeWidth={3}
                color={"gray"}
              />
            </TouchableOpacity>
          </View>

          {/* drop down */}
          {/* <View
            className="flex items-center justify-center -ml-3 rounded-full bg-black/5"
            style={{ width: hp(5.5), height: hp(5.5) }}
          >
            <RNPickerSelect
              onValueChange={(value) => {
                setSelectedArea(value);
              }}
              items={areas.map((area) => ({
                label: area.strArea,
                value: area.strArea,
              }))}
              placeholder={{ label: "Select Area", value: null }}
              style={{
                inputAndroid: { color: "gray", fontSize: hp(1.7), padding: 10 },
                inputIOS: { color: "gray", fontSize: hp(1.7), padding: 10 },
              }}
            />
            <CustomDropdown
              items={areas.map((area) => area.strArea)}
              onSelect={(area) => setSelectedArea(area)}
              placeholder="Select Area"
            />
          </View> */}
        </View>

        {/* areas */}
        {areas.length > 0 && (
          <Areas
            activeArea={selectedArea}
            handleChangeArea={handleChangeArea}
            areas={areas}
          />
        )}

        {/* categories */}
        {categories.length > 0 && (
          <Categories
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
            categories={categories}
          />
        )}

        {/* recipes */}
        <View>
          <Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
};

export default home;
