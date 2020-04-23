import React, {useState} from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';
import {Formik} from 'formik';
import {globalStyles} from '../config/Styles';

export default function ChangeUsernameScreen({navigation}) {
  const user = Firebase.auth().currentUser;
  const userKey = Firebase.auth().currentUser.uid;
  const currentUsername = Firebase.auth().currentUser.displayName;
  const [Username, setUsername] = useState(currentUsername);
  // console.log(currentUsername);

  function changeUsername(value) {
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
            changeUsername({
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
                  onChangeText={text => setUsername(text)}
                  value={Username}
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
