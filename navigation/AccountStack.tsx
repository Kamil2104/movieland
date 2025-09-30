import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AccountScreen from "../screens/main/AccountScreen";
import OptionsScreen from "../screens/other/OptionsScreen";

import { AccountStackParamList } from "../types/navigationTypes";

const Stack = createNativeStackNavigator<AccountStackParamList>();

export default function AccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <Stack.Screen name="AccountMain" component={AccountScreen} />
      <Stack.Screen name="OptionsScreen" component={OptionsScreen} />
    </Stack.Navigator>
  );
}