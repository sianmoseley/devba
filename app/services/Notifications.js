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
    //grab current date to post createdAt (stops notifications firing when posts are deleted)
    const date = new Date();

    useEffect(() => {
        dbuser.on('value', snapshot => {
            const userObject = snapshot.val();
            setNotificationPreferences(userObject.notifications);
            //assumes notification preferences are false if a preference hasn't been set yet
            setNotificationPreferences(userObject.notifications);
          });
        

        if (notificationPreferences === true) {
            let first = true;
            const ref = Firebase.database().ref('/posts');
            const onValueChange = function(snapshot, prevChildKey) {
                let newPost = snapshot.val();
                //puts current date into same format as post createdat
                let now = ([date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/') +' ' +
                [date.getHours(),(date.getMinutes() < 10 ? '0' : '') + date.getMinutes(),].join(':'));   
                                         
                    if (first) {
                        first = false;
                    } else {                     
                        
                        if (newPost.createdAt == now) {                            
                            console.log("Heading: " + newPost.heading);
                            console.log("Description: " + newPost.description);
                            console.log("Location: " + newPost.location);
                            LocalPushController(newPost.heading, newPost.description, newPost.location);                          
                        }                          
                    }
                    
                };  

            ref.limitToLast(1).on("child_added", onValueChange);

            return function cleanup() {
                ref.off("child_added", onValueChange);
        };}
});    

      return (null);

}