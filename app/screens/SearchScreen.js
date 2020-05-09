import React, {Component} from 'react';
import {Picker} from '@react-native-community/picker';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import Firebase from 'firebase';
import {globalStyles} from '../config/Styles';

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    //sets state for picker and initialzes two empty arrays
    this.state = {
      location: 'Adsetts',
      postList: [],
      searchedList: [],
      likedPosts: [],
    };
  }

  componentDidMount() {
    //executes when page loads
    this.getPostData();
  }

  //stores all posts in postList array
  getPostData = () => {
    const ref = Firebase.database().ref('/posts');
    ref.on('value', snapshot => {
      const postsObject = snapshot.val();
      if (!postsObject) {
        console.log('NO SEARCH DATA:', Date(Date.now()));
        // this.setState({postList: null});
      } else {
        console.log('SEARCH DATA RETRIEVED:', Date(Date.now()));
        const postsArray = Object.values(postsObject);
        this.setState({postList: postsArray});
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

  //executes when search button is pressed
  //stores all posts with corresponding location in searchedList array
  onPressSearchHandler(location) {
    let searchedListVar = this.state.postList.filter(function(post) {
      return post.location === location;
    });
    console.log(searchedListVar);
    this.setState({
      searchedList: searchedListVar,
    });
  }

  render() {
    return (
      //added paddingBottom so last post doesn't get clipped
      <View style={{paddingBottom: 25}}>
        <View style={globalStyles.formField}>
          <Picker
            style={globalStyles.formPicker}
            mode="dialog"
            prompt="Search posts by location"
            selectedValue={this.state.location}
            onValueChange={(itemValue, itemPosition) =>
              this.setState({location: itemValue})
            }>
            <Picker.Item label="Adsetts" value="Adsetts" />
            <Picker.Item label="Arundel" value="Arundel" />
            <Picker.Item label="Cantor" value="Cantor" />
            <Picker.Item label="Charles Street" value="Charles Street" />
            <Picker.Item label="Chestnut Court" value="Chestnut Court" />
            <Picker.Item label="Collegiate Hall" value="Collegiate Hall" />
            <Picker.Item label="Eric Mensforth" value="Eric Mensforth" />
            <Picker.Item label="Harmer" value="Harmer" />
            <Picker.Item label="Heart of Campus" value="Heart of Campus" />
            <Picker.Item label="Howard/Surrey" value="Howard_Surrey" />
            <Picker.Item label="Library" value="Library" />
            <Picker.Item label="Main Building" value="Main Building" />
            <Picker.Item label="The Mews" value="The Mews" />
            <Picker.Item label="Norfolk" value="Norfolk" />
            <Picker.Item label="Oneleven" value="Oneleven" />
            <Picker.Item label="Owen" value="Owen" />
            <Picker.Item
              label="Robert Winston Building"
              value="Robert Winston Building"
            />
            <Picker.Item label="Saunders Building" value="Saunders Building" />
            <Picker.Item
              label="Sheffield Institute of Arts"
              value="Sheffield Institute of Arts"
            />
            <Picker.Item label="Sheaf" value="Sheaf" />
            <Picker.Item label="Stoddart" value="Stoddart" />
            <Picker.Item label="Willow Court" value="Willow Court" />
            <Picker.Item label="Woodville" value="Woodville" />
          </Picker>
          <TouchableOpacity
            style={globalStyles.inAppButton}
            onPress={() => this.onPressSearchHandler(this.state.location)}>
            <Text style={globalStyles.inAppTouchText}>SEARCH</Text>
          </TouchableOpacity>
          <FlatList
            keyExtractor={post => post.id}
            // data={this.state.searchedList.sort(a =>
            //   a.createdAt.localeCompare(),
            // )}
            data={this.state.searchedList}
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
        </View>
      </View>
    );
  }
}
