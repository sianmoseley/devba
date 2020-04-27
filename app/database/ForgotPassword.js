import Firebase from 'firebase';

//replicates model aspect of MVC architecture
export default async function ResetPassword(values, navigation) {
  Firebase.auth()
    .sendPasswordResetEmail(values.email)
    .then(() => navigation.navigate('Login'))
    .catch(function(error) {
      //handle errors here
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/invalid-email') {
        alert('Email address is not valid');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
}
