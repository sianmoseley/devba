import React, {Component} from 'react';
import {FlatList, Text, Image, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {globalStyles} from '../config/Styles';
import Firebase from 'firebase';
import 'firebase/database';
import {create} from 'react-native/jest/renderer';

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
      postList: [],
    };
  }

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
    return (
      <View>
        <FlatList
          //inverted={true}
          // initialScrollIndex={}
          keyExtractor={post => post.id}
          data={this.state.postList.sort(a => a.createdAt.localeCompare())}
          renderItem={({item: post}) => (
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
          )}
        />
      </View>
    );
  }
}
