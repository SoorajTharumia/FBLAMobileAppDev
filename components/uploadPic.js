import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker"; // not react-image-picker
import { firebase } from '../firebase/config';

export default function uploadPic() {
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

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

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
          console.log("Download URL: ", url);
          const createdAt = firebase.firestore.FieldValue.serverTimestamp();
          collectionRef.add({url, createdAt});
          setImage(url);
          blob.close();
          return url;
        });
      }
    );
  };

  return (
    <View>
      {/* <Button title="Select Image" onPress={pickImage} /> */}
      {!uploading ? (
        <Button title="Upload Image" onPress={uploadImage} />
      ) : (
        <ActivityIndicator size={"small"} color="black" />
      )}
    </View>
  );
}
