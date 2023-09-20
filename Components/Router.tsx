import "react-native-gesture-handler";

import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/Feather";

import Home from "../pages/Home";
import Settings from "../pages/Settings";
import Search from "../pages/Search";
import Favorites from "../pages/Favorites";
import { ICON_SIZE } from "../constants/icons";
import NewEntry from "../pages/NewEntry";
import Header from "./Header";
import ViewEntry from "../pages/ViewEntry";

export type RootStackParamList = {
  Home: undefined;
  NewEntry: undefined;
  ViewEntry: { id: string };
  Search: undefined;
  Favorites: undefined;
  Settings: undefined;
};

export type RootTabParamList = {
  Home: undefined;
  HomeStack: undefined;
  SearchStack: undefined;
  FavoritesStack: undefined;
  Search: undefined;
  Favorites: undefined;
  Settings: undefined;
};

const Tab = createMaterialBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const getRouteIcon = (route: string) => ({
  tabBarIcon: ({ focused }: { focused: boolean }) => {
    switch (route) {
      case "Home":
        return <Icon name="home" size={ICON_SIZE} focused={focused} />;
      case "Search":
        return <Icon name="search" size={ICON_SIZE} focused={focused} />;
      case "Favorites":
        return <Icon name="heart" size={ICON_SIZE} focused={focused} />;
      case "Settings":
        return <Icon name="settings" size={ICON_SIZE} focused={focused} />;
      default:
        return <Icon name="home" size={ICON_SIZE} focused={focused} />;
    }
  },
});

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ header: (props) => <Header {...props} />, title: "Entries" }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="NewEntry" component={NewEntry} />
      <Stack.Screen name="ViewEntry" component={ViewEntry} initialParams={{ id: "" }} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ header: (props) => <Header {...props} /> }}>
      <Tab.Screen name="Search" component={Search} options={getRouteIcon("Search")} />
    </Stack.Navigator>
  );
}

function FavoritesStack() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ header: (props) => <Header {...props} /> }}>
      <Tab.Screen name="Favorites" component={Favorites} options={getRouteIcon("Favorites")} />
    </Stack.Navigator>
  );
}

export default function Router() {
  return (
    <Tab.Navigator labeled={false}>
      <Tab.Screen name="HomeStack" component={HomeStack} options={getRouteIcon("Home")} />
      <Tab.Screen name="SearchStack" component={SearchStack} options={getRouteIcon("Search")} />
      <Tab.Screen name="FavoritesStack" component={FavoritesStack} options={getRouteIcon("Favorites")} />
      <Tab.Screen name="Settings" component={Settings} options={getRouteIcon("Settings")} />
    </Tab.Navigator>
  );
}
