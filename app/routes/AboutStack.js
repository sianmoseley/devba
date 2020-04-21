import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CustomHeader from '../custom/CustomHeader';
import AboutScreen from '../screens/AboutScreen';

const Stack = createStackNavigator();

export default function AboutStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={({navigation}) => ({
          headerTitle: () => (
            <CustomHeader navigation={navigation} title="About" />
          ),
          headerTitleAlign: 'center',
        })}
      />
    </Stack.Navigator>
  );
}
