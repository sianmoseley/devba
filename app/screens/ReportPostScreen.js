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
import ReportPost from '../database/ReportPost';
import {globalStyles} from '../style/Styles';
import {CustomTextInput, CustomSwitch} from '../custom/Variables';

//client-side validation with yup
const reportSchema = yup.object().shape({
  reportDescription: yup
    .string()
    .label('Description')
    .required('This is a required field.')
    .min(5, 'Field must contain a valid description.')
    .max(100, 'Description too long.'),
  agreeToTerms: yup
    .boolean()
    .label('Terms')
    .test('is-true', 'Terms must be agreed upon.', value => value === true),
});

export default function ReportPostScreen({navigation, route}) {
  //stores id of post pressed on prior screen
  const {id} = route.params;
  //set state for form picker
  const [selectedValue, setSelectedValue] = useState('spam');
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
          initialValues={{reportDescription: '', agreeToTerms: false}}
          onSubmit={(values, actions) => {
            Alert.alert(
              'The report has been logged for review.',
              'Thank you.',
              [
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
            );
            console.log({
              id,
              selectedValue,
              values,
            });
            Keyboard.dismiss();
            setTimeout(() => {
              actions.setSubmitting(false);
            }, 2000);
            ReportPost({
              postId: id,
              reportDescription: values.reportDescription,
              reportType: selectedValue,
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
                  <Picker.Item label="Spam" value="spam" />
                  <Picker.Item
                    label="Inaccurate posting"
                    value="inaccurate-posting"
                  />
                  <Picker.Item
                    label="Not appropriate"
                    value="not-appropriate"
                  />
                  <Picker.Item label="Other (offensive...)" value="other" />
                </Picker>
                <CustomTextInput
                  label="Reason(s) for reporting this post:"
                  formikProps={formikProps}
                  formikKey="reportDescription"
                  placeholder="Post has been listed multiple times..."
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
