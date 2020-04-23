import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Picker,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {globalStyles} from '../config/Styles';
import Firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';

const FieldWrapper = ({children, label, formikProps, formikKey}) => (
  <View>
    <Text style={globalStyles.formLabel}>{label}</Text>
    {children}
    <Text style={globalStyles.error}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);
const CustomTextInput = ({label, formikProps, formikKey, ...rest}) => {
  return (
    <FieldWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
      <TextInput
        style={globalStyles.inputBox}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
    </FieldWrapper>
  );
};

//client-side validation with yup
const addPostSchema = yup.object().shape({
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

//global variable for username declared outside function so accessible anywhere in this file
let Username = '';

export default function AddPostScreen({navigation}) {
  //AuthNavigator recognises if a user is logged in and remembers the account

  //reads unique user id from firebase authentication and places in userKey const
  const userKey = Firebase.auth().currentUser.uid;

  //uuid used to identify path of user info in database
  Firebase.database()
    .ref('users/' + userKey)
    .on('value', snapshot => {
      //set of data in path read as an object
      const user = snapshot.val();
      //extract specific value of username
      Username = user.username;
      console.log('Username:', Username, 'Retrieved:', Date(Date.now()));
    });

  ///////////////// IMAGE PICKER CODE - SIAN

  const [Uri, setUri] = useState('');

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

  //// FUNCTION TO DISPLAY USER SELECTED IMAGE

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

  /////////// END OF IMAGE PICKER CODE

  async function AddPost(values, addComplete) {
    //creates unique idenfitier (string of random number, letters and symbols) to be used for new post
    const key = Firebase.database()
      .ref('posts')
      .push().key;

    //reads today's date in default Javascript
    const d = new Date();

    //path in realtime-database established
    try {
      await Firebase.database()
        .ref('posts/' + key)
        //values for each field declared
        .set({
          id: key,
          heading: values.heading,
          description: values.description,
          location: values.location,
          //date generated in neater format
          createdAt:
            [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/') +
            ' ' +
            [d.getHours(), d.getMinutes()].join('.'),
          createdBy: Username,
          uri: Uri,
        })
        .then(console.log('POST ADDED SUCCESSFULLY', Date(Date.now())));

      //same values for post are added to the user_posts table, so every post a user makes is tracked
      Firebase.database()
        .ref('user_posts/' + userKey + '/' + key)
        .set({
          id: key,
          heading: values.heading,
          description: values.description,
          location: values.location,
          createdAt:
            [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/') +
            ' ' +
            [d.getHours(), d.getMinutes()].join('.'),
          createdBy: Username,
          uri: Uri,
        });

      //don't necessarily need this now promise for set has been fulfilled
      const snapshot = undefined;
      values.Id = snapshot.Id;
      snapshot.set(values);
      return addComplete(values);
    } catch (error) {
      return console.log(error);
    }
  }

  //state set for 'location' picker
  const [selectedValue, setSelectedValue] = useState('Harmer');

  //component displays Formik form designed to handle user inputs
  return (
    <TouchableWithoutFeedback
      touchSoundDisabled={true}
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <ScrollView>
        <Formik
          initialValues={{heading: '', description: ''}}
          onSubmit={(values, actions) => {
            //all the following is carried out when the Submit button is pressed
            //alert pops up to advise their post has been accepted and posted
            Alert.alert('Your leftovers are now up for grabs.', 'Thank you!', [
              {
                text: 'OK',
                onPress: () => navigation.navigate('HomeScreen'),
                //navigation back to the home page
              },
            ]);
            console.log({selectedValue, values});
            Keyboard.dismiss();
            setTimeout(() => {
              actions.setSubmitting(false);
            }, 2000);
            //AddPost function from above called
            AddPost({
              heading: values.heading,
              description: values.description,
              location: selectedValue,
              uri: Uri,
            });
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
                <View style={globalStyles.submitButtonContainer}>
                  {formikProps.isSubmitting ? (
                    <ActivityIndicator size="large" color="#2bb76e" />
                  ) : (
                    <View>
                      <TouchableOpacity
                        style={globalStyles.inAppButton}
                        onPress={selectImage}>
                        <Text style={globalStyles.inAppTouchText}>
                          Select Photo
                        </Text>
                      </TouchableOpacity>
                      {renderSelectedImage()}
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
                  )}
                </View>
              </View>
            </React.Fragment>
          )}
        </Formik>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
