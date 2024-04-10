import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "red",
  },
  buttonLarge: {
    backgroundColor: "red",
    color: "red",
    transition: "all 0.3s",
  },
  buttonSmall: {
    backgroundColor: "blue",
    color: "blue",
    transition: "all 0.3s",
  },
});
