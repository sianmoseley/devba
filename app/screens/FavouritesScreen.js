import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import Firebase from 'firebase';
import {userKey, Post} from '../config/Variables';

export default class FavouritesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //set value of favList as empty array
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
        return console.warn('NO DATA FROM FIREBASE:', Date(Date.now()));
      } else {
        console.log('FAVOURITES RETRIEVED:', Date(Date.now()));
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
          keyExtractor={post => post.id}
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
