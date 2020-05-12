import React, {useEffect, useState} from 'react';
import Firebase from 'firebase';
import 'firebase/database';
import LocalPushController from '../services/LocalPushController';


export default function Notifications() {
    //assumes notification preferences are false if a preference hasn't been set yet
    const [notificationPreferences, setNotificationPreferences] = useState(false);
    //get user from authentication
    let user = Firebase.auth().currentUser;
    //set path to user's attributes
    let dbuser = Firebase.database().ref('users/' + user.uid);     
    //grab current date to compare to date post was created (stops notifications firing when posts are deleted)
    const date = new Date();

    useEffect(() => {
        //gets user's notification preferences from the database
        dbuser.on('value', snapshot => {
            const userObject = snapshot.val();
            //if is needed to avoid errors when a user is deleted
            if (userObject) {
                setNotificationPreferences(userObject.notifications)
            }
            ;
          });
        
        //this if code runs if the user has opted into notifications
        if (notificationPreferences === true) {
            let first = true;
            const ref = Firebase.database().ref('/posts');
            const onValueChange = function(snapshot, prevChildKey) {    
                console.log("notifications check 1");       
                let newPost = snapshot.val();
                console.log('snapshot: ',snapshot.val());
                //puts current date into same format as post createdat
                let now = ([date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/') +' ' +
                [date.getHours(),(date.getMinutes() < 10 ? '0' : '') + date.getMinutes(),].join(':')); 

                //this if code makes sure notifications are only fired for additional posts                                         
                if (first) {
                    first = false;
                    console.log("notifications check 2");
                } else {                     
                    //this if code stops the code firing when a post has been deleted
                    console.log("notifications check 3");
                    if (newPost.createdAt == now) {
                        console.log("notifications check 4");
                        LocalPushController(newPost.heading, newPost.description, newPost.location);                          
                    }                          
                }                    
            };  

            //code will only fire for last child added
            ref.limitToLast(1).on("child_added", onValueChange);

            //makes sure the notifications won't fire when the user logs out - stops when the component unmounts
            return function cleanup() {
                ref.off("child_added", onValueChange);
        };}
});    

      return (null);

}