import React from "react";
import { View, Image, Text, StyleSheet, FlatList } from "react-native";

import useFirestore from "../hooks/useFirestore";

const imageGrid = () => {
    const { docs } = useFirestore("images");

    return (
      <FlatList
        data={docs}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Image source={{ uri: item.url }} style={styles.image} />
          </View>
        )}
        numColumns={2}
      />
    );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#484B70",
  },
  image: {
    width: 150,
    height: 150,
    margin: 10,
    borderRadius: 15,
  },
});

export default imageGrid;
