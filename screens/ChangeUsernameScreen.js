import React, {useState} from 'react';
import {TextInput, View, Button, StyleSheet} from 'react-native';
import Firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';
import {Formik} from 'formik';

export default function ChangeUsername() {
  const user = Firebase.auth().currentUser;
  const userKey = Firebase.auth().currentUser.uid;
  const currentUsername = Firebase.auth().currentUser.displayName;
  const [Username, setUsername] = useState(currentUsername);
  console.log(currentUsername);

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
          });
        }}>
        {props => (
          <View>
            <TextInput
              style={style.txtInput}
              onChangeText={text => setUsername(text)}
              value={Username}
            />
            <Button title="Submit" onPress={props.handleSubmit} />
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
