import React, {Component} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
// import * as Animatable from 'react-native-animatable';
import {globalStyles} from '../config/Styles';
import Firebase from 'firebase';
import 'firebase/database';

// const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

const Post = ({
  heading,
  description,
  location,
  createdAt,
  createdBy,
  uri,
  report,
  favourite,
}) => (
  <View style={globalStyles.postContainer}>
    <Image source={uri} />
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
);

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: [],
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
    this.getPostData();
  }

  getPostData = () => {
    const ref = Firebase.database().ref('/posts');
    ref.on('value', snapshot => {
      const postsObject = snapshot.val();
      if (!postsObject) {
        console.log('NO DATA IN FIREBASE:', Date(Date.now()));
      } else {
        console.log('HOMESCREEN FIREBASE DATA RETRIEVED:', Date(Date.now()));
        const postsArray = Object.values(postsObject);
        this.setState({postList: postsArray});
      }
    });
  };

  render() {
    const {liked} = this.state;
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
          //inverted={true}
          // initialScrollIndex={}
          keyExtractor={post => post.id}
          data={this.state.postList}
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
                report={() =>
                  this.props.navigation.navigate('ReportPostScreen', post)
                }
                favourite={() => {
                  const userKey = Firebase.auth().currentUser.uid;
                  const postKey = post.id;
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
