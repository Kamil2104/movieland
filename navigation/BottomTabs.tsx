import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/main/HomeScreen";
import DiscoverScreen from "../screens/main/DiscoverScreen";
import FavouriteScreen from "../screens/main/FavouriteScreen";
import CommunityScreen from "../screens/main/CommunityScreen";
import AccountStack from "./AccountStack";

import { ThemeContext } from "../contexts/ThemeContext";

type IoniconName = keyof typeof Ionicons.glyphMap;

const Tab = createMaterialTopTabNavigator();

export default function BottomTabs() {
  const { theme } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={({ route }) => {
        let iconName: IoniconName = "ellipse";

        if (route.name === "Home") {
          iconName = "home-outline";
        } else if (route.name === "Discover") {
          iconName = "search-outline";
        } else if (route.name === "Favourites") {
          iconName = "heart-outline";
        } else if (route.name === "Community") {
          iconName = "people-outline";
        } else if (route.name === "Account") {
          iconName = "person-outline";
        }

        return {
          swipeEnabled: true,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={
                focused
                  ? (iconName.replace("-outline", "") as IoniconName)
                  : iconName
              }
              size={24}
              color={color}
            />
          ),
          tabBarIndicatorStyle: { height: 0 },
          tabBarStyle: {
            backgroundColor: theme.colors.secondaryBackground,
            height: 65,
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarActiveTintColor: "#e11d48",
          tabBarInactiveTintColor: "gray",
        };
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Favourites" component={FavouriteScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Account" component={AccountStack} />
    </Tab.Navigator>
  );
}