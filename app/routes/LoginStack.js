import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RootStack from './RootStack';
import LocalPushController from '../services/LocalPushController';
import Firebase from 'firebase';

//directs to RootStack

const Stack = createStackNavigator();

export default function LogInStack() {

  useEffect(() => {
    const ref = Firebase.database().ref('/posts');
    ref.limitToLast(1).on('child_added', function(childSnapshot) {
      console.log('I hear a new post!');
      console.log(childSnapshot + ' is the new post');
      LocalPushController();
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Root" component={RootStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

