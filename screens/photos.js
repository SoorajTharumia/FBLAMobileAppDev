import React from 'react'
import { StyleSheet, View, ScrollView, Text } from "react-native";
import UploadPic from '../components/uploadPic'
import ImageGrid from '../components/imageGrid'

const Photos = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Find and upload your photos from Parkland events below!</Text>
      <ImageGrid />
      <UploadPic />
    </View>
  );
}

export default Photos

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
    
  },
});