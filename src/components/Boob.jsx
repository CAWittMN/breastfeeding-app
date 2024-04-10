import React from "react";
import { View, Text, Pressable } from "react-native";

const Boob = ({ empty }) => {
  return (
    <Pressable onPress={empty}>
      <View>
        <Text className="text-red-500">
          Boobasdoifjaoifjaosfasdfasdfdifjaslkdfjalifjalsdkfjalsiefjalsdfkdja
        </Text>
      </View>
    </Pressable>
  );
};

export default Boob;
