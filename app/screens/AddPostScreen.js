import React, {useState} from 'react';
import {Picker} from '@react-native-community/picker';
import {
  Alert,
  Image,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import AddPost from '../database/AddPost';
import Firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';
import {globalStyles} from '../style/Styles';
import {CustomTextInput} from '../custom/Variables';
import RNFetchBlob from 'react-native-fetch-blob';

//client-side validation with yup
const addPostSchema = yup.object().shape({
  heading: yup
    .string()
    .label('Heading')
    .required('This is a required field.')
    .min(5, 'Field must contain a valid description.')
    .max(30, 'Heading too long.'),
  description: yup
    .string()
    .label('Description')
    .required('This is a required field.')
    .min(5, 'Field must contain a valid description.')
    .max(100, 'Description too long.'),
});

//AuthNavigator recognises if a user is logged in and remembers the account
export default function AddPostScreen({navigation}) {
  const userKey = Firebase.auth().currentUser.uid;

  const [Uri, setUri] = useState(
    'https://avatars0.githubusercontent.com/u/12028011?v=3&s=200',
  );
  const [Filename, setFilename] = useState('');

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
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;

  // Function to upload image to Firebase storage and post details to Firebase realtime database
  function uploadImage(values, Uri, Filename, userKey, mime = 'image/jpeg') {
    return new Promise((resolve, reject) => {
      const uploadUri = Uri;
      let uploadBlob = null;

      const imageRef = Firebase.storage()
        .ref('images/' + userKey)
        .child(Filename);

      fs.readFile(uploadUri, 'base64')
        .then(data => {
          return Blob.build(data, {type: `${mime};BASE64`});
        })
        .then(blob => {
          uploadBlob = blob;
          return imageRef.put(blob, {contentType: mime});
        })
        .then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        })
        .then(function(downloadURL) {
          console.log('File available at', downloadURL);
          const url = downloadURL;

          AddPost({
            heading: values.heading,
            description: values.description,
            location: selectedValue,
            uri: Uri,
            filename: Filename,
            userkey: userKey,
            url: url,
          });
        })
        .then(url => {
          resolve(url);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  //state set for 'location' picker
  const [selectedValue, setSelectedValue] = useState('Adsetts');

  //component displays Formik form designed to handle user inputs
  return (
    <TouchableWithoutFeedback
      touchSoundDisabled={true}
      //dismisses keyboard when pressing on screen
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <ScrollView style={{flex: 1}}>
        <Formik
          initialValues={{heading: '', description: ''}}
          onSubmit={(values, actions) => {
            //code executes when the Submit button is pressed, if the user has included an image
            //alert confirms to user their post has been accepted and posted
            if (Filename) {
              console.log({selectedValue, values});
              Keyboard.dismiss();
              setTimeout(() => {
                actions.setSubmitting(false);
              }, 2000);
              console.log(Filename);
              uploadImage(values, Uri, Filename, userKey);
              Alert.alert(
                'Your leftovers are now up for grabs.',
                'Thank you!',
                [
                  {
                    text: 'OK',
                    onPress: () => navigation.navigate('HomeScreen'),
                  },
                ],
              );
            } else {
              Alert.alert(
                'Image required',
                'You must include an image with your post',
                [
                  {
                    text: 'OK',
                  },
                ],
              );
            }
          }}
          validationSchema={addPostSchema}>
          {formikProps => (
            <React.Fragment>
              <View style={globalStyles.formField}>
                <CustomTextInput
                  //textboxes for each field
                  label="Heading:"
                  formikProps={formikProps}
                  formikKey="heading"
                  placeholder="Give your post a title..."
                />
                <CustomTextInput
                  label="Description:"
                  formikProps={formikProps}
                  formikKey="description"
                  placeholder="Tell us about your leftovers..."
                  multiline
                />
                <Text style={globalStyles.formLabel}>Select Location:</Text>
                <Picker
                  //dropdown menu of set locations (all Sheffield Hallam University buildings)
                  style={globalStyles.formPicker}
                  mode="dialog"
                  prompt="Where can we find your food?"
                  selectedValue={selectedValue}
                  onValueChange={(itemValue, itemPosition) =>
                    setSelectedValue(itemValue)
                  }>
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
                <View>
                  <TouchableOpacity
                    style={globalStyles.inAppButton}
                    onPress={selectImage}>
                    <Text style={globalStyles.inAppTouchText}>
                      Add your image
                    </Text>
                  </TouchableOpacity>
                  <Image
                    style={{width: '100%', height: 300}}
                    source={{uri: Uri}}
                  />
                  <TouchableOpacity
                    style={globalStyles.inAppButton}
                    onPress={
                      formikProps.handleSubmit
                      //this component identified as the submit button through the props.handleSubmit function
                    }>
                    <Text style={globalStyles.inAppTouchText}>
                      Post your leftovers!
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </React.Fragment>
          )}
        </Formik>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
