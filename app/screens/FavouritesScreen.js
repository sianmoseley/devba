import React, {Component, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import Firebase from 'firebase';
import {globalStyles} from '../config/Styles';

const Post = ({heading, description, location, createdBy, onPress}) => (
  <View style={globalStyles.postContainer}>
    {/* <TouchableOpacity> */}
    <Text style={globalStyles.postText}>
      {heading} @ {location}
      {'\n'}
      posted by {createdBy}
      {'\n'}
      {description}
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
      favList: [],
    };
  }

  getFavourites = () => {
    const userKey = Firebase.auth().currentUser.uid;
    const ref = Firebase.database().ref('favourites/' + userKey);
    ref.on('value', snapshot => {
      const favObject = snapshot.val();
      if (!favObject) {
        return console.warn('No data from firebase');
      } else {
        console.log('Favourites retrieved!');
        const favArray = Object.values(favObject);
        this.setState({favList: favArray});
      }
    });
  };

  componentDidMount() {
    this.getFavourites();
  }

  render() {
    return (
      <View>
        <FlatList
          keyExtractor={post => post.heading}
          data={this.state.favList}
          renderItem={({item: post}) => (
            <Post
              key={post.id}
              heading={post.heading}
              description={post.description}
              location={post.location}
              createdBy={post.createdBy}
              image={post.image && {uri: post.image}}
            />
          )}
        />
      </View>
    );
  }
}
