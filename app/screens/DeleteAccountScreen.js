import React, {Component} from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {globalStyles} from '../style/Styles';
import {CustomTextInput} from '../custom/Variables';
import {Formik} from 'formik';
import * as yup from 'yup';
import DeleteUser from '../database/DeleteAccount';
import Firebase from 'firebase';

//client-side validation with yup
const deleteAccountSchema = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: yup
    .string()
    .label('Password')
    .required('Please enter your current password'),
});

export default class DeleteAccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.getPostData();
  }

  getPostData() {
    const ref = Firebase.database().ref('/posts');
    ref.on('value', snapshot => {
      //all data for all posts set as one object
      const postsObject = snapshot.val();
      if (!postsObject) {
        console.log('NO DATA IN FIREBASE:', Date(Date.now()));
      } else {
        console.log('HOMESCREEN FIREBASE DATA RETRIEVED:', Date(Date.now()));
        //object with all post data converted into an array of posts
        const postsArray = Object.values(postsObject);
        //set value of postList to the array of posts
        this.setState({posts: postsArray});
      }
    });
  }

  deletePosts() {
    const currentUID = Firebase.auth().currentUser.uid;
    this.state.posts.forEach(post => {
      const UID = post.userkey;
      const postKey = post.id;
      if (UID === currentUID) {
        Firebase.database()
          .ref('posts/' + postKey)
          .remove();
      }
    });
  }

  render() {
    return (
      <TouchableWithoutFeedback
        touchSoundDisabled={true}
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View>
          <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={(values, actions) => {
              console.log(values);              
              this.deletePosts();
              DeleteUser(values);
              setTimeout(() => {
                actions.setSubmitting(false);
              }, 1000);
              Keyboard.dismiss();
              Alert.alert('You deleted your account.', ':(', [
                {
                  text: 'OK',
                },
              ]);
            }}
            validationSchema={deleteAccountSchema}>
            {formikProps => (
              <React.Fragment>
                <View style={globalStyles.formField}>
                  <CustomTextInput
                    label="Please enter your email:"
                    formikProps={formikProps}
                    formikKey="email"
                    placeholder="Please enter your email"
                  />
                  <CustomTextInput
                    label="Please enter your password:"
                    formikProps={formikProps}
                    formikKey="password"
                    placeholder="Please enter your password"
                    secureTextEntry
                  />
                  <View style={globalStyles.submitButtonContainer}>
                    {formikProps.isSubmitting ? (
                      <ActivityIndicator size="large" color="#28A966" />
                    ) : (
                      <View>
                        <TouchableOpacity
                          style={globalStyles.inAppButton}
                          onPress={formikProps.handleSubmit}>
                          <Text style={globalStyles.inAppTouchText}>
                            Delete My Account
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              </React.Fragment>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
