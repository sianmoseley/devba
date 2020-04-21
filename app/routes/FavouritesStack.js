import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FavouritesScreen from '../screens/FavouritesScreen';
import CustomHeader from '../custom/CustomHeader';

const Stack = createStackNavigator();

export default function FavouritesStack() {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => {
        return {
          headerTitle: () => (
            <CustomHeader navigation={navigation} title="Favourites" />
          ),
          headerTitleAlign: 'center',
        };
      }}>
      <Stack.Screen name="FavouritesScreen" component={FavouritesScreen} />
    </Stack.Navigator>
  );
}
