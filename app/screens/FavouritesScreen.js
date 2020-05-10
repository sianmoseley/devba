import React, {Component} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import Firebase from 'firebase';
import {globalStyles} from '../config/Styles';

//global variable enables interaction with onPress
let userKey = '';

export default class FavouritesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //set value of favList as empty array
      favList: [],
      likedPosts: [],
    };
  }

  componentDidMount() {
    //executes on page load
    this.getFavourites();
  }

  //function to obtain list of posts favourited by the logged in user
  getFavourites = () => {
    //current user unique id
    userKey = Firebase.auth().currentUser.uid;
    //path reference for logged in user's favourite posts in favourites table
    const ref = Firebase.database().ref('favourites/' + userKey);

    ref.on('value', snapshot => {
      //obtain entire section of database specified in reference as one object
      const favObject = snapshot.val();
      if (!favObject) {
        console.log('NO FAVOURITES DATA FROM FIREBASE:', Date(Date.now()));
        this.setState({favList: null});
      } else {
        console.log('FAVOURITES RETRIEVED:', Date(Date.now()));
        const favArray = Object.values(favObject);
        //assign data to favList array
        this.setState({favList: favArray});
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
    return (
      <View>
        {!this.state.favList ? (
          <View
            style={{
              paddingTop: 100,
            }}>
            <View style={globalStyles.logoContainer}>
              <Image
                style={{width: 275, height: 238}}
                source={require('../images/bigapp.png')}
              />
              <Text style={{fontSize: 18, marginTop: 90, fontFamily: 'arial'}}>
                You've not 'hearted' any posts yet!
              </Text>
            </View>
          </View>
        ) : (
          <FlatList
            keyExtractor={post => post.id}
            //inserts data to be rendered as the array of favourite posts
            // data={this.state.favList.sort(a => a.createdAt.localeCompare())}
            data={this.state.favList}
            //each item in the array is identified as 'post'
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
                    on{' '}
                    <Text style={{fontWeight: 'bold'}}>{post.createdAt}</Text>
                  </Text>

                  {/* SIAN - IMAGE INSERTED INTO POST VIEW, HAPPY FOR THIS TO BE MOVED, SIZE CHANGED ETC */}

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
        )}
      </View>
    );
  }
}
