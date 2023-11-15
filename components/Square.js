import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { useState } from "react";

export default function Square({ text, onPress }) {
  return (
    <View style={styles.square}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  square: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
  },
});
