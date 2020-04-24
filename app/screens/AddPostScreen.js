import React, {useState} from 'react';
import {Picker} from '@react-native-community/picker';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {globalStyles} from '../config/Styles';
import {CustomTextInput} from '../config/CustomForm';
import AddPost from '../database/AddPost';
import Firebase from 'firebase';

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

//AuthNavigator recognises if a user is logged in and remembers the account
export default function AddPostScreen({navigation}) {
  //uid used to identify path of user info in database
  const userKey = Firebase.auth().currentUser.uid;
  Firebase.database()
    .ref('users/' + userKey)
    .on('value', snapshot => {
      //set of data in path read as an object
      const user = snapshot.val();
      //extract specific value of username
      const Username = user.username;
      console.log('Username:', Username, 'Retrieved:', Date(Date.now()));
    });

  //track state for location picker
  const [selectedValue, setSelectedValue] = useState('Adsetts');
  return (
    <TouchableWithoutFeedback
      touchSoundDisabled={true}
      //dismisses keyboard when pressing on screen
      onPress={() => {
        Keyboard.dismiss();
      }}>
      {/* flex forces content to fit to size of screen */}
      <View style={{flex: 1}}>
        <Formik
          initialValues={{heading: '', description: ''}}
          onSubmit={(values, actions) => {
            //code executes when the Submit button is pressed
            //alert confrims to user their post has been accepted and posted
            Alert.alert('Your leftovers are now up for grabs.', 'Thank you!', [
              {
                text: 'OK',
                onPress: () => navigation.navigate('HomeScreen'),
              },
            ]);
            console.log({selectedValue, values});
            Keyboard.dismiss();
            setTimeout(() => {
              actions.setSubmitting(false);
            }, 2000);
            //AddPost function called
            AddPost({
              heading: values.heading,
              description: values.description,
              location: selectedValue,
            });
          }}
          validationSchema={addPostSchema}>
          {formikProps => (
            <React.Fragment>
              <View style={globalStyles.formField}>
                {/* custom inputs */}
                <CustomTextInput
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
                {/* renders activity indicator when button is pressed */}
                <View style={globalStyles.submitButtonContainer}>
                  {formikProps.isSubmitting ? (
                    <ActivityIndicator size="large" color="#2bb76e" />
                  ) : (
                    <View>
                      <TouchableOpacity
                        style={globalStyles.inAppButton}
                        //handles from submission
                        onPress={formikProps.handleSubmit}>
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
      </View>
    </TouchableWithoutFeedback>
  );
}
