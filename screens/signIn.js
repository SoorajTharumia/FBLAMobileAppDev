import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Linking } from "react-native";
import { firebase } from "../firebase/config";
import UserContext from "../components/userContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [signupModalVisible, setSignupModalVisible] = useState(false);  

  const user = useContext(UserContext);

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Login successful
        const user = userCredential.user;
        setEmail("");
        setPassword("");
        setLoginModalVisible(false);
      })
      .catch((error) => {
        // Login failed
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert("Login Failed! Please try again.")
      });
  };

  const handleSignup = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Sign up successful
        const user = userCredential.user;
        user.updateProfile({
          displayName: name,
        }).then(() => {
          console.log(user);
          setEmail("");
          setPassword("");
          setName("");
          setSignupModalVisible(false);
        }).catch((error) => {
          console.log(error);
        });
      })
      .catch((error) => {
        // Sign up failed
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert("Sign Up Failed! Please try again.")
      });
  };

  const handleLogout = () => {
    firebase.auth().signOut();
  };
    
    // function that takes user to website www.parklandsd.org without Linking
    const handleWebsite = () => {
      Linking.openURL("https://www.parklandsd.org");
    };
  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.userInfoContainer}>
            <Text style={styles.userInfoText}>Welcome, {user.displayName}</Text>
            <Text style={styles.userInfoText}>Email: {user.email}</Text>
            <TouchableOpacity onPress={handleLogout} style={styles.signOutButton}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.title}>
            Log into your account or Sign Up for one below!
          </Text>
          <View style={styles.signInFormContainer}>
            <TouchableOpacity
              onPress={() => setLoginModalVisible(true)}
              style={styles.signInButton}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSignupModalVisible(true)}
              style={styles.signUpButton}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={loginModalVisible}
            >
              <View style={styles.signInForm}>
                <Text style={styles.subtext}>Email:</Text>
                <TextInput
                  style={styles.signInInput}
                  value={email}
                  onChangeText={setEmail}
                />
                <Text style={styles.subtext}>Password:</Text>
                <TextInput
                  style={styles.signInInput}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                />

                <View style={styles.signInButtonContainer}>
                  <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.signInButton}
                  >
                    <Text style={styles.buttonText}>Login</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setLoginModalVisible(false);
                      setEmail("");
                      setPassword("");
                    }}
                    style={styles.signInButton}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <Modal
              animationType="slide"
              transparent={true}
              visible={signupModalVisible}
            >
              <View style={styles.signInForm}>
                <Text style={styles.subtext}>Name:</Text>
                <TextInput
                  style={styles.signInInput}
                  value={name}
                  onChangeText={setName}
                />
                <Text style={styles.subtext}>Email:</Text>
                <TextInput
                  style={styles.signInInput}
                  value={email}
                  onChangeText={setEmail}
                />
                <Text style={styles.subtext}>Password:</Text>
                <TextInput
                  style={styles.signInInput}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                />
                <View style={styles.signInButtonContainer}>
                  <TouchableOpacity
                    onPress={handleSignup}
                    style={styles.signInButton}
                  >
                    <Text style={styles.buttonText}>Sign Up</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSignupModalVisible(false);
                      setEmail("");
                      setPassword("");
                      setName("");
                    }}
                    style={styles.signInButton}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </>
      )}
      <View style={styles.websiteContainer}>
        <TouchableOpacity style={styles.websiteButton} onPress={handleWebsite}>
          <Text style={styles.buttonText}>Visit District Website!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#484B70",
  },
  userInfoContainer: {
    
    justifyContent: "center",
    alignItems: "center",
    
  },
  userInfoText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    padding: 8,
    fontStyle: "italic",
  },
  signOutButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 15,
    padding: 10,
    width: "40%",
    height: 48,
  },
  signUpButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 15,
    padding: 10,
    width: "40%",
    height: 48,
  },
  signInFormContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  signInForm: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "#484B70",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    padding: 20,
  },
  signInText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    padding: 8,
    fontStyle: "italic",
  },
  signInInput: {
    height: 40,
    width: "80%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#DfDfe2",
  },
  subtext: {
    fontSize: 20,
    color: "#fff",
    fontStyle: "italic",
    paddingBottom: 5,
  },
  signInButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 20,
  },
  signInButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 15,
    padding: 10,
    width: "40%",
    height: 48,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    padding: 8,
    fontStyle: "italic",
    },
    websiteButton: {
        backgroundColor: "#fff",
        borderRadius: 10,
        margin: 15,
        padding: 10,
        height: 48,
    },
    websiteContainer: {
        flex: 1,
        position: "absolute",
        width: "100%",
        bottom: 0,
    },
});

