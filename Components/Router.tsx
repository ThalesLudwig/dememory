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
import EditEntry from "../pages/EditEntry";
import SearchResults from "../pages/SearchResults";
import { SearchType } from "../types/Search";
import { MD3Theme, useTheme } from "react-native-paper";

export type RootStackParamList = {
  Home: undefined;
  NewEntry: undefined;
  ViewEntry: { id: string };
  EditEntry: { id: string };
  Search: undefined;
  Favorites: undefined;
  Settings: undefined;
  SearchResults: SearchType;
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

const getIconColor = (theme: MD3Theme) => {
  const { colors, dark } = theme;
  return dark ? colors.inverseSurface : colors.scrim;
};

const getRouteIcon = (route: string, theme: MD3Theme) => ({
  tabBarIcon: ({ focused }: { focused: boolean }) => {
    switch (route) {
      case "Home":
        return <Icon name="home" size={ICON_SIZE} focused={focused} color={getIconColor(theme)} />;
      case "Search":
        return <Icon name="search" size={ICON_SIZE} focused={focused} color={getIconColor(theme)} />;
      case "Favorites":
        return <Icon name="heart" size={ICON_SIZE} focused={focused} color={getIconColor(theme)} />;
      case "Settings":
        return <Icon name="settings" size={ICON_SIZE} focused={focused} color={getIconColor(theme)} />;
      default:
        return <Icon name="home" size={ICON_SIZE} focused={focused} color={getIconColor(theme)} />;
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
      <Stack.Screen options={{ headerTitle: "New Entry" }} name="NewEntry" component={NewEntry} />
      <Stack.Screen
        options={{ headerTitle: "View Entry" }}
        name="ViewEntry"
        component={ViewEntry}
        initialParams={{ id: "" }}
      />
      <Stack.Screen
        options={{ headerTitle: "Edit Entry" }}
        name="EditEntry"
        component={EditEntry}
        initialParams={{ id: "" }}
      />
      <Stack.Screen options={{ headerTitle: "Search Results" }} name="SearchResults" component={SearchResults} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  const theme = useTheme();

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ header: (props) => <Header {...props} /> }}>
      <Tab.Screen name="Search" component={Search} options={getRouteIcon("Search", theme)} />
      <Stack.Screen
        options={{ headerTitle: "View Entry" }}
        name="ViewEntry"
        component={ViewEntry}
        initialParams={{ id: "" }}
      />
      <Stack.Screen
        options={{ headerTitle: "Edit Entry" }}
        name="EditEntry"
        component={EditEntry}
        initialParams={{ id: "" }}
      />
      <Stack.Screen options={{ headerTitle: "Search Results" }} name="SearchResults" component={SearchResults} />
    </Stack.Navigator>
  );
}

function FavoritesStack() {
  const theme = useTheme();

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ header: (props) => <Header {...props} /> }}>
      <Tab.Screen name="Favorites" component={Favorites} options={getRouteIcon("Favorites", theme)} />
      <Stack.Screen
        options={{ headerTitle: "View Entry" }}
        name="ViewEntry"
        component={ViewEntry}
        initialParams={{ id: "" }}
      />
      <Stack.Screen
        options={{ headerTitle: "Edit Entry" }}
        name="EditEntry"
        component={EditEntry}
        initialParams={{ id: "" }}
      />
    </Stack.Navigator>
  );
}

export default function Router() {
  const theme = useTheme();

  return (
    <Tab.Navigator labeled={false}>
      <Tab.Screen name="HomeStack" component={HomeStack} options={getRouteIcon("Home", theme)} />
      <Tab.Screen name="SearchStack" component={SearchStack} options={getRouteIcon("Search", theme)} />
      <Tab.Screen name="FavoritesStack" component={FavoritesStack} options={getRouteIcon("Favorites", theme)} />
      <Tab.Screen name="Settings" component={Settings} options={getRouteIcon("Settings", theme)} />
    </Tab.Navigator>
  );
}
