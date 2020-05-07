import React, {useEffect, useState} from 'react';
import Firebase from 'firebase';
import 'firebase/database';
import LocalPushController from '../services/LocalPushController';



export default function Notifications() {
    const [notificationPreferences, setNotificationPreferences] = useState(false);
    //get user from authentication
    let user = Firebase.auth().currentUser;
    //set path to user's attributes
    let dbuser = Firebase.database().ref('users/' + user.uid);     

    useEffect(() => {
        dbuser.on('value', snapshot => {
            const userObject = snapshot.val();
            console.log(userObject);
            setNotificationPreferences(userObject.notifications);
            //assumes notification preferences are false if a preference hasn't been set yet
            setNotificationPreferences(userObject.notifications);
            console.log(notificationPreferences);
          });
        

        if (notificationPreferences === true) {
            let first = true;
            const ref = Firebase.database().ref('/posts');
            const onValueChange = function(snapshot, prevChildKey) {
                if (first) {
                    first = false;
                } else {
                    let newPost = snapshot.val();
                    console.log("Heading: " + newPost.heading);
                    console.log("Description: " + newPost.description);
                    console.log("Location: " + newPost.location);
                    LocalPushController(newPost.heading, newPost.description, newPost.location);    
                }};  

            ref.limitToLast(1).on("child_added", onValueChange);

            return function cleanup() {
                ref.off("child_added", onValueChange);
        };}
});    

      return (null);

}