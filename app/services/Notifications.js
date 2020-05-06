import React, {useEffect} from 'react';
import Firebase from 'firebase';
import 'firebase/database';
import LocalPushController from '../services/LocalPushController';



export default function Notifications() {

    useEffect(() => {
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
        };
});    

      return (null);

}