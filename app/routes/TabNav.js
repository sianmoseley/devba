import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import FavouritesStack from './FavouritesStack';
import HomeStack from './HomeStack';
import SearchStack from './SearchStack';
import MapStack from './MapStack';

//stack that generates tab bar on bottom of screen
//directs to HomeStack

const Tab = createBottomTabNavigator();

export default function TabNav() {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      initialRouteName="Home"
      tabBarOptions={{
        //styles are unique to tab bar
        //as a result, cannot be abstracted
        //options for tab colours
        adaptive: true,
        activeTintColor: 'white', //passes to color prop
        inactiveTintColor: '#28A966',
        activeBackgroundColor: '#28A966',
        inactiveBackgroundColor: 'white',
        keyboardHidesTabBar: true,
        showLabel: false,
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="home" size={30} type="font-awesome" color={color} />
          ),
        }}
        name="Home"
        component={HomeStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="search" size={27} type="font-awesome" color={color} />
          ),
          unmountOnBlur: true,
        }}
        name="Search"
        component={SearchStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="map" type="font-awesome" color={color} />
          ),
        }}
        name="Activity"
        component={MapStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="heart" type="font-awesome" color={color} />
          ),
        }}
        name="Favourites"
        component={FavouritesStack}
      />
    </Tab.Navigator>
  );
}
