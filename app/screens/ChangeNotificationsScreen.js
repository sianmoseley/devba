import React from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import Firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';
import {globalStyles} from '../style/Styles';

export default function ChangeNotificationsScreen({navigation}) {
  let user = Firebase.auth().currentUser;
  let uid = user.uid;

  function ChangeNotifications(uid, yesno) {
    //update notification preferences in the db
    Firebase.database()
      .ref('users/' + uid)
      .update({
        notifications: yesno,
      });
    //alert to confirm to user that their notification settings have changed
    Alert.alert(
      'Notification Settings',
      'Your notification settings have been changed.',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ],
    );
  }

  return (
    <View>
      <Text style={globalStyles.heading}>
        Would you like to receive notifications when there are new posts?
      </Text>
      <TouchableOpacity
        style={globalStyles.inAppButton}
        onPress={() => ChangeNotifications(uid, true)}
        title="Yes">
        <Text style={globalStyles.inAppTouchText}>Yes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={globalStyles.inAppButton}
        onPress={() => ChangeNotifications(uid, false)}
        title="No">
        <Text style={globalStyles.inAppTouchText}>No</Text>
      </TouchableOpacity>
    </View>
  );
}
