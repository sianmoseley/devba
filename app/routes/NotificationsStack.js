import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NotificationsScreen from '../screens/NotificationsScreen';
import CustomHeader from '../custom/CustomHeader';

const Stack = createStackNavigator();

export default function MapStack() {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => {
        return {
          headerTitle: () => (
            <CustomHeader navigation={navigation} title="Notifications" />
          ),
          headerTitleAlign: 'center',
        };
      }}>
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
      />
    </Stack.Navigator>
  );
}
