import {useEffect, useState} from 'react';
import Firebase from 'firebase';
import 'firebase/database';
import LocalPushController from '../services/LocalPushController';
import today from '../custom/Variables';

export default function Notifications() {
  const [notificationPreferences, setNotificationPreferences] = useState(false);
  //get user from authentication
  let user = Firebase.auth().currentUser;
  //set path to user's attributes
  let dbuser = Firebase.database().ref('users/' + user.uid);

  useEffect(() => {
    dbuser.on('value', snapshot => {
      const userObject = snapshot.val();
      setNotificationPreferences(userObject.notifications);
    });

    if (notificationPreferences === true) {
      let first = true;
      const ref = Firebase.database().ref('/posts');
      const onValueChange = function(snapshot, prevChildKey) {
        let newPost = snapshot.val();
        if (first) {
          first = false;
        } else {
          if (newPost.createdAt == today) {
            console.log('Heading: ' + newPost.heading);
            console.log('Description: ' + newPost.description);
            console.log('Location: ' + newPost.location);
            LocalPushController(
              newPost.heading,
              newPost.description,
              newPost.location,
            );
          }
        }
      };

      ref.limitToLast(1).on('child_added', onValueChange);

      return function cleanup() {
        ref.off('child_added', onValueChange);
      };
    }
  });

  return null;
}
