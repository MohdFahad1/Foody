import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { ChevronDownIcon } from "react-native-heroicons/outline"; // Optional: Add an icon for the dropdown button
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, { Easing, withTiming } from "react-native-reanimated"; // Import from react-native-reanimated

const CustomDropdown = ({ items, onSelect, placeholder }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Animation value
  const modalAnim = useState(new Animated.Value(0))[0]; // Modal slide-in animation value

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);

    // Trigger animation for modal sliding
    Animated.timing(modalAnim, {
      toValue: isModalVisible ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
    }).start();
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    onSelect(item); // Pass selected item back to parent component
    toggleModal(); // Close dropdown after selection
  };

  // Calculate modal slide-in translation based on animation value
  const translateY = modalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0], // Slide in from bottom
  });

  return (
    <View className="space-y-4">
      {/* Display selected item or placeholder */}
      <TouchableOpacity
        onPress={toggleModal}
        className="flex-row items-center justify-between p-3 bg-gray-100 border border-gray-300 rounded-full"
      >
        <Text className="text-sm text-gray-600">
          {selectedItem || placeholder}
        </Text>
        <ChevronDownIcon size={hp(2.7)} color="gray" />
      </TouchableOpacity>

      {/* Modal for dropdown list with animation */}
      <Modal
        animationType="none"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View className="items-center justify-center flex-1 bg-black/50">
          <Animated.View
            style={[
              {
                width: "80%",
                backgroundColor: "#fff",
                borderRadius: 10,
                padding: 20,
                maxHeight: "50%",
              },
              {
                transform: [{ translateY }],
              },
            ]}
          >
            <FlatList
              data={items}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelectItem(item)}
                  className="py-3"
                >
                  <Text className="text-lg text-gray-800">{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomDropdown;
