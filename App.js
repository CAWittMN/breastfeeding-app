import { Pressable, View, Text } from "react-native";
import { useState, useEffect } from "react";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [lastBoobUsed, setLastBoobUsed] = useState("");

  const getAsyncData = async () => {
    try {
      const value = await AsyncStorage.getItem("lastBoobUsed");
      if (value !== null) {
        setLastBoobUsed(value);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const setAsyncData = async (value) => {
    try {
      await AsyncStorage.setItem("lastBoobUsed", value);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getAsyncData();
  }, []);

  const rightWidth = useSharedValue(lastBoobUsed === "right" ? 200 : 300);
  const rightHeight = useSharedValue(lastBoobUsed === "right" ? 200 : 100);
  const leftWidth = useSharedValue(lastBoobUsed === "left" ? 200 : 300);
  const leftHeight = useSharedValue(lastBoobUsed === "left" ? 200 : 100);
  const rightScale = useSharedValue(lastBoobUsed === "right" ? 0.75 : 1);
  const leftScale = useSharedValue(lastBoobUsed === "left" ? 0.75 : 1);

  const onPress = (side) => {
    if (side === "right") {
      rightWidth.value = withSpring(200);
      rightHeight.value = withSpring(200);
      rightScale.value = withSpring(0.75);
      leftWidth.value = withSpring(300);
      leftHeight.value = withSpring(100);
      leftScale.value = withSpring(1.1);
      setLastBoobUsed("right");
      setAsyncData("right");
    } else {
      leftWidth.value = withSpring(200);
      leftHeight.value = withSpring(200);
      leftScale.value = withSpring(0.75);
      rightWidth.value = withSpring(300);
      rightHeight.value = withSpring(100);
      rightScale.value = withSpring(1.1);
      setLastBoobUsed("left");
      setAsyncData("left");
    }
  };

  const onReset = () => {
    rightWidth.value = withSpring(300);
    rightHeight.value = withSpring(100);
    rightScale.value = withSpring(1);
    leftWidth.value = withSpring(300);
    leftHeight.value = withSpring(100);
    leftScale.value = withSpring(1);
  };

  return (
    <View className="flex w-full h-full items-center justify-center">
      <Pressable onPress={() => onPress("right")}>
        <Animated.View
          className="border rounded-full m-3"
          style={{
            transform: [{ scale: rightScale }],
            width: rightWidth,
            backgroundColor: "red",
            height: rightHeight,
          }}
        />
      </Pressable>
      <Pressable onPress={() => onPress("left")}>
        <Animated.View
          className="border rounded-full m-3"
          style={{
            transform: [{ scale: leftScale }],
            width: leftWidth,
            backgroundColor: "red",
            height: leftHeight,
          }}
        />
      </Pressable>
      <Pressable onPress={onReset}>
        <View className="border m-3 w-20 h-10 bg-red-500">
          <Text>Reset</Text>
        </View>
      </Pressable>
    </View>
  );
}
