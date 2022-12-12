import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {useState} from "react";

const Lunch = () => {
  const [lunch, setLunch] = useState("");
  const [breakfast, setBreakfast] = useState("");

  fetch("https://6266b23763e0f3825685c4a6.mockapi.io/LunchBreakfastAPI/1")
    .then((response) => response.json())
    .then((data) => {
      // Breakfast Menu
      var breakfastObjSize = data.breakfast.length;
      for (let i = 0; i < breakfastObjSize; i++) {
        if (i == 0) {
          let breakfast = data.breakfast[i].product.name;
          breakfast = breakfast.charAt(0).toUpperCase() + breakfast.slice(1);
          setBreakfast(breakfast);
        } else {
          let breakfast = data.breakfast[i].product.name;
          breakfastUpperCase =
            breakfast.charAt(0).toUpperCase() + breakfast.slice(1);
          breakfastFormated = ", " + breakfastUpperCase;
          setBreakfast(breakfastFormated);
        }
      }
      // Lunch menu
      var LunchObjSize = data.lunch.length;
      for (let i = 0; i < LunchObjSize; i++) {
        if (i == 0) {
          let lunch = data.lunch[i].product.name;
          lunch = lunch.charAt(0).toUpperCase() + lunch.slice(1);
          setLunch(lunch)
        } else {
          let lunch = data.lunch[i].product.name;
          lunchUpperCase = lunch.charAt(0).toUpperCase() + lunch.slice(1);
          lunchFormated = ", " + lunchUpperCase;
          setLunch(lunchFormated)
        }
      }
    });
  
  return (
    <View style={styles.container}>
      <Text>Breakfast Menu:</Text>
      <Text>{breakfast}</Text>
      <Text></Text>
      <Text>Lunch Menu:</Text>
      <Text>{lunch}</Text>
    </View>
  );
};

export default Lunch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }
});