import React, {Component} from 'react';
import {Image, FlatList, Text, View} from 'react-native';
import Firebase from 'firebase';
import {globalStyles} from '../style/Styles';
import {Post} from '../custom/Variables';

export default class ViewPostsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPostList: [],
    };
  }

  componentDidMount() {
    //executes on page load
    this.getUserPosts();
  }

  getUserPosts = () => {
    const userKey = Firebase.auth().currentUser.uid;
    const userPostRef = Firebase.database().ref('user_posts/' + userKey);
    userPostRef.on('value', snapshot => {
      //obtain entire section of database specified in reference as one object
      const postObject = snapshot.val();
      if (!postObject) {
        console.log('USER HAS NO POSTS:', Date(Date.now()));
        this.setState({userPostList: null});
      } else {
        console.log('USER POSTS RETRIEVED:', Date(Date.now()));
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
          <View style={{padding: 25}}>
            <View style={globalStyles.logoContainer}>
              <Image
                style={globalStyles.logoSize}
                source={require('../images/bigapp.png')}
              />
              <Text style={globalStyles.noPostText}>
                You've not listed any of your leftovers yet!
              </Text>
            </View>
          </View>
        ) : (
          <FlatList
            keyExtractor={post => post.id}
            data={this.state.userPostList.sort(a =>
              a.createdAt.localeCompare(),
            )}
            renderItem={({item: post}) => (
              <Post
                //individual posts made by the logged in user rendered
                key={post.id}
                heading={post.heading}
                description={post.description}
                location={post.location}
                createdAt={post.createdAt}
                createdBy={post.createdBy}
                url={post.url}
                onPress={() => this.props.navigation.navigate('EditForm', post)}
              />
            )}
          />
        )}
      </View>
    );
  }
}
