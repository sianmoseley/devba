import Firebase from 'firebase';
import {userKey} from '../config/Variables';

function reauthenticate(password) {
  const user = Firebase.auth().currentUser;
  const cred = Firebase.auth.EmailAuthProvider.credential(user.email, password);
  return user.reauthenticateWithCredential(cred);
}

export default async function DeleteUser(values) {
  reauthenticate(values.password)
    .then(() => {
      const user = Firebase.auth().currentUser;
      user
        .delete()
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

  //deletes user from users table
  Firebase.database()
    .ref('users/' + userKey)
    .remove();
  //NEEDS TESTING

  //delete user posts from posts table
  // Firebase.database().ref('posts/');

  //deletes user posts from user_posts table
  Firebase.database()
    .ref('user_posts/' + userKey)
    .remove();
}
