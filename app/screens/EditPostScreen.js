import React, {useState} from 'react';
import {Picker} from '@react-native-community/picker';
import {
  Alert,
  Image,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import Firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';
import {globalStyles} from '../config/Styles';
import RNFetchBlob from 'react-native-fetch-blob';

//client-side validation with yup
const editPostSchema = yup.object().shape({
  heading: yup
    .string()
    .label('Heading')
    .required('This is a required field.')
    .min(5, 'Field must contain a valid description')
    .max(50, "Don't be daft"),
  description: yup
    .string()
    .label('Description')
    .required('This is a required field.')
    .min(5, 'Field must contain a valid description')
    .max(50, "Don't be daft"),
});

export default function EditPostScreen({navigation, route}) {
  //obtain id of post from last screen
  const post = route.params;
  const postKey = post.id;

  //obtain URL path reference in database for the chosen post
  const ref = Firebase.database().ref('posts/' + postKey);

  //set field values to the existing values obtained through nav props
  const [Heading, setHeading] = useState(post.heading);
  const [Description, setDescription] = useState(post.description);
  const [Location, setLocation] = useState(post.location);
  const [Uri, setUri] = useState(post.uri);
  const [Filename, setFilename] = useState(post.filename);
  const [Url, setUrl] = useState(post.url);

  //reference of current user posts
  const userKey = Firebase.auth().currentUser.uid;

  //function to allow user to take a photo or select existing image
  const selectImage = () => {
    const options = {
      noData: true,
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.uri;
        setUri(source);
        const fileName = response.fileName;
        setFilename(fileName);
      }
    });
  };

  // Prepare Blob support
  const Blob = RNFetchBlob.polyfill.Blob
  const fs = RNFetchBlob.fs
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
  window.Blob = Blob

// Function to upload image to Firebase storage and post details to Firebase realtime database
function editPost(Heading, Description, Location, Uri, Filename, userKey, mime = 'image/jpeg') {
  return new Promise((resolve, reject) => {
    const uploadUri = Uri
    let uploadBlob = null

    const imageRef = Firebase.storage().ref('images/' + userKey).child(Filename)

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then(function(downloadURL){
        console.log('File available at', downloadURL);
        const url = downloadURL;

        updatePost({
          heading: Heading,
          description: Description,
          location: Location,
          uri: Uri,
          filename: Filename,
          userkey: userKey,
          url: url
        });

      })
      .then((url) => {
        resolve(url);
      })
      .catch((error) => {
        reject(error)
    })
  })
}

  //updates specified fields in specified path in database
  function updatePost(values) {
    ref
      .update({
        heading: values.heading,
        description: values.description,
        location: values.location,
        uri: Uri,
        filename: Filename,
        userkey: userKey, 
        url: values.url
      })
      .then(() => {
        //simultaneously updates same fields in user_posts table
        Firebase.database()
          .ref('user_posts/' + userKey + '/' + postKey)
          .update({
            heading: values.heading,
            description: values.description,
            location: values.location,
            uri: Uri,
            filename: Filename,
            userkey: userKey, 
            url: values.url
          });
      });
  }

  //removes post from database and firebase storage location
  function DeletePost() {
    ref.remove().then(() => {
      Firebase.database()
        .ref('user_posts/' + userKey + '/' + postKey)
        .remove();
    });

    const imageRef = Firebase.storage().ref('images/' + userKey).child(Filename);
    imageRef.delete().then(function(){
      console.log('Image deleted from firebase storage')
    })
    .catch(function(error) {
      console.log("Remove failed: " + error.message)
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
            editPost(Heading, Description, Location, Uri, Filename, userKey);
            Alert.alert('Your post has been updated', 'Thank you!', [
          {
            text: 'OK',
            //navigation back to the view post screen
            onPress: () => navigation.navigate('ViewPosts'),
          },
        ]);
          }}
          // validationSchema={editPostSchema}
        >
          {formikProps => (
            <React.Fragment>
              <View style={globalStyles.formField}>
                <TouchableOpacity
                  style={globalStyles.inAppDeleteButton}
                  title={'delete'}
                  onPress={() => {
                    //alert is displayed to warn user
                    Alert.alert(
                      'Delete',
                      'Are you sure you want to delete this post? This action cannot be undone.',
                      [
                        {
                          text: 'Yes, delete this post.',
                          onPress: () => DeletePost(navigation.goBack()),
                        },
                        {
                          text: 'Cancel',
                          onPress: () =>
                            console.log('DELETE CANCELLED:', Date(Date.now())),
                        },
                      ],
                    );
                  }}>
                  <Text style={globalStyles.inAppTouchText}>DELETE POST</Text>
                </TouchableOpacity>
                <TextInput
                  style={globalStyles.inputBox}
                  placeholder={'Give your post a title'}
                  style={globalStyles.formPlaceholder}
                  onChangeText={text => setHeading(text)}
                  value={Heading}
                />
                <TextInput
                  style={globalStyles.inputBox}
                  placeholder={'Tell us about your leftovers...'}
                  style={globalStyles.formPlaceholder}
                  onChangeText={text => setDescription(text)}
                  value={Description}
                />
                <Text style={globalStyles.aboutText}>
                  {/* displays static existing value for location from nav props */}
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
                  <Picker.Item label="Howard/Surrey" value="Howard_Surrey" />
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
                    value="SIA"
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
                
                <Image 
                  style={{width: '100%', height: 300}} 
                  source={{uri: Uri}} />

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
