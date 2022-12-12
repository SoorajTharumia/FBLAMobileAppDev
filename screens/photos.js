import React from 'react'
import { StyleSheet, View, ScrollView } from "react-native";
import UploadPic from '../components/uploadPic'
import ImageGrid from '../components/imageGrid'

const Photos = () => {
  return (
    <View style={styles.container}>
      <UploadPic />
      <ImageGrid />
    </View>
  );
}

export default Photos

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});