import React, {Component} from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {globalStyles} from '../config/Styles';
import {CustomTextInput} from '../config/CustomForm';
import {Formik} from 'formik';
import * as yup from 'yup';
import DeleteUser from '../database/DeleteAccount';

//client-side validation with yup
const deleteAccountSchema = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: yup
    .string()
    .label('Password')
    .required('Please enter your current password'),
});

export default class ChangePasswordScreen extends Component {
  render() {
    return (
      <TouchableWithoutFeedback
        touchSoundDisabled={true}
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View>
          <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={(values, actions) => {
              console.log(values);
              DeleteUser(values);
              setTimeout(() => {
                actions.setSubmitting(false);
              }, 1000);
              Keyboard.dismiss();
              Alert.alert('You deleted your account.', ':(', [
                {
                  text: 'OK',
                },
              ]);
            }}
            validationSchema={deleteAccountSchema}>
            {formikProps => (
              <React.Fragment>
                <View style={globalStyles.formField}>
                  <CustomTextInput
                    label="Please enter your email:"
                    formikProps={formikProps}
                    formikKey="email"
                    placeholder="Please enter your email"
                  />
                  <CustomTextInput
                    label="Please enter your password:"
                    formikProps={formikProps}
                    formikKey="password"
                    placeholder="Please enter your password"
                    secureTextEntry
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
                            Delete My Account
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
}
