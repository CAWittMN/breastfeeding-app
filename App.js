import { Pressable, View, Text } from "react-native";
import { useState, useEffect } from "react";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [lastBoobUsed, setLastBoobUsed] = useState("");

  const setAsyncData = async (value) => {
    try {
      await AsyncStorage.setItem("lastBoobUsed", value);
    } catch (e) {
      console.error(e);
    }
  };

  const rightWidth = useSharedValue(300);
  const rightHeight = useSharedValue(100);
  const rightScale = useSharedValue(1);
  const leftWidth = useSharedValue(300);
  const leftHeight = useSharedValue(100);
  const leftScale = useSharedValue(1);

  useEffect(() => {
    const getAsyncData = async () => {
      try {
        const value = await AsyncStorage.getItem("lastBoobUsed");
        if (value !== null) {
          setLastBoobUsed(value);
          rightWidth.value = withSpring(value === "right" ? 200 : 300);
          rightHeight.value = withSpring(value === "right" ? 200 : 100);
          rightScale.value = withSpring(value === "right" ? 0.75 : 1);
          leftWidth.value = withSpring(value === "left" ? 200 : 300);
          leftHeight.value = withSpring(value === "left" ? 200 : 100);
          leftScale.value = withSpring(value === "left" ? 0.75 : 1);
          console.log("Async data fetched" + lastBoobUsed);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getAsyncData();
    console.log("Async data fetched" + lastBoobUsed);
  }, []);

  const onPress = (side) => {
    if (side === "right") {
      rightWidth.value = withSpring(200);
      rightHeight.value = withSpring(200);
      rightScale.value = withSpring(0.75);
      leftWidth.value = withSpring(300);
      leftHeight.value = withSpring(100);
      leftScale.value = withSpring(1.1);
    } else if (side === "left") {
      leftWidth.value = withSpring(200);
      leftHeight.value = withSpring(200);
      leftScale.value = withSpring(0.75);
      rightWidth.value = withSpring(300);
      rightHeight.value = withSpring(100);
      rightScale.value = withSpring(1.1);
    }
    setLastBoobUsed(side);
    setAsyncData(side);
  };

  const onReset = () => {
    setAsyncData("");
    setLastBoobUsed("");
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
          id="boob"
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
          id="boob"
          className="border rounded-full m-3"
          style={{
            transform: [{ scale: leftScale }],
            width: leftWidth,
            backgroundColor: "red",
            height: leftHeight,
          }}
        />
        <Animated.View
          id="nipple"
          className=""
          style={{ border: "1px solid black" }}
        ></Animated.View>
      </Pressable>
      <Pressable onPress={onReset}>
        <View className="border m-3 w-20 h-10 bg-red-500">
          <Text>Reset</Text>
        </View>
      </Pressable>
      <Text>Last boob used: {lastBoobUsed}</Text>
    </View>
  );
}
