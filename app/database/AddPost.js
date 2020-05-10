import Firebase from 'firebase';

//global variable
let Username = '';

export default async function AddPost(values, addComplete) {
  //reads today's date in default Javascript
  const date = new Date();
  //current user ID
  const userKey = Firebase.auth().currentUser.uid;

  //creates unique identifier to be used for new post
  const key = Firebase.database()
    //path in realtime-database established
    .ref('posts')
    .push().key;

  Firebase.database()
    .ref('users/' + userKey)
    .on('value', snapshot => {
      //set of data in path read as an object
      const user = snapshot.val();
      //extract specific value of username
      Username = user.username;
    });

  try {
    await Firebase.database()
      .ref('posts/' + key)
      //values for each field declared
      .set({
        id: key,
        heading: values.heading,
        description: values.description,
        location: values.location,
        //date formatted: DD/MM/YYYY hh:mm
        createdAt:
          [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/') +
          ' ' +
          [
            date.getHours(),
            (date.getMinutes() < 10 ? '0' : '') + date.getMinutes(),
          ].join(':'),
        createdBy: Username,
        uri: values.uri, //SIAN - ADDED THIS LINE HERE FOR DATABASE
        filename: values.filename,
        userkey: values.userkey,
        url: values.url,
      })
      .then(console.log('POST ADDED SUCCESSFULLY:', Date(Date.now())));
    Firebase.database()
      //same values for post are added to the user_posts table, so every post a user makes is tracked
      .ref('user_posts/' + userKey + '/' + key)
      .set({
        id: key,
        heading: values.heading,
        description: values.description,
        location: values.location,
        createdAt:
          [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/') +
          ' ' +
          [
            date.getHours(),
            (date.getMinutes() < 10 ? '0' : '') + date.getMinutes(),
          ].join(':'),
        createdBy: Username,
        uri: values.uri, //SIAN - ADDED THIS LINE HERE FOR DATABASE
        filename: values.filename,
        userkey: values.userkey,
        url: values.url,
      });
    const snapshot = undefined;
    values.Id = snapshot.Id;
    snapshot.set(values);
    return addComplete(values);
  } catch (error) {
    return console.log(error);
  }
}
