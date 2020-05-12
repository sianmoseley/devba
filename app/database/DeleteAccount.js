import Firebase from 'firebase';
import {Alert} from 'react-native';

// reauthenticates user against existing records in database
function reauthenticate(password) {
  const user = Firebase.auth().currentUser;
  const cred = Firebase.auth.EmailAuthProvider.credential(user.email, password);
  return user.reauthenticateWithCredential(cred);
}

// function to delete user from auth area of firebase, from user table and deletes all posts by user
export default function DeleteUser(values) {
  const userKey = Firebase.auth().currentUser.uid;
  reauthenticate(values.password)
    .then(() => {
      const user = Firebase.auth().currentUser;
      Firebase.database()
        .ref('users/' + userKey)
        .remove()
        .then(() => {
          Firebase.database()
            .ref('user_posts/' + userKey)
            .remove();
        })        
        .then(() => user.delete())
        .then(() => {
          console.log('ACCOUNT DELETED SUCCESSFULLY:', Date(Date.now()));
        })
        .catch(error => {
          Alert.alert(error.message);
        });
    })
    .catch(error => {
      Alert.alert(error.message);
    });
}
