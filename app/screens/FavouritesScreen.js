import React, {Component, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import Firebase from 'firebase';
import {globalStyles} from '../config/Styles';

const Post = ({
  heading,
  description,
  location,
  createdAt,
  createdBy,
  onPress,
}) => (
  <View style={globalStyles.postContainer}>
    {/* <TouchableOpacity> */}
    <Text style={globalStyles.postText}>
      {heading} @ {location}
      {'\n'}
      posted by {createdBy}
      {'\n'}
      {description}
      {'\n'}
      {createdAt}
    </Text>
    {/* <View style={globalStyles.iconFlagMargin}>
        <Icon
          iconStyle={globalStyles.iconFlag}
          name="flag"
          type="entypo"
          onPress={onPress}
        />
      </View> */}
    {/* </TouchableOpacity> */}
  </View>
);

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //set value of favList as empty array
      favList: [],
    };
  }

  //obtain list of posts favourited by current user
  getFavourites = () => {
    const userKey = Firebase.auth().currentUser.uid;
    //path reference for current user's favourite posts
    const ref = Firebase.database().ref('favourites/' + userKey);
    ref.on('value', snapshot => {
      //obtain entire section of database specified in reference as one object
      const favObject = snapshot.val();
      if (!favObject) {
        return console.warn('NO DATA FROM FIREBASE', Date(Date.now()));
      } else {
        console.log('FAVOURITES RETRIEVED!', Date(Date.now()));
        const favArray = Object.values(favObject);
        //assign data to favList array
        this.setState({favList: favArray});
      }
    });
  };

  componentDidMount() {
    //executes function as FavouritesScreen is loaded
    this.getFavourites();
  }

  render() {
    return (
      <View>
        <FlatList
          keyExtractor={post => post.heading}
          //inserts data to be rendered as the array of favourite posts
          data={this.state.favList.sort(a => a.createdAt.localeCompare())}
          //each item in the array is identified as 'post'
          renderItem={({item: post}) => (
            <Post
              //specified Post component rendered as item in list with fields from database rendered in their designated sections
              key={post.id}
              heading={post.heading}
              description={post.description}
              location={post.location}
              createdAt={post.createdAt}
              createdBy={post.createdBy}
              image={post.image && {uri: post.image}}
            />
          )}
        />
      </View>
    );
  }
}
