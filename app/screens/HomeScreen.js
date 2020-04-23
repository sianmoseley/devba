import React, {Component} from 'react';
import {FlatList, Text, Image, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {globalStyles} from '../config/Styles';
import Firebase from 'firebase';
import 'firebase/database';

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
);

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //set value of postList variable as an empty array
      postList: [],
    };
  }

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
    return (
      <View>
        <FlatList
          //data for list specified as the list of posts
          keyExtractor={post => post.id}
          data={
            this.state.postList.sort(a => a.createdAt.localeCompare())
            //posts sorted by newest to oldest
          }
          renderItem={({
            item: post,
            //each item in list identified as 'post'
          }) => (
            <Post
              //all fields rendered in designated sections in Post component
              key={post.heading}
              heading={post.heading}
              description={post.description}
              location={post.location}
              createdAt={post.createdAt}
              createdBy={post.createdBy}
              uri={{uri: post.uri}}
              //when report icon pressed, navigates user to the screen in which to report the post
              report={() =>
                this.props.navigation.navigate('ReportPostScreen', post)
              }
              //when the favourite icon pressed, following function runs
              favourite={() => {
                const userKey = Firebase.auth().currentUser.uid;
                const postKey = post.id;

                //path reference for favourites table under id of logged in user
                const favRef = Firebase.database().ref(
                  'favourites/' + userKey + '/' + postKey,
                );

                //fields in tables are set to values matching the post clicked
                favRef.set({
                  id: postKey,
                  heading: post.heading,
                  description: post.description,
                  location: post.location,
                  createdAt: post.createdAt,
                  createdBy: post.createdBy,
                  uri: post.uri,
                });
              }}
            />
          )}
        />
      </View>
    );
  }
}
