import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from "react-native";
import { useState } from "react";
import { firebase } from "../firebase/config";

const Absence = () => {
  const [studentName, setStudentName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [absenceReason, setAbsenceReason] = useState("");
  const [absenceDate, setAbsenceDate] = useState("");
  const [schoolAttending, setSchool] = useState("")

  if (new Date().getHours() === 0) {
    firebase.firestore().collection("absences").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        If your child is sick, please let us know below!
      </Text>
      <View style={styles.inputSection}>
        <View style={styles.formContainer}>
          <Text style={styles.subtext}>Student's Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setStudentName(text)}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.subtext}>Student's ID:</Text>
          <TextInput
            style={styles.input}
            placeholder="123456"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setStudentID(text)}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.subtext}>Absence Reason:</Text>
          <TextInput
            style={styles.input}
            placeholder="Sick"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setAbsenceReason(text)}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.subtext}>Date of Absence:</Text>
          <TextInput
            style={styles.input}
            placeholder="01/01/2023"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setAbsenceDate(text)}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.subtext}>School in Attendance: </Text>
          <TextInput
            style={styles.input}
            placeholder="Parkland High School"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setSchool(text)}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
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
              school: schoolAttending,
            })
            .then(() => {
              alert("Absence Submitted!");
            });
        }}
      >
        <Text style={styles.buttonText}>Submit Absence</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Absence;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#484B70",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: "50%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#DfDfe2",
    marginLeft: 180,
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
  button: {
    backgroundColor: "#fff",
    color: "white",
    width: 200,
    borderRadius: 10,
    margin: 15,
    position: "absolute",
    bottom: 0,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    padding: 10,
    fontSize: 20,
  },
  subtext: {
    fontSize: 15,
    color: "#fff",
    fontStyle: "italic",
    position: "absolute",
    left: 20,
  },
  formContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inputSection: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 100,
  },
});
