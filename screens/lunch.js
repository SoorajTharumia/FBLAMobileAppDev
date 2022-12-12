import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";


const Grades = () => {
  return (
    <View style={styles.container}>
      <Text>Lunch Screen</Text>
      <Button title="Click Here" onPress={() => alert("Button Clicked!")} />
    </View>
  );
};

export default Grades;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});