import React, { useContext } from "react";

import HomeScreen from "../screens/main/HomeScreen";
import DiscoverScreen from "../screens/main/DiscoverScreen";
import FavouriteScreen from "../screens/main/FavouriteScreen";
import CommunityScreen from "../screens/main/CommunityScreen";
import AccountScreen from "../screens/main/AccountScreen";

import { ThemeContext } from "../contexts/ThemeContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

type IoniconName = keyof typeof Ionicons.glyphMap;

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { theme } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: IoniconName = "ellipse";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Discover") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Favourites") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Community") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#e11d48",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: theme.colors.secondaryBackground,
          borderTopWidth: 0,
          borderTopColor: "transparent",
          elevation: 0,
          shadowOpacity: 0,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Favourites" component={FavouriteScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}