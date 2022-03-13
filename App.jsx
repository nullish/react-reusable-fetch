import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import useApiRequest from "./hooks/useApiRequest";

const config = {
  headers: {
    /* Place heders here E.g.
    accessKey:
      "veryLongAPIkey",
    */
    "Content-Type": "application/json",
  }
};

export default function App() {
  const { data, error, isLoaded } = useApiRequest(
    "https://api.dictionaryapi.dev/api/v2/entries/en/plinth",
    config
  );
  console.log(data);
  if (error !== null) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Oops!</Text>
        <Text>{error.message}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
  if (data.length == 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Loading...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
  const meaning = data[0].meanings[0].definitions[0].definition;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Word definition:</Text>
      <Text>{meaning}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
  },
});
