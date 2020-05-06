import React, {useEffect} from 'react';
import Firebase from 'firebase';
import 'firebase/database';
import LocalPushController from '../services/LocalPushController';



export default function Notifications() {
    let user = Firebase.auth().currentUser;
    let uid = user.uid;
    let dbuser = Firebase.database().ref('users/' + uid);
    //need to change this so it's actually reading user preferences from the db
    let notificationPreferences = true;

    useEffect(() => {

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