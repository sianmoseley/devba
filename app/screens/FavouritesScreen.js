import React, {Component} from 'react';
import {Image, FlatList, Text, View} from 'react-native';
import Firebase from 'firebase';
import {globalStyles} from '../config/Styles';
import {Post} from '../config/Variables';

//global variable enables interaction with onPress
let userKey = '';

export default class FavouritesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //set value of favList as empty array
      favList: [],
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
        )}
      </View>
    );
  }
}
