import React, {Component} from 'react';
import {Picker} from '@react-native-community/picker';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import Firebase from 'firebase';
import {globalStyles} from '../config/Styles';

const Post = ({
  heading,
  description,
  location,
  createdAt,
  createdBy,
  report,
  favourite,
}) => (
  <View style={globalStyles.postContainer}>
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

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    //sets state for picker and initialzes two empty arrays
    this.state = {location: 'Adsetts', postList: [], searchedList: []};
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
          <Picker.Item label="Howard/Surrey" value="Howard/Surrey" />
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
          keyExtractor={post => post.heading}
          data={this.state.searchedList}
          renderItem={({item: post}) => (
            <Post
              key={post.heading}
              heading={post.heading}
              description={post.description}
              location={post.location}
              createdAt={post.createdAt}
              createdBy={post.createdBy}
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
