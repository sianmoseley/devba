

import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {YellowBox} from 'react-native';
import AuthNavigator from './routes/Authentication';
import LocalPushController from 'C:/Users/steph/vscodeprojects/devba/app/services/LocalPushController.js';
import {View} from 'react-native';
import Firebase from 'firebase';
import 'firebase/database';
import PushNotification from 'react-native-push-notification';
import {firebaseConfig} from 'C:/Users/steph/vscodeprojects/devba/app/database/Config.js';

// Firebase.initializeApp(firebaseConfig);

export default class devba extends Component {

   

  newPostNotification = () => {
      const ref = Firebase.database().ref('/posts');
      
    ref.limitToLast(1).on('child_added', function(childSnapshot) {  
      console.log("I hear a new post!")
      console.log(childSnapshot + ' is the new post')
      LocalPushController()   
   });
    };

    componentDidMount() {
      this.newPostNotification();
    }

    
  render() {
    
    return ( 
        <AuthNavigator /> 
    
      )
}};
