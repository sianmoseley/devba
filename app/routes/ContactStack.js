import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CustomHeader from '../custom/CustomHeader';
import ContactScreen from '../screens/ContactScreen';

//plugs into RootStack
//directs to ContactScreen

const Stack = createStackNavigator();

export default function AboutStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="About"
        component={ContactScreen}
        options={({navigation}) => ({
          headerTitle: () => (
            <CustomHeader navigation={navigation} title="Contact" />
          ),
          headerTitleAlign: 'center',
        })}
      />
    </Stack.Navigator>
  );
}
