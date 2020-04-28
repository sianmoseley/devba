import Firebase from 'firebase';
import {date, userKey} from '../config/Variables';

//global variable
let Username = '';

export default async function ReportBug(values, submitComplete) {
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
        //date formatted: DD/MM/YYYY hh:mm
        reportTimeStamp:
          [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/') +
          ' ' +
          [
            date.getHours(),
            (date.getMinutes() < 10 ? '0' : '') + date.getMinutes(),
          ].join(':'),
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
