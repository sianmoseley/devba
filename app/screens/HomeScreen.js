import React, {Component} from 'react';
import {
  Animated,
  FlatList,
  Image,
  RefreshControl,
  Text,
  ToolbarAndroidComponent,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {globalStyles} from '../config/Styles';
import Firebase from 'firebase';
import 'firebase/database';
import LocalPushController from '../services/LocalPushController';

//TODO
//refresh
// function wait(timeout) {
//   return new Promise(resolve => {
//     setTimeout(resolve, timeout);
//   });
// }

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //set value of postList variable as an empty array
      postList: [],
      // refreshing: false,
      liked: false,
    };
  }

  componentDidMount() {
    //function runs as soon as the component 'HomeScreen' is loaded
    this.getPostData();
    this.newPostNotification();
  }

  newPostNotification = () => {
    let first = true;
    const ref = Firebase.database().ref('/posts');

    ref.limitToLast(1).on("child_added", function(snapshot, prevChildKey) {
      if (first) {
        first = false;
      }
      else {
        let newPost = snapshot.val();
        console.log("Heading: " + newPost.heading);
        console.log("Description: " + newPost.description);
        console.log("Location: " + newPost.location);
        LocalPushController(newPost.heading, newPost.description, newPost.location);

      }
      
    });
  };  

 

  //function to get post data from firebase database
  getPostData = () => {
    //path reference for posts table
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
        this.setState({postList: postsArray});
      }
    });
  };

  render() {
    return (
      <FlatList
        //data for list specified as the list of posts
        keyExtractor={post => post.id}
        //posts sorted by newest first
        // data={this.state.postList.sort(a => a.createdAt.localeCompare())}
        data={this.state.postList}
        renderItem={({item: post}) => (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('LocatePostScreen', {
                location: post.location,
              })
            }>
            <View style={globalStyles.postContainer}>
              <Text style={globalStyles.postText}>
                {post.heading}
                {'\n'}@{' '}
                <Text style={{fontWeight: 'bold'}}>{post.location}</Text>
                {'\n'}
                {post.description}
                {'\n'}
                listed by{' '}
                <Text style={{fontWeight: 'bold'}}>{post.createdBy}</Text>
                {'\n'}
                on <Text style={{fontWeight: 'bold'}}>{post.createdAt}</Text>
              </Text>
              {/* SIAN - IMAGE INSERTED INTO POST VIEW, HAPPY FOR THIS TO BE MOVED, SIZE CHANGED ETC */}
              {/* <Image
                  style={{alignSelf: 'center', height: 150, width: 150}}
                  source={post.uri}
                /> */}
              <View style={globalStyles.iconMargin}>
                <Icon
                  raised
                  iconStyle={globalStyles.icon}
                  name={this.state.liked ? 'heart' : 'heart-o'}
                  size={28}
                  type="font-awesome"
                  onPress={() => {
                    const userKey = Firebase.auth().currentUser.uid;
                    const postKey = post.id;
                    const favRef = Firebase.database().ref(
                      'favourites/' + userKey + '/' + postKey,
                    );
                    if (this.state.liked === false) {
                      favRef.set({
                        id: postKey,
                        heading: post.heading,
                        description: post.description,
                        location: post.location,
                        createdAt: post.createdAt,
                        createdBy: post.createdBy,
                      });
                      this.setState({liked: true});
                    } else {
                      favRef.remove();
                      this.setState({liked: false});
                    }
                  }}
                />
                <Icon
                  raised
                  iconStyle={globalStyles.icon}
                  name="flag-o"
                  size={28}
                  type="font-awesome"
                  onPress={() =>
                    this.props.navigation.navigate('ReportPostScreen', post)
                  }
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  }
}
