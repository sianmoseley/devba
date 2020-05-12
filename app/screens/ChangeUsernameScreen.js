import React, {Component} from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from 'react-native';
import {Formik} from 'formik';
import Firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';
import {globalStyles} from '../style/Styles';

export default class ChangeUsernameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: Firebase.auth().currentUser.displayName,
      posts: [],
      userPosts: [],
    };
  }

  componentDidMount() {
    this.getPostData();
    this.getUserPosts();
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

  getUserPosts() {
    const userKey = Firebase.auth().currentUser.uid;
    const userPostRef = Firebase.database().ref('user_posts/' + userKey);
    userPostRef.on('value', snapshot => {
      //obtain entire section of database specified in reference as one object
      const postObject = snapshot.val();
      if (!postObject) {
        console.log('USER HAS NO POSTS:', Date(Date.now()));
        this.setState({userPosts: null});
      } else {
        console.log('USER POSTS RETRIEVED:', Date(Date.now()));
        //converts data object of all the posts into an array of the posts
        const postsArray = Object.values(postObject);
        //set variable userPostList to the array of posts
        this.setState({userPosts: postsArray});
      }
    });
  }

  //function that rewrites username in firebase authentication and database
  ChangeUsername(value) {
    //obtain the user and username of logged in user as objects
    const user = Firebase.auth().currentUser;
    const userKey = user.uid;
    user
      .updateProfile({displayName: value.username})
      .then(() => {
        Firebase.database()
          .ref('users/' + userKey)
          .update({username: value.username});
      })
      .then(() => {
        if (this.state.posts === null) {
          this.props.navigation.navigate('Account');
        } else {
          this.state.posts.forEach(post => {
            const uid = post.userkey;
            const postKey = post.id;
            if (userKey === uid) {
              Firebase.database()
                .ref('posts/' + postKey)
                .update({
                  createdBy: value.username,
                });
            }
          });
        }
      })
      .then(() => {
        if (this.state.userPosts === null) {
          this.props.navigation.navigate('Account');
        } else {
          this.state.userPosts.forEach(post => {
            const uid = post.userkey;
            const postKey = post.id;
            if (userKey === uid) {
              Firebase.database()
                .ref('user_posts/' + userKey + '/' + postKey)
                .update({
                  createdBy: value.username,
                });
            }
          });
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
            initialValues={{
              username: this.state.Username,
            }}
            enableReinitialize={true}
            onSubmit={values => {
              this.ChangeUsername({
                //values in authentication and database changed to newly set Username
                username: this.state.Username,
                displayName: this.state.Username,
              });
              Alert.alert(
                'Your username has been changed.',
                this.state.Username,
                [
                  {
                    text: 'OK',
                    onPress: () => this.props.navigation.goBack(),
                  },
                ],
              );
            }}>
            {formikProps => (
              <React.Fragment>
                <View style={globalStyles.formField}>
                  <Text style={globalStyles.formLabel}>Username:</Text>
                  <TextInput
                    style={globalStyles.inputBox}
                    //variable Username will be set to whatever is typed into this text input
                    onChangeText={text => this.setState({Username: text})}
                    value={this.state.Username}
                    style={globalStyles.formPlaceholder}
                  />
                  <TouchableOpacity
                    style={globalStyles.inAppButton}
                    onPress={formikProps.handleSubmit}>
                    <Text style={globalStyles.inAppTouchText}>
                      Change username
                    </Text>
                  </TouchableOpacity>
                </View>
              </React.Fragment>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
