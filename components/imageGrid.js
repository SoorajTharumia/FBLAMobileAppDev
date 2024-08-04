import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import useFirestore from "../hooks/useFirestore";

const ImageGrid = () => {
  const { docs } = useFirestore("images");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageUser, setSelectedImageUser] = useState("");
  const [selectedImageDate, setSelectedImageDate] = useState("");

  const showImageModal = (photo, name, date) => {
    setSelectedImage(photo);
    setSelectedImageUser(name);
    setSelectedImageDate(date);
    setModalVisible(true);
  };

  const hideImageModal = () => {
    setSelectedImage("");
    setModalVisible(false);
  };

  return (
    <><View style={styles.container}>
        <FlatList
          data={docs}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => showImageModal(item.url, item.displayName, item.newDate)}>
              <Image source={{ uri: item.url }} style={styles.image} />
            </TouchableOpacity>
          )}
          numColumns={2}
        />
      </View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <TouchableOpacity style={styles.modalContainer} onPress={hideImageModal} >
          <Image source={{ uri: selectedImage }} style={styles.modalImage} />
        </TouchableOpacity>
        <Text style={styles.uploadedText}>
          Uploaded by {selectedImageUser} on {selectedImageDate}</Text>
      </Modal></>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#484B70",
  },
  image: {
    width: 150,
    height: 150,
    margin: 10,
    borderRadius: 15,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  uploadedText: {
    fontSize: 20,
    color: "#fff",
    height: 100,
    backgroundColor: "#242526",
    textAlign: "center",
    padding: 8,
    fontStyle: "italic",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
});

export default ImageGrid;
