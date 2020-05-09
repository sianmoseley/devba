import React, {useState} from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from 'react-native';
import {Formik} from 'formik';
import Firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';
import {globalStyles} from '../config/Styles';

export default function ChangeUsernameScreen({navigation}) {
  //obtain the user and username of logged in user as objects
  const user = Firebase.auth().currentUser;
  const currentUsername = user.displayName;
  const userKey = user.uid;

  //set username variable that will be changed as the existing username
  const [Username, setUsername] = useState(currentUsername);

  //function that rewrites username in firebase authentication and database
  function ChangeUsername(value) {
    user.updateProfile({displayName: value.username}).then(() => {
      Firebase.database()
        .ref('users/' + userKey)
        .update({username: value.username});
    });
  }
  return (
    <TouchableWithoutFeedback
      touchSoundDisabled={true}
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View>
        <Formik
          initialValues={{
            username: currentUsername,
          }}
          enableReinitialize={true}
          onSubmit={values => {
            ChangeUsername({
              //values in authentication and database changed to newly set Username
              username: Username,
              displayName: Username,
            });
            Alert.alert('Your username has been changed.', Username, [
              {
                text: 'OK',
                onPress: () => navigation.goBack(),
              },
            ]);
            console.log(Username);
          }}>
          {formikProps => (
            <React.Fragment>
              <View style={globalStyles.formField}>
                <Text style={globalStyles.formLabel}>Username:</Text>
                <TextInput
                  style={globalStyles.inputBox}
                  //variable Username will be set to whatever is typed into this text input
                  onChangeText={text => setUsername(text)}
                  value={Username}
                  style={globalStyles.formPlaceholder}
                />
                <TouchableOpacity
                  style={globalStyles.inAppButton}
                  onPress={formikProps.handleSubmit}>
                  <Text style={globalStyles.inAppTouchText}>
                    Change username
                  </Text>
                </TouchableOpacity>
              </View>
            </React.Fragment>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}
