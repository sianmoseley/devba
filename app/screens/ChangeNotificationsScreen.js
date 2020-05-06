import React, {useState} from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Button,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import Firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';
import {globalStyles} from '../config/Styles';
import {CustomTextInput} from '../config/Variables';
import {AuthInput, AuthSwitch} from '../config/Variables';


export default function ChangeNotificationsScreen({navigation}) {
  //logic to change notification settings to go here
  

function ChangeNotifications() {
    Alert.alert('Notification Settings', 'Your notification settings have been changed.', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
}

  return (
    <View>
        <Text>
            Would you like to receive notifications when there are new posts?
        </Text>
        <Button
            onPress={() => ChangeNotifications()}
            title="Yes"
        />
        <Button
            onPress={() => ChangeNotifications()}
            title="No"
        />
      </View>
  );
}
