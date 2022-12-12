import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Parkland Community</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
        width: "100%",
        height: 100,
        paddingTop: 36,
        backgroundColor: "#fff",
        justifyContent: "center",
        borderBottomColor: "#d9d9d9",
        borderBottomWidth: 7,

    },
  text: {
    color: "#000000",
    fontSize: 23,
    fontWeight: "bold",
    paddingLeft: 10,    
  },
});

export default Header;
