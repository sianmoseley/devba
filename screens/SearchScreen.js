import React, {Component, useState} from 'react';
import {Dropdown} from 'react-native-material-dropdown';
import {
  Button,
  FlatList,
  Picker,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import Firebase from 'firebase';
import {globalStyles} from '../config/Styles';

const Post = ({
  heading,
  description,
  location,
  createdBy,
  report,
  favourite,
}) => (
  <View style={globalStyles.postContainer}>
    {/* <TouchableOpacity> */}
    <Text style={globalStyles.postText}>
      {heading} @ {location}
      {'\n'}
      posted by {createdBy}
      {'\n'}
      {description}
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
    this.state = {location: '', postList: [], searchedList: []};
  }

  componentDidMount() {
    this.getPostData();
  }

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
    let locations = [
      {
        value: 'Harmer',
      },
      {
        value: 'Eric Mensforth',
      },
      {
        value: 'Sheaf',
      },
      {
        value: 'Howard/Surrey',
      },
      {
        value: 'Adsetts',
      },
      {
        value: 'Stoddart',
      },
      {
        value: 'Cantor',
      },
      {
        value: 'Arundel',
      },
      {
        value: 'Oneleven',
      },
      {
        value: 'Charles Street',
      },
      {
        value: 'Sheffield Institute of Arts',
      },
      {
        value: 'Owen',
      },
      {
        value: 'Norfolk',
      },
    ];

    //might have to change this to a function in order to use state
    // const [selectedValue, setSelectedValue] = useState('Harmer');

    return (
      <View style={globalStyles.formField}>
        <Picker
          style={globalStyles.formPicker}
          mode="dialog"
          prompt="Search posts by location"
          // selectedValue={selectedValue}
          // onValueChange={(itemValue, itemPosition) =>
          // setSelectedValue(itemValue)
          // }
        >
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
        <Dropdown
          label="Search posts by location"
          data={locations}
          onChangeText={location => this.setState({location})}
          value={this.state.location}
        />
        <Button
          onPress={() => this.onPressSearchHandler(this.state.location)}
          title="Search"
        />
        <FlatList
          keyExtractor={post => post.heading}
          data={this.state.searchedList}
          renderItem={({item: post}) => (
            <Post
              key={post.heading}
              heading={post.heading}
              description={post.description}
              location={post.location}
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
