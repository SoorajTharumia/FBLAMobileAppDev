import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {useState} from "react";

const Lunch = () => {
  const [lunch, setLunch] = useState([]);
  const [breakfast, setBreakfast] = useState([]);

  fetch("https://6266b23763e0f3825685c4a6.mockapi.io/LunchBreakfastAPI/1")
    .then((response) => response.json())
    .then((data) => {
      // Breakfast Menu
      var breakfastObjSize = data.breakfast.length;
      var breakfastDiv = "";
      for (let i = 0; i < breakfastObjSize; i++) {
        if (i == 0) {
          let breakfast = data.breakfast[i].product.name;
          breakfast = breakfast.charAt(0).toUpperCase() + breakfast.slice(1);
          breakfastDiv += breakfast;
        } else {
          let breakfast = data.breakfast[i].product.name;
          breakfastUpperCase =
            breakfast.charAt(0).toUpperCase() + breakfast.slice(1);
          breakfastFormated = ", " + breakfastUpperCase;
          breakfastDiv += breakfastFormated
        }
      }
      setBreakfast(breakfastDiv)
      // Lunch menu
      var LunchObjSize = data.lunch.length;
      var lunchDiv = "";
      for (let i = 0; i < LunchObjSize; i++) {
        if (i == 0) {
          let lunch = data.lunch[i].product.name;
          lunch = lunch.charAt(0).toUpperCase() + lunch.slice(1);
          lunchDiv += lunch;
        } else {
          let lunch = data.lunch[i].product.name;
          lunchUpperCase = lunch.charAt(0).toUpperCase() + lunch.slice(1);
          lunchFormated = ", " + lunchUpperCase;
          lunchDiv += lunchFormated;
        }
      }
      setLunch(lunchDiv);
    });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        For our main courses at all Parkland Schools, please see the Lunch menu
        below!
      </Text>
      <View>
        <Text style={styles.subtext}>Breakfast Menu: {breakfast} </Text>
      </View>

      <View>
        <Text style={styles.subtext}>Lunch Menu: {lunch}</Text>
      </View>
    </View>
  );
};

export default Lunch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#484B70",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    padding: 8,
    fontStyle: "italic",
    position: "absolute",
    top: 5,
  },
  subtext: {
    fontSize: 20,
    color: "#fff",
    fontStyle: "italic",
    padding: 20,
  }, menu: {
    fontSize: 15,
    color: "#fff",
  }
});