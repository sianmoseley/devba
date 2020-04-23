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
      userPostList: [],
    };
  }

  componentDidMount() {
    this.getUserPosts();
  }

  getUserPosts = () => {
    const userKey = Firebase.auth().currentUser.uid;
    const ref = Firebase.database().ref('user_posts/' + userKey);
    ref.on('value', snapshot => {
      const postObject = snapshot.val();
      if (!postObject) {
        console.log('USER HAS NO POSTS', Date(Date.now()));
        this.setState({userPostList: null});
      } else {
        console.log('USER POSTS RETRIEVED!', Date(Date.now()));
        const postsArray = Object.values(postObject);
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
                style={globalStyles.logo}
                source={require('../images/burger.png')}
              />
              <Text style={{fontSize: 16}}>
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
