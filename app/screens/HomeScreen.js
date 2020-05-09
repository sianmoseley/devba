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
  Button,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {globalStyles} from '../config/Styles';
import Firebase from 'firebase';
import 'firebase/database';

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
      likedPosts: [],
    };
  }

  componentDidMount() {
    //function runs as soon as 'HomeScreen' is rendered
    this.getPostData();
  }

  // componentWillUnmount() {
  //   this.getPostData();
  // }

  //function to get post data from firebase database
  getPostData = () => {
    //path reference for posts table
    const ref = Firebase.database().ref('/posts');
    ref.on('value', snapshot => {
      //all data for all posts set as one object
      const postsObject = snapshot.val();
      if (!postsObject) {
        console.log('NO HOMESCREEN DATA:', Date(Date.now()));
      } else {
        console.log('HOMESCREEN FIREBASE DATA RETRIEVED:', Date(Date.now()));        
        //object with all post data converted into an array of posts
        const postsArray = Object.values(postsObject);

        //get list of posts created today by filtering postsArray
        const date = new Date();
        let now = ([date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/') +' ' +
                [date.getHours(),(date.getMinutes() < 10 ? '0' : '') + date.getMinutes(),].join(':'));  
        function todaysPosts(post) {
          return post.createdAt.substring(0,6) === now.substring(0,6);
        }
        const recentPosts = postsArray.filter(todaysPosts);

        //set value of postList to the filtered array of posts
        this.setState({postList: recentPosts});
      }
    });

    //current user unique id
    const userID = Firebase.auth().currentUser.uid;
    Firebase.database()
      //look at current users liked posts table
      .ref('favourites/' + userID)
      .on('value', snapshot => {
        //store value of current users liked posts
        const likedObject = snapshot.val();
        if (!likedObject) {
          console.log('USER HAS NO LIKES:', Date(Date.now()));
          //solves bug if user unlikes post from fav screen
          //but heart of last post to be unliked is still filled in
          this.setState({
            likedPosts: [],
          });
        } else {
          console.log('LIKES RETRIEVED:', Date(Date.now()));
          //stores id of ALL posts user has liked
          let postID = Object.keys(likedObject);
          //set likedPosts array to above postID value
          this.setState({
            likedPosts: postID,
          });
        }
      });
  };

  render() {
    //log all of current users liked posts
    console.log('likedPosts:', this.state.likedPosts);
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
              <Image
                style={{alignSelf: 'center', height: 200, width: 200}}
                source={{uri: post.url}}
              />
              <View style={globalStyles.iconMargin}>
                <Icon
                  raised
                  iconStyle={globalStyles.icon}
                  name={
                    this.state.likedPosts.indexOf(post.id) > -1
                      ? 'heart'
                      : 'heart-o'
                  }
                  size={28}
                  type="font-awesome"
                  onPress={() => {
                    const userKey = Firebase.auth().currentUser.uid;
                    const postKey = post.id;
                    const favRef = Firebase.database().ref(
                      'favourites/' + userKey + '/' + postKey,
                    );

                    //check that the array doesn't contain the post id (i.e. the post was not previously liked)
                    if (this.state.likedPosts.indexOf(post.id) === -1) {
                      favRef.set({
                        id: postKey,
                        heading: post.heading,
                        description: post.description,
                        location: post.location,
                        createdAt: post.createdAt,
                        createdBy: post.createdBy,
                        url: post.url
                      });
                    } else {
                      favRef.remove();
                      //grab index of post.id
                      let index = this.state.likedPosts.indexOf(post.id);
                      //splice the post.id from the rendered likedPosts array
                      this.state.likedPosts.splice(index, 1);
                      //then set state for rendered likedPosts to post-splice likedPosts
                      this.setState({
                        likedPosts: this.state.likedPosts,
                      });
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
