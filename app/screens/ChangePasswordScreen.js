import React, {Component} from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
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

// reauthenticate = currentPassword => {
//   const user = Firebase.auth().currentUser;
//   const cred = Firebase.auth.EmailAuthProvider.credential(
//     user.email,
//     currentPassword,
//   );
//   return user.reauthenticateWithCredential(cred);
// };

// ChangePassword = values => {
//   reauthenticate(values.currentPassword)
//     .then(() => {
//       const user = Firebase.auth().currentUser;
//       user
//         .updatePassword(values.newPassword)
//         .then(() => {
//           console.log('User password successfully changed.');
//           Alert.alert('Password was changed');
//         })
//         .catch(error => {
//           Alert.alert(error.message);
//         });
//     })
//     .catch(error => {
//       Alert.alert(error.message);
//     });
// };

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
