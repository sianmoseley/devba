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
import {CustomTextInput} from '../config/Variables';
import {Formik} from 'formik';
import * as yup from 'yup';
import ChangePassword from '../database/ChangePassword';

//client-side validation with yup
const changePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .label('Password')
    .required('Please enter your current password'),
  newPassword: yup
    .string()
    .label('New Password')
    .required('New password must be 8 - 20 characters')
    .min(8)
    .max(20),
  confirmPassword: yup
    .string()
    .required('Passwords must match')
    .label('Confirm password')
    .test('passwords-match', 'Passwords must match', function(value) {
      return this.parent.newPassword === value;
    }),
});

export default class ChangePasswordScreen extends Component {
  render() {
    return (
      <TouchableWithoutFeedback
        touchSoundDisabled={true}
        onPress={() => {
          Keyboard.dismiss();
        }}>
        {/* flex forces content to fit to size of screen */}
        <View style={{flex: 1}}>
          <Formik
            initialValues={{
              currentPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            onSubmit={(values, actions) => {
              console.log(values);
              ChangePassword(values);
              setTimeout(() => {
                actions.setSubmitting(false);
              }, 1000);
              Keyboard.dismiss();
              Alert.alert(
                'Your password was changed successfully.',
                'Thank you!',
                [
                  {
                    text: 'OK',
                    onPress: () => this.props.navigation.navigate('HomeScreen'),
                  },
                ],
              );
            }}
            validationSchema={changePasswordSchema}>
            {formikProps => (
              <React.Fragment>
                <View style={globalStyles.formField}>
                  <CustomTextInput
                    label="Current Password:"
                    formikProps={formikProps}
                    formikKey="currentPassword"
                    placeholder="Please enter your current password"
                    secureTextEntry
                  />
                  <CustomTextInput
                    label="New Password:"
                    formikProps={formikProps}
                    formikKey="newPassword"
                    placeholder="Please enter a new password"
                    secureTextEntry
                  />
                  <CustomTextInput
                    label="Confirm Password:"
                    formikProps={formikProps}
                    formikKey="confirmPassword"
                    placeholder="Please confirm your new password"
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
                            Change Password
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
