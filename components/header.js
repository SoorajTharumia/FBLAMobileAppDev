import React from "react";
import { StyleSheet, Text, View, Image } from "react-native"; 
import Parkland from "../assets/icons/parkland-school-logo.png";
import ParklandLogo from "../assets/icons/parkland.gif";


const Header = () => {
  return (
    <View style={styles.header}>
      <Image source={ParklandLogo} style={styles.image} />
      <Text style={ styles.text}>Parkland School District</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 100,
    paddingTop: 36,
    backgroundColor: "#242526",
    justifyContent: "center",
    borderBottomColor: "#525252",
    borderBottomWidth: 7,
    flexDirection: "row",
  },
  text: {
    color: "white",
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 14,
  },
  image: {
    width: 30,
    height: 35,
    marginRight:10,
    marginTop: 11,
  }
});

export default Header;
