import React, {Component} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  ToolbarAndroidComponent,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
// import * as Animatable from 'react-native-animatable';
import {globalStyles} from '../config/Styles';
import Firebase from 'firebase';
import 'firebase/database';

// const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

const Post = ({
  createdAt,
  createdBy,
  description,
  favourite,
  heading,
  location,
  uri,
  report,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={globalStyles.postContainer}>
      <Image style={globalStyles.image} source={uri} />
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
        <Icon
          iconStyle={globalStyles.icon}
          name="heart"
          type="feather"
          onPress={favourite}
        />
        <Icon
          iconStyle={globalStyles.icon}
          name="flag"
          type="feather"
          onPress={report}
        />
      </View>
    </View>
  </TouchableOpacity>
);

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //set value of postList variable as an empty array
      postList: [],
      refreshing: false,
      // liked: false, //auto set to false on page load, change to interact with firebase user 'fav'
    };
  }

  // handleSmallAnimatedIconRef = ref => {
  //   this.smallAnimatedIcon = ref;
  // };
  // handleOnPressLike = () => {
  //   /* This is a separate function for liking the photo,
  //   it activates only smart heart animation and it's invoked by pressing small icon */
  //   this.smallAnimatedIcon.bounceIn();
  //   this.setState(prevState => ({liked: !prevState.liked}));
  // };

  componentDidMount() {
    //function runs as soon as the component 'HomeScreen' is loaded
    this.getPostData();
  }

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
    // const {liked} = this.state;
    return (
      <View>
        {/* <AnimatedIcon
          iconStyle={globalStyles.icon}
          name={liked ? 'favorite' : 'favorite-border'}
          type="material"
          ref={this.handleSmallAnimatedIconRef}
          onPress={this.handleOnPressLike}
        /> */}
        <FlatList
          //data for list specified as the list of posts
          keyExtractor={post => post.id}
          //posts sorted by newest to oldest
          data={this.state.postList.sort(a => a.createdAt.localeCompare())}
          // data={this.state.postList}
          renderItem={({item: post}) => (
            <View>
              <Post
                key={post.heading}
                heading={post.heading}
                description={post.description}
                location={post.location}
                createdAt={post.createdAt}
                createdBy={post.createdBy}
                uri={{uri: post.uri}}
                onPress={() =>
                  this.props.navigation.navigate('LocatePostScreen', {
                    location: post.location,
                  })
                }
                //when report icon pressed, navigates user to ReportPostScreen
                report={() =>
                  this.props.navigation.navigate('ReportPostScreen', post)
                }
                //when the favourite icon pressed, function executes
                favourite={() => {
                  const postKey = post.id;
                  const userKey = Firebase.auth().currentUser.uid;
                  const favRef = Firebase.database().ref(
                    'favourites/' + userKey + '/' + postKey,
                  );
                  favRef.set({
                    id: postKey,
                    heading: post.heading,
                    description: post.description,
                    location: post.location,
                    createdAt: post.createdAt,
                    createdBy: post.createdBy,
                  });
                }}
              />
              {/* <AnimatedIcon
                iconStyle={globalStyles.icon}
                name={liked ? 'favorite' : 'favorite-border'}
                type="material"
                ref={this.handleSmallAnimatedIconRef}
                onPress={this.handleOnPressLike}
              /> */}
            </View>
          )}
        />
      </View>
    );
  }
}
