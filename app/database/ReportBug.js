import Firebase from 'firebase';
import today from '../custom/Variables';

//global variable
let Username = '';

export default async function ReportBug(values, submitComplete) {
  //current user ID
  const userKey = Firebase.auth().currentUser.uid;

  //creates unique identifier to be used for new post
  const key = Firebase.database()
    .ref('bugReports')
    .push().key;

  //references firebase to grab current user username
  Firebase.database()
    .ref('users/' + userKey)
    .on('value', snapshot => {
      const user = snapshot.val();
      Username = user.username;
    });

  try {
    await Firebase.database()
      .ref('bugReports/' + key)
      .set({
        //stores data in firebase
        bugDescription: values.bugDescription,
        bugId: key,
        bugType: values.bugType,
        reportTimeStamp: today,
        submittedBy: Username,
      })
      .then(console.log('BUG REPORTED SUCCESSFULLY:', Date(Date.now())));
    const snapshot = undefined;
    values.Id = snapshot.Id;
    snapshot.set(values);
    return submitComplete(values);
  } catch (error) {
    return console.log(error);
  }
}
