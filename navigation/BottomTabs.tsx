import React, { useContext } from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/main/HomeScreen";
import DiscoverScreen from "../screens/main/DiscoverScreen";
import FavouriteScreen from "../screens/main/FavouriteScreen";
import CommunityScreen from "../screens/main/CommunityScreen";
import AccountStack from "./AccountStack";

import { ThemeContext } from "../contexts/ThemeContext";
import lightTheme from "../themes/lightTheme";

import { useAppSelector } from "../store/hooks";

type IoniconName = keyof typeof Ionicons.glyphMap;
const Tab = createBottomTabNavigator();

const icons: Record<string, IoniconName> = {
  Home: "home-outline",
  Discover: "search-outline",
  Favourites: "heart-outline",
  Community: "people-outline",
  Account: "person-outline",
};

const TabIcon = ({
  theme,
  focused,
  color,
  name,
}: {
  theme: typeof lightTheme;
  focused: boolean;
  color: string;
  name: IoniconName;
}) => (
  <View
    style={{
      width: "150%",
      borderTopWidth: focused ? 2 : 0,
      borderTopColor: focused ? theme.colors.primary : "transparent",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      paddingTop: 5,
    }}
  >
    <Ionicons
      name={focused ? (name.replace("-outline", "") as IoniconName) : name}
      size={24}
      color={color}
    />
  </View>
);

export default function BottomTabs() {
  const { theme } = useContext(ThemeContext);
  const { defaultHomepage } = useAppSelector((state) => state.accountSettings);

  return (
    <Tab.Navigator
      initialRouteName={defaultHomepage}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color }) => (
          <TabIcon
            theme={theme}
            focused={focused}
            color={color}
            name={icons[route.name] ?? "ellipse"}
          />
        ),
        tabBarStyle: {
          backgroundColor: theme.colors.secondaryBackground,
          height: 65,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: "#e11d48",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Favourites" component={FavouriteScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Account" component={AccountStack} />
    </Tab.Navigator>
  );
}
