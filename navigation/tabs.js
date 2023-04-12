import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, Image } from "react-native";
import Home from "../screens/home";
import Lunch from "../screens/lunch";
import Photos from "../screens/photos";
import Absence from "../screens/absence";
import Calendar from "../screens/calendar";
import SignIn from "../screens/signIn";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#5983C1",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#242526",
          borderTopWidth: 7,
          borderTopColor: "#525252",
          height: 100,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/icons/home.png")}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? "#fff" : "#3b3d40",
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/icons/calendar.png")}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? "#fff" : "#3b3d40",
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Photos"
        component={Photos}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/icons/photo-camera.png")}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? "#fff" : "#3b3d40",
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Absence"
        component={Absence}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/icons/fever.png")}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? "#fff" : "#3b3d40",
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Grades"
        component={Lunch}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/icons/lunch.png")}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? "#fff" : "#3b3d40",
                }}
              />
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="Login"
        component={SignIn}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/icons/lunch.png")}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? "#fff" : "#3b3d40",
                }}
              />
            </View>
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default Tabs;
