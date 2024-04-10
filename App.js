import { Pressable, View, Text } from "react-native";
import { useState, useEffect } from "react";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

const bigWidth = 200;
const smallWidth = 110;
const bigHeight = 200;
const smallHeight = 270;
const bigScale = 1;
const smallScale = 0.75;

export default function App() {
  const [lastBoobUsed, setLastBoobUsed] = useState("");

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
          rightWidth.value = withSpring(
            value === "right" ? smallWidth : bigWidth
          );
          rightHeight.value = withSpring(
            value === "right" ? smallHeight : bigHeight
          );
          rightScale.value = withSpring(
            value === "right" ? smallScale : bigScale
          );
          leftWidth.value = withSpring(
            value === "left" ? smallWidth : bigWidth
          );
          leftHeight.value = withSpring(
            value === "left" ? smallHeight : bigHeight
          );
          leftScale.value = withSpring(
            value === "left" ? smallScale : bigScale
          );
          console.log("Async data fetched" + lastBoobUsed);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getAsyncData();
    console.log("Async data fetched" + lastBoobUsed);
  }, []);

  const setAsyncData = async (value) => {
    try {
      await AsyncStorage.setItem("lastBoobUsed", value);
    } catch (e) {
      console.error(e);
    }
  };

  const onPress = (side) => {
    if (side === "right") {
      rightWidth.value = withSpring(smallWidth);
      rightHeight.value = withSpring(smallHeight);
      rightScale.value = withSpring(smallScale);
      leftWidth.value = withSpring(bigWidth);
      leftHeight.value = withSpring(bigHeight);
      leftScale.value = withSpring(bigScale);
    } else if (side === "left") {
      leftWidth.value = withSpring(smallWidth);
      leftHeight.value = withSpring(smallHeight);
      leftScale.value = withSpring(smallScale);
      rightWidth.value = withSpring(bigWidth);
      rightHeight.value = withSpring(bigHeight);
      rightScale.value = withSpring(bigScale);
    }
    setLastBoobUsed(side);
    setAsyncData(side);
  };

  const onReset = () => {
    setAsyncData("");
    setLastBoobUsed("");
    rightWidth.value = withSpring(190);
    rightHeight.value = withSpring(190);
    rightScale.value = withSpring(1);
    leftWidth.value = withSpring(190);
    leftHeight.value = withSpring(190);
    leftScale.value = withSpring(1);
  };

  return (
    <View className="w-full h-full items-center justify-center">
      <View className="flex flex-row border w-full h-[300px]">
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
          <Animated.View id="nipple"></Animated.View>
        </Pressable>
      </View>
      <Pressable onPress={onReset}>
        <View className="border m-3 w-20 h-10 bg-red-500">
          <Text>Reset</Text>
        </View>
      </Pressable>
      <Text>Last boob used: {lastBoobUsed}</Text>
    </View>
  );
}
