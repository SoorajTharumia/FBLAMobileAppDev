import React, { useContext, useState } from "react";
import { Text, TouchableOpacity, View, ActivityIndicator, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { firebase } from '../firebase/config';
import UserContext from "../components/userContext";


const uploadPic = () => {
  const user = useContext(UserContext)

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      fileName: "test",
    });

    setImage(result.assets[0].uri);
    console.log(result);

    // send to firebase
    if (!result.canceled) {
      setUploading(true);
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      const ref = firebase.storage().ref().child('images/' + Date.now());
      const collectionRef = firebase.firestore().collection('images');
      const snapshot = ref.put(blob);
      snapshot.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          setUploading(true);
        },
        (error) => {
          setUploading(false);
          console.log(error);
          blob.close();
          return;
        },
        () => {
          snapshot.snapshot.ref.getDownloadURL().then((url) => {
            setUploading(false);
            console.log("File available at", url);
            var newDate = new Date();
            newDate = newDate.toDateString();
            newDate = newDate.slice(4);
            console.log(newDate);
            collectionRef.add({
              url,
              newDate,
              displayName: user ? user.displayName : "Guest",
            });
            blob.close();
            return url;
          });
        }
      );
    }
  };

  return (
    <View>
      {!uploading ? (
        <TouchableOpacity style={styles.button} onPress={uploadImage}>
          <Text style={styles.buttonText}>Upload Image!</Text>
        </TouchableOpacity>
      ) : (
          <ActivityIndicator style={styles.button} size={"small"} color="black" />
      )}
    </View>
  );
}
export default uploadPic;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    color: "white",
    width: 200,
    borderRadius: 10,
    margin: 15,
  }, buttonText: {
    color: "black",
    textAlign: "center",
    padding: 10,
    fontSize: 20,
  }
});
