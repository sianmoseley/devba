import React, {useState} from 'react';
import {TextInput, View, Button, StyleSheet} from 'react-native';
import Firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';
import {Formik} from 'formik';
import {userKey} from '../config/ReusableVariables';

export default function ChangeUsername() {
  //obtain the user and username of logged in user as objects
  const user = Firebase.auth().currentUser;
  const currentUsername = Firebase.auth().currentUser.displayName;

  //set username variable that will be changed as the existing username
  const [Username, setUsername] = useState(currentUsername);

  //function that rewrites username in firebase authentication and database
  function changeUsername(value) {
    user.updateProfile({displayName: value.username}).then(() => {
      Firebase.database()
        .ref('users/' + userKey)
        .update({username: value.username});
    });
  }
  return (
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
            //values in authentication and database changed to newly set Username
          });
        }}>
        {props => (
          <View>
            <TextInput
              style={style.txtInput}
              onChangeText={
                text => setUsername(text)
                //variable Username will be set to whatever is typed into this text input
              }
              value={Username}
            />
            <Button
              title="Submit"
              onPress={
                props.handleSubmit
                //links button to onSubmit function in Formik
              }
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

const style = StyleSheet.create({
  txtInput: {
    margin: 5,
    padding: 30,
    fontSize: 15,
    borderWidth: 2,
    color: 'red',
    borderRadius: 5,
    backgroundColor: (255, 250, 250, 50),
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
});
