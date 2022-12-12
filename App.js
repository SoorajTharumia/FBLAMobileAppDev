import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/tabs';
import Header from './components/header';

const App = () => {
  return (
    <><Header /><NavigationContainer>
      <Tabs />
    </NavigationContainer></>
  );
}

export default App;