import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Picker,
  Switch,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {globalStyles} from '../config/Styles';
import {Formik} from 'formik';
import * as yup from 'yup';
import Firebase from 'firebase';
import {userKey} from '../config/ReusableVariables';
import {FieldWrapper, CustomTextInput} from '../config/ReusableVariables';

const CustomSwitch = ({formikKey, formikProps, label, ...rest}) => (
  <FieldWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
    <Switch
      value={formikProps.values[formikKey]}
      onValueChange={value => {
        formikProps.setFieldValue(formikKey, value);
      }}
      {...rest}
    />
  </FieldWrapper>
);

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

//so username is global
let Username = '';

export default function ReportBugScreen({navigation}) {
  Firebase.database()
    .ref('users/' + userKey)
    .on('value', snapshot => {
      const user = snapshot.val();
      Username = user.username;
      console.log('Username:', Username, 'Retrieved:', Date(Date.now()));
    });
  async function SubmitBug(values, submitComplete) {
    const key = Firebase.database()
      .ref('bugReports')
      .push().key;
    try {
      await Firebase.database()
        .ref('bugReports/' + key)
        .set({
          bugDescription: values.bugDescription,
          bugId: key,
          bugType: values.bugType,
          reportTimeStamp: Date(Date.now()),
          submittedBy: Username,
        })
        .then(console.log('BUG REPORTED SUCCESSFULLY', Date(Date.now())));
      const snapshot = undefined;
      values.Id = snapshot.Id;
      snapshot.set(values);
      return submitComplete(values);
    } catch (error) {
      return console.log(error);
    }
  }

  const [selectedValue, setSelectedValue] = useState('crash');
  return (
    <TouchableWithoutFeedback
      touchSoundDisabled={true}
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View>
        <Formik
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
            SubmitBug({
              bugDescription: values.bugDescription,
              bugType: selectedValue,
            });
          }}
          validationSchema={reportSchema}>
          {formikProps => (
            <React.Fragment>
              <View style={globalStyles.formField}>
                <Text style={globalStyles.formLabel}>Report type:</Text>
                <Picker
                  style={globalStyles.formPicker}
                  mode="dialog"
                  prompt="Select an option"
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
                <CustomTextInput
                  label="Description of the bug:"
                  formikProps={formikProps}
                  formikKey="bugDescription"
                  placeholder="App crashes when trying to list post..."
                  multiline
                />
                <CustomSwitch
                  label="You understand that submitting this report does not violate the Terms & Conditions?"
                  formikKey="agreeToTerms"
                  formikProps={formikProps}
                />
                <View style={globalStyles.submitButtonContainer}>
                  {formikProps.isSubmitting ? (
                    <ActivityIndicator size="large" color="#2bb76e" />
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
