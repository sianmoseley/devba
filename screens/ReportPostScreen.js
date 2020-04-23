import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Picker,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {globalStyles} from '../config/Styles';
import {Formik} from 'formik';
import * as yup from 'yup';
import Firebase from 'firebase';

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
  reportDescription: yup
    .string()
    .label('Description')
    .required('This is a required field.')
    .min(5, 'Field must contain a valid description')
    .max(50, "Don't be daft"),
  agreeToTerms: yup
    .boolean()
    .label('Terms')
    .test('is-true', 'Terms must be agreed upon.', value => value === true),
});

//so username is global
let Username = '';

export default function ReportPostScreen({navigation, route}) {
  const userKey = Firebase.auth().currentUser.uid;
  Firebase.database()
    .ref('users/' + userKey)
    .on('value', snapshot => {
      const user = snapshot.val();
      Username = user.username;
      console.log('Username:', Username, 'Retrieved:', Date(Date.now()));
    });
  async function SubmitPost(values, submitComplete) {
    const key = Firebase.database()
      .ref('postReports')
      .push().key;
    try {
      await Firebase.database()
        .ref('postReports/' + key)
        .set({
          postId: values.postId,
          reportDescription: values.reportDescription,
          reportId: key,
          reportTimeStamp: Date(Date.now()),
          reportType: values.reportType,
          submittedBy: Username,
        })
        .then(console.log('POST REPORTED SUCCESSFULLY', Date(Date.now())));
      const snapshot = undefined;
      values.Id = snapshot.Id;
      snapshot.set(values);
      return submitComplete(values);
    } catch (error) {
      return console.log(error);
    }
  }

  const {id} = route.params;
  const [selectedValue, setSelectedValue] = useState('spam');
  return (
    <TouchableWithoutFeedback
      touchSoundDisabled={true}
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View>
        <Formik
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
            SubmitPost({
              postId: id,
              reportDescription: values.reportDescription,
              reportType: selectedValue,
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
