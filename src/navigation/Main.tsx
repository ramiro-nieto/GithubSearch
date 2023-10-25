import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RepoSearch from '../screens/Home/RepoSearch';
import SavedRepos from '../screens/SavedRepos/SavedRepos';

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: 'dodgerblue',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: () => null,
          tabBarLabelStyle: {
            fontSize: 14,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            marginBottom: 10,
          },
        })}
        initialRouteName="Home">
        <Tab.Screen name="Repo Search" component={RepoSearch} />
        <Tab.Screen name="Saved Repos" component={SavedRepos} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
