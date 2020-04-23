import React, {Component} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import Firebase from 'firebase';
import {globalStyles} from '../config/Styles';
import {Post} from '../config/ReusableVariables';
import {userKey} from '../config/ReusableVariables';

export default class FavouritesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //set value of favList as empty array to be filled
      favList: [],
    };
  }

  //function to obtain list of posts favourited by the logged in user
  getFavourites = () => {
    //path reference for logged in user's favourite posts in favourites table
    const ref = Firebase.database().ref('favourites/' + userKey);

    ref.on('value', snapshot => {
      //obtain entire section of database specified in reference as one object
      const favObject = snapshot.val();

      if (!favObject) {
        return console.warn('No data from firebase');
      } else {
        console.log('Favourites retrieved!');

        //converts data object of all the posts into an array of the posts
        const favArray = Object.values(favObject);

        //set variable favList to the array of posts
        this.setState({favList: favArray});
      }
    });
  };

  componentDidMount() {
    //runs function as soon as component i.e. FavouritesScreen is loaded
    this.getFavourites();
  }

  render() {
    return (
      <View>
        <FlatList
          keyExtractor={post => post.id}
          data={
            this.state.favList
            //inserts data to be rendered as the array of favourite posts
          }
          renderItem={({
            item: post,
            //each item in the array is identified as 'post'
          }) => (
            <Post
              //specified Post component rendered as item in list with fields from database rendered
              // in their designated sections
              key={post.id}
              heading={post.heading}
              description={post.description}
              location={post.location}
              createdBy={post.createdBy}
              createdAt={post.createdAt}
              uri={{uri: post.uri}}
              onPress={() => {
                const postKey = post.id;
                Firebase.database()
                  .ref('favourites/' + userKey + '/' + postKey)
                  .remove();
              }}
            />
          )}
        />
      </View>
    );
  }
}
