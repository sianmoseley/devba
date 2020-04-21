import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MapScreen from '../screens/MapScreen';
import CustomHeader from '../custom/CustomHeader';

const Stack = createStackNavigator();

export default function MapStack() {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => {
        return {
          headerTitle: () => (
            <CustomHeader navigation={navigation} title="Activity" />
          ),
          headerTitleAlign: 'center',
        };
      }}>
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
}
