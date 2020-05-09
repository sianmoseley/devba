import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RootStack from './RootStack';
import LocalPushController from '../services/LocalPushController';
import Firebase from 'firebase';


//directs to RootStack

const Stack = createStackNavigator();

export default function LogInStack() {  

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Root" component={RootStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

