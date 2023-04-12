import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import Header from "./components/header";

const App = () => {
  return (
    <>
      <Header />
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </>
  );
};

export default App;
