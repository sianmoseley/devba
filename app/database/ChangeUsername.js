import Firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';

//rewrites username in firebase authentication and database
export default async function ChangeUsername(value) {
  user.updateProfile({displayName: value.username}).then(() => {
    Firebase.database()
      .ref('users/' + userKey)
      .update({username: value.username});
  });
}
retur;
