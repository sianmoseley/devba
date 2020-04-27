import Firebase from 'firebase';

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
}
