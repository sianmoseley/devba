import React, {useState} from 'react';
import {
  StyleSheet,
  Picker,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import Firebase from 'firebase';
import 'firebase/database';
import ImagePicker from 'react-native-image-picker';

export default function EditPostScreen({route}) {
  const post = route.params;
  const postKey = post.id;
  const ref = Firebase.database().ref('posts/' + postKey);
  const [Heading, setHeading] = useState(post.heading);
  const [Description, setDescription] = useState(post.description);
  const [Location, setLocation] = useState(post.location);
  const userKey = Firebase.auth().currentUser.uid;
  const [Uri, setUri] = useState(post.uri);

  //function to get image details from device gallery
  const selectImage = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.uri;
        console.log(source);
        setUri(source);
      }
    });
  };

  //function to display selected image
  function renderSelectedImage() {
    if (Uri === '') {
      return (
        <Image
          source={require('../images/gallery.png')}
          style={{width: '100%', height: 300}}
        />
      );
    } else {
      return <Image style={{width: '100%', height: 300}} source={{uri: Uri}} />;
    }
  }

  function updatePost(values) {
    ref
      .update({
        heading: values.heading,
        description: values.description,
        location: values.location,
        uri: Uri,
      })
      .then(() => {
        Firebase.database()
          .ref('user_posts/' + userKey + '/' + postKey)
          .update({
            heading: values.heading,
            description: values.description,
            location: values.location,
            uri: Uri,
          });
      });
  }

  function deletePost(values) {
    ref.remove().then(() => {
      Firebase.database()
        .ref('user_posts/' + userKey + '/' + postKey)
        .remove();
    });
  }

  return (
    <ScrollView style={formikstyles.container}>
      <Formik
        initialValues={{
          heading: post.heading,
          description: post.description,
          location: post.location,
        }}
        mapPropsToValues={() => ({
          heading: Heading,
          description: Description,
          location: Location,
        })}
        enableReinitialize={true}
        onSubmit={values => {
          console.log(values);
          updatePost({
            heading: Heading,
            description: Description,
            location: Location,
            uri: Uri,
          });
        }}>
        {props => (
          <View>
            <TouchableOpacity
              style={formikstyles.button}
              title={'delete'}
              onPress={() => {
                Alert.alert(
                  'Delete',
                  'Are you sure you want to delete this post? This action cannot be undone.',
                  [
                    {text: 'Yes', onPress: () => deletePost()},
                    {
                      text: 'Cancel',
                      onPress: () => console.log('delete post cancelled'),
                    },
                  ],
                );
              }}>
              <Text style={formikstyles.btnText}>Delete this post</Text>
            </TouchableOpacity>
            <TextInput
              style={formikstyles.txtInput}
              placeholder={'Give your post a title'}
              onChangeText={text => setHeading(text)}
              value={Heading}
            />
            <TextInput
              style={formikstyles.txtInput}
              placeholder={'Tell us about your leftovers...'}
              onChangeText={text => setDescription(text)}
              value={Description}
            />
            <Text style={{fontSize: 25}}>
              Is your food still at {post.location} ?
            </Text>
            <Picker
              style={{fontSize: 25}}
              mode="dialog"
              prompt="Change The Location"
              selectedValue={Location}
              onValueChange={itemValue => setLocation(itemValue)}>
              <Picker.Item label="Harmer" value="Harmer" />
              <Picker.Item label="Eric Mensforth" value="Eric Mensforth" />
              <Picker.Item label="Sheaf" value="Sheaf" />
              <Picker.Item label="Howard/Surrey" value="Howard/Surrey" />
              <Picker.Item label="Adsetts" value="Adsetts" />
              <Picker.Item label="Stoddart" value="Stoddart" />
              <Picker.Item label="Cantor" value="Cantor" />
              <Picker.Item label="Arundel" value="Arundel" />
              <Picker.Item label="Oneleven" value="Oneleven" />
              <Picker.Item label="Charles Street" value="Charles Street" />
              <Picker.Item
                label="Sheffield Institute of Arts"
                value="Sheffield Institute of Arts"
              />
              <Picker.Item label="Collegiate Hall" value="Collegiate Hall" />
              <Picker.Item
                label="Saunders Building"
                value="Saunders Building"
              />
              <Picker.Item label="Library" value="Library" />
              <Picker.Item label="Main Building" value="Main Building" />
              <Picker.Item
                label="Robert Winston Building"
                value="Robert Winston Building"
              />
              <Picker.Item label="Woodville" value="Woodville" />
              <Picker.Item label="Heart of Campus" value="Heart of Campus" />
              <Picker.Item label="The Mews" value="The Mews" />
              <Picker.Item label="Willow Court" value="Willow Court" />
              <Picker.Item label="Chestnut Court" value="Chestnut Court" />
            </Picker>
            <TouchableOpacity
              style={formikstyles.button}
              title={'addImage'}
              onPress={selectImage}>
              <Text style={formikstyles.btnText}>Select Photo</Text>
            </TouchableOpacity>
            {renderSelectedImage()}
            <TouchableOpacity
              style={formikstyles.button}
              title={'submit'}
              onPress={props.handleSubmit}>
              <Text style={formikstyles.btnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const formikstyles = StyleSheet.create({
  txtInput: {
    margin: 5,
    padding: 30,
    fontSize: 15,
    borderWidth: 2,
    color: 'red',
    borderRadius: 5,
    backgroundColor: (255, 250, 250, 50),
  },
  button: {
    flex: 1,
    width: 150,
    height: 75,
    backgroundColor: '#418ADC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
    padding: 20,
    alignSelf: 'center',
  },
  btnText: {
    textAlign: 'center',
    color: '#565656',
    fontSize: 14,
    fontWeight: 'bold',
  },
  container: {
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: '#2bb76e',
    flex: 1,
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: 'black',
    width: 80,
    height: 150,
  },
  imageButton: {
    margin: 8,
  },
});
