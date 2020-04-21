import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CustomHeader from '../custom/CustomHeader';
import TCScreen from '../screens/TCScreen';

const Stack = createStackNavigator();

export default function TCStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="About"
        component={TCScreen}
        options={({navigation}) => ({
          headerTitle: () => (
            <CustomHeader navigation={navigation} title="Terms & Conditions" />
          ),
          headerTitleAlign: 'center',
        })}
      />
    </Stack.Navigator>
  );
}
