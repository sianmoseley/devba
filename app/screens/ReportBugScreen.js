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
import ReportBug from '../database/ReportBug';
import Firebase from 'firebase';
import {globalStyles} from '../config/Styles';
import {CustomTextInput, CustomSwitch} from '../config/Variables';

//client-side validation with yup
const reportSchema = yup.object().shape({
  bugDescription: yup
    .string()
    .label('Description')
    .required('This is a required field.')
    .min(5, 'Field must contain a valid description')
    .max(50, "Don't be daft"),
  agreeToTerms: yup
    .boolean()
    .label('Terms')
    .test('is-true', 'Terms must be agreed upon', value => value === true),
});

export default function ReportBugScreen({navigation}) {
  //current user ID
  const userKey = Firebase.auth().currentUser.uid;

  //remove later, just for logging
  Firebase.database()
    .ref('users/' + userKey)
    .on('value', snapshot => {
      const user = snapshot.val();
      const Username = user.username;
      console.log('Username:', Username, 'Retrieved:', Date(Date.now()));
    });

  //set state for form picker
  const [selectedValue, setSelectedValue] = useState('crash');
  return (
    //dimiss keyboard when user clicks elsewhere
    <TouchableWithoutFeedback
      touchSoundDisabled={true}
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View>
        <Formik
          //sets initial values for form
          initialValues={{bugDescription: '', agreeToTerms: false}}
          onSubmit={(values, actions) => {
            Alert.alert('The bug has been logged for review.', 'Thank you.', [
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
            ReportBug({
              bugDescription: values.bugDescription,
              bugType: selectedValue,
            });
          }}
          //runs yup validation
          validationSchema={reportSchema}>
          {formikProps => (
            <React.Fragment>
              <View style={globalStyles.formField}>
                <Text style={globalStyles.formLabel}>Report type:</Text>
                <Picker
                  style={globalStyles.formPicker}
                  mode="dialog"
                  prompt="Select an option"
                  //interacts with state set prior
                  selectedValue={selectedValue}
                  onValueChange={(itemValue, itemPosition) =>
                    setSelectedValue(itemValue)
                  }>
                  <Picker.Item label="App crashes" value="crash" />
                  <Picker.Item
                    label="Button does not work"
                    value="button-broken"
                  />
                  <Picker.Item
                    label="Notifications do not work"
                    value="notifications-broken"
                  />
                  <Picker.Item
                    label="Visuals do not work"
                    value="visuals-broken"
                  />
                  <Picker.Item label="Other" value="other" />
                </Picker>
                {/* custom fields */}
                <CustomTextInput
                  label="Description of the bug:"
                  formikProps={formikProps}
                  formikKey="bugDescription"
                  placeholder="App crashes when trying to list post..."
                  style={globalStyles.formPlaceholder}
                  multiline
                />
                <CustomSwitch
                  label="You understand that submitting this report does not violate the Terms & Conditions?"
                  formikKey="agreeToTerms"
                  formikProps={formikProps}
                />
                <View style={globalStyles.submitButtonContainer}>
                  {formikProps.isSubmitting ? (
                    <ActivityIndicator size="large" color="#28A966" />
                  ) : (
                    <View>
                      <TouchableOpacity
                        style={globalStyles.inAppButton}
                        onPress={formikProps.handleSubmit}>
                        <Text style={globalStyles.inAppTouchText}>
                          Submit Report
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
