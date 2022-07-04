import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import logoImg from "../assets/images/logo/logo.png";

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(true) + 16,
    paddingHorizontal: 24,
    paddingBottom: 60,
    backgroundColor: "#8257E5",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  tasks: {
    alignItems: "center",
    flexDirection: "row",
  },
  tasksCounter: {
    fontSize: 15,
    color: "#FFF",
    fontFamily: "Inter-Regular",
  },
  tasksCounterBold: {
    fontSize: 15,
    color: "#FFF",
    fontFamily: "Inter-Bold",
  },
});

interface HeaderProps {
  tasksCounter: number;
}

export const Header: React.FC<HeaderProps> = ({ tasksCounter }) => {
  let tasksCounterText = "tarefa";

  if (tasksCounter !== 1) {
    tasksCounterText += "s";
  }

  return (
    <View style={styles.container}>
      <Image source={logoImg} />

      <View style={styles.tasks}>
        <Text style={styles.tasksCounter}>Você tem </Text>
        <Text style={styles.tasksCounterBold}>
          {tasksCounter} {tasksCounterText}
        </Text>
      </View>
    </View>
  );
};
