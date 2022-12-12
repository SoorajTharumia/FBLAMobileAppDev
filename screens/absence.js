import React from "react";
import { StyleSheet, Text, View, Button, TextInput} from "react-native";
import { useState } from "react";
import { firebase } from "../firebase/config";

const Absence = () => {
  const [studentName, setStudentName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [absenceReason, setAbsenceReason] = useState("");
  const [absenceDate, setAbsenceDate] = useState("");

  if (new Date().getHours() === 0) {
    firebase.firestore().collection("absences").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
  }

  return (
    
      <View style={styles.container}>
        <Text>Student's Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Student's Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setStudentName(text)}
        />
        <Text>Student's ID:</Text>
        <TextInput
          style={styles.input}
          placeholder="ID Number"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setStudentID(text)}
        />
        <Text>Absence Reason:</Text>
        <TextInput
          style={styles.input}
          placeholder="Absence Reason"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setAbsenceReason(text)}
        />
        <Text>Date of Absence:</Text>
        <TextInput
          style={styles.input}
          placeholder="Date of Absence"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setAbsenceDate(text)}
        />
        <Button
          title="Submit Absence"
          onPress={() => {
            // send data to database
            firebase
              .firestore()
              .collection("absences")
              .add({
                name: studentName,
                id: studentID,
                reason: absenceReason,
                date: absenceDate,
              })
              .then(() => {
                alert("Absence Submitted!");
              });
          }}
        />
      </View>
  
  );
};

export default Absence;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 30,
  },
  input: {
    height: 40,
    width: "50%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});
