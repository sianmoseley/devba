import Firebase from 'firebase';

//firebase function to authenticate user gets called onSubmit
//replicates model aspect of MVC architecture
export default async function SubmitLogin(values) {
  Firebase.auth()
    .signInWithEmailAndPassword(values.email, values.password)
    .catch(function(error) {
      //handle errors here
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Incorrect password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  console.log('USER LOGGED IN SUCCESSFULLY', Date(Date.now()));
}
