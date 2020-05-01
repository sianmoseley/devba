import React, {Component} from 'react';
import {Image, FlatList, Text, View} from 'react-native';
import Firebase from 'firebase';
import {globalStyles} from '../config/Styles';
import {Post} from '../config/Variables';

export default class ViewPostsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //sets empty array
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
                uri={{uri: post.uri}}
                onPress={() => this.props.navigation.navigate('EditForm', post)}
              />
            )}
          />
        )}
      </View>
    );
  }
}
