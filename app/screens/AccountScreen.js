import React from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import Firebase from 'firebase';
import {globalStyles} from '../config/Styles';

//page with various navigation options

export default function AccountScreen({navigation}) {
  //executes when user presses Logout button
  function LogOut() {
    try {
      Firebase.auth().signOut();
    } catch (e) {
      console.error(e);
    }
    console.log('USER LOGGED OUT SUCCESSFULLY:', Date(Date.now()));
  }

  return (
    <View>
      <View style={globalStyles.accountContainer}>
        <TouchableOpacity
          style={globalStyles.accountButton}
          onPress={() => navigation.navigate('ViewPosts')}>
          <Text style={globalStyles.accountButtonText}>View Your Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.accountButton}
          onPress={() => navigation.navigate('ChangeUsername')}>
          <Text style={globalStyles.accountButtonText}>Change Username</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.accountButton}
          onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={globalStyles.accountButtonText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.accountButton}
          onPress={() => navigation.navigate('DeleteAccount')}>
          <Text style={globalStyles.accountButtonText}>Delete Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.accountButton}
          onPress={() => {
            //alerts user to confirm if they want to logout
            Alert.alert(
              'Are you sure you wish to log out?',
              'You can always log back in.',
              [
                {
                  text: 'Yes, log out.',
                  onPress: () => LogOut(),
                },
                {
                  text: 'No, go back.',
                },
              ],
            );
          }}>
          <Text style={globalStyles.accountButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
