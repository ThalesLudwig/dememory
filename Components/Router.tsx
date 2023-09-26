import "react-native-gesture-handler";

import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/Feather";
import { MD3Theme, useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("common");

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ header: (props) => <Header {...props} /> }}>
      <Stack.Screen name="Home" component={Home} options={{ title: t("common:home.titles.header") }} />
      <Stack.Screen
        options={{ headerTitle: t("common:new-entry.titles.new-entry") }}
        name="NewEntry"
        component={NewEntry}
      />
      <Stack.Screen
        options={{ headerTitle: t("common:view-entry.titles.view-entry") }}
        name="ViewEntry"
        component={ViewEntry}
        initialParams={{ id: "" }}
      />
      <Stack.Screen
        options={{ headerTitle: t("common:edit-entry.titles.edit-entry") }}
        name="EditEntry"
        component={EditEntry}
        initialParams={{ id: "" }}
      />
      <Stack.Screen
        options={{ headerTitle: t("common:search-results.titles.search-results") }}
        name="SearchResults"
        component={SearchResults}
      />
    </Stack.Navigator>
  );
}

function SearchStack() {
  const theme = useTheme();
  const { t } = useTranslation("common");

  return (
    <Stack.Navigator initialRouteName="Search" screenOptions={{ header: (props) => <Header {...props} /> }}>
      <Tab.Screen
        name="Search"
        component={Search}
        options={{ ...getRouteIcon("Search", theme), title: t("common:search.titles.search") }}
      />
      <Stack.Screen
        options={{ headerTitle: t("common:view-entry.titles.view-entry") }}
        name="ViewEntry"
        component={ViewEntry}
        initialParams={{ id: "" }}
      />
      <Stack.Screen
        options={{ headerTitle: t("common:edit-entry.titles.edit-entry") }}
        name="EditEntry"
        component={EditEntry}
        initialParams={{ id: "" }}
      />
      <Stack.Screen
        options={{ headerTitle: t("common:search-results.titles.search-results") }}
        name="SearchResults"
        component={SearchResults}
      />
    </Stack.Navigator>
  );
}

function FavoritesStack() {
  const theme = useTheme();
  const { t } = useTranslation("common");

  return (
    <Stack.Navigator initialRouteName="Favorites" screenOptions={{ header: (props) => <Header {...props} /> }}>
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{ ...getRouteIcon("Favorites", theme), title: t("common:favorites.titles.favorites") }}
      />
      <Stack.Screen
        options={{ headerTitle: t("common:view-entry.titles.view-entry") }}
        name="ViewEntry"
        component={ViewEntry}
        initialParams={{ id: "" }}
      />
      <Stack.Screen
        options={{ headerTitle: t("common:edit-entry.titles.edit-entry") }}
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
