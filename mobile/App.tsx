import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import ListScreen from "./components/ListScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateScreen from "./components/CreateScreen";
import UpdateScreen from "./components/UpdateScreen";
import DeleteScreen from "./components/DeleteScreen";
import { ContactsProvider } from "./ContactProvider";
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <ContactsProvider>
      <NavigationContainer>
        <Tab.Navigator
          sceneContainerStyle={{ backgroundColor: "#F8F8F8" }}
          initialRouteName="List"
        >
          <Tab.Screen name="List" component={ListScreen} />
          <Tab.Screen name="Create" component={CreateScreen} />
          {/* <Tab.Screen name="Update" component={UpdateScreen} /> */}
          {/* <Tab.Screen name="Delete" component={DeleteScreen} /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </ContactsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
