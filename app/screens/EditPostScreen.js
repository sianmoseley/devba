import React, {useState} from 'react';
import {Picker} from '@react-native-community/picker';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Formik} from 'formik';
import Firebase from 'firebase';
import 'firebase/database';
import ImagePicker from 'react-native-image-picker';
import {globalStyles} from '../config/Styles';

export default function EditPostScreen({navigation, route}) {
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
    <TouchableWithoutFeedback
      touchSoundDisabled={true}
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <ScrollView>
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
          {formikProps => (
            <React.Fragment>
              <View style={globalStyles.formField}>
                <TouchableOpacity
                  style={globalStyles.inAppButton}
                  title={'delete'}
                  onPress={() => {
                    Alert.alert(
                      'Delete',
                      'Are you sure you want to delete this post? This action cannot be undone.',
                      [
                        {
                          text: 'Yes, delete this post.',
                          onPress: () => deletePost(navigation.goBack()),
                        },
                        {
                          text: 'Cancel',
                          onPress: () => console.log('DELETE CANCELLED'),
                        },
                      ],
                    );
                  }}>
                  <Text style={globalStyles.inAppTouchText}>
                    Delete this post
                  </Text>
                </TouchableOpacity>
                <TextInput
                  style={globalStyles.inputBox}
                  placeholder={'Give your post a title'}
                  onChangeText={text => setHeading(text)}
                  value={Heading}
                />
                <TextInput
                  style={globalStyles.inputBox}
                  placeholder={'Tell us about your leftovers...'}
                  onChangeText={text => setDescription(text)}
                  value={Description}
                />
                <Text style={{fontSize: 16}}>
                  Is your food still at {post.location} ?
                </Text>
                <Picker
                  style={globalStyles.formPicker}
                  mode="dialog"
                  prompt="Change The Location"
                  selectedValue={Location}
                  onValueChange={itemValue => setLocation(itemValue)}>
                  <Picker.Item label="Adsetts" value="Adsetts" />
                  <Picker.Item label="Arundel" value="Arundel" />
                  <Picker.Item label="Cantor" value="Cantor" />
                  <Picker.Item label="Charles Street" value="Charles Street" />
                  <Picker.Item label="Chestnut Court" value="Chestnut Court" />
                  <Picker.Item
                    label="Collegiate Hall"
                    value="Collegiate Hall"
                  />
                  <Picker.Item label="Eric Mensforth" value="Eric Mensforth" />
                  <Picker.Item label="Harmer" value="Harmer" />
                  <Picker.Item
                    label="Heart of Campus"
                    value="Heart of Campus"
                  />
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
                  <Picker.Item
                    label="Saunders Building"
                    value="Saunders Building"
                  />
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
                  title={'addImage'}
                  onPress={selectImage}>
                  <Text style={globalStyles.inAppTouchText}>Select Photo</Text>
                </TouchableOpacity>

                {renderSelectedImage()}

                <TouchableOpacity
                  style={globalStyles.inAppButton}
                  title={'submit'}
                  onPress={formikProps.handleSubmit}>
                  <Text style={globalStyles.inAppTouchText}>
                    Submit changes
                  </Text>
                </TouchableOpacity>
              </View>
            </React.Fragment>
          )}
        </Formik>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
