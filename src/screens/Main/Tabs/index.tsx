import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Pets from "./Pets";
import Favorites from "./Favorites";
import Sugestion from "./Sugestion";
import Profile from "./UserProfile";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Theme } from "../../../styles/Theme";
import Header from "../../../components/Header";
import { CommonActions } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarStyle: {
    backgroundColor: Theme.colors.caramelLight[90],
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabBarActiveTintColor: Theme.colors.brown.minus10,
  tabBarInactiveTintColor: Theme.colors.brown[50],
  tabBarShowLabel: false,
  header: () => <Header />,
  contentStyle: {
    backgroundColor: Theme.colors.caramelLight[90],
  },
};

const tabs = [
  {
    id: 1,
    name: "Pets",
    component: Pets,
    icon: "paw",
  },
  {
    id: 2,
    name: "Favorites",
    component: Favorites,
    icon: "heart",
  },
  {
    id: 3,
    name: "Sugestion",
    component: Sugestion,
    icon: "sparkles",
  },
  {
    id: 4,
    name: "Profile",
    component: Profile,
    icon: "person",
  },
];

export default function Tabs() {
  return (
    <Tab.Navigator screenOptions={screenOptions} id={undefined}>
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.id}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={tab.icon} color={color} size={size} />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: tab.name }],
                })
              );
            },
          })}
        />
      ))}
    </Tab.Navigator>
  );
}
