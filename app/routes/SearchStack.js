import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';
import CustomHeader from '../custom/CustomHeader';

const Stack = createStackNavigator();

export default function SearchStack() {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => {
        return {
          headerTitle: () => (
            <CustomHeader navigation={navigation} title="Search Posts" />
          ),
          headerTitleAlign: 'center',
        };
      }}>
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
}
