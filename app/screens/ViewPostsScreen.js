import React, {Component} from 'react';
import {
  Icon,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';
import {globalStyles} from '../config/Styles';

const Post = ({
  heading,
  description,
  location,
  createdBy,
  createdAt,
  uri,
  edit,
}) => (
  <View style={globalStyles.postContainer}>
    <TouchableOpacity onPress={edit}>
      <Text style={globalStyles.postText}>
        {heading} @ {location}
        {'\n'}
        posted by {createdBy}
        {'\n'}
        {description}
        {'\n'}
        {createdAt}
      </Text>
      <View style={globalStyles.iconMargin}>
        {/* <Icon
          iconStyle={globalStyles.icon}
          name="flag"
          type="entypo"
          // onPress={onPress}
        /> */}
      </View>
    </TouchableOpacity>
  </View>
);

export default class ViewPostsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //sets empty array
      userPostList: [],
    };
  }

  componentDidMount() {
    //executes function on page load
    this.getUserPosts();
  }

  getUserPosts = () => {
    const userKey = Firebase.auth().currentUser.uid;
    const ref = Firebase.database().ref('user_posts/' + userKey);
    ref.on('value', snapshot => {
      //obtain entire section of database specified in reference as one object
      const postObject = snapshot.val();
      if (!postObject) {
        console.log('USER HAS NO POSTS', Date(Date.now()));
        this.setState({userPostList: null});
      } else {
        console.log('USER POSTS RETRIEVED!', Date(Date.now()));
        //converts data object of all the posts into an array of the posts
        const postsArray = Object.values(postObject);
        //set variable userPostList to the array of posts
        this.setState({userPostList: postsArray});
      }
    });
  };

  render() {
    return (
      <View>
        {!this.state.userPostList ? (
          <View>
            <View style={globalStyles.logoContainer}>
              <Image
                style={{width: '69%', height: '60%'}}
                source={require('../images/bigapp.png')}
              />
              <Text style={{fontSize: 16, marginTop: 90}}>
                You've not listed any of your leftovers yet!
              </Text>
            </View>
          </View>
        ) : (
          <FlatList
            keyExtractor={post => post.heading}
            data={this.state.userPostList}
            renderItem={({item: post}) => (
              <Post
                //individual posts made by the logged in user rendered
                key={post.id}
                heading={post.heading}
                description={post.description}
                location={post.location}
                createdAt={post.createdAt}
                createdBy={post.createdBy}
                image={post.image && {uri: post.image}}
                onPress={() =>
                  this.props.navigation.navigate('PostDetails', post)
                }
                edit={() => this.props.navigation.navigate('EditForm', post)}
              />
            )}
          />
        )}
      </View>
    );
  }
}
