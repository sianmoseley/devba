import React, {useState, Component} from 'react';
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

reauthenticate = (password) => {
  const user = Firebase.auth().currentUser;
  const cred = Firebase.auth.EmailAuthProvider.credential(user.email, password);
  return user.reauthenticateWithCredential(cred);
}

DeleteUser = (values) => {
  reauthenticate(values.password).then(() => {
    const user = Firebase.auth().currentUser;
    user.delete().then(() => {
      console.log("Account deleted");
      Alert.alert("Account deleted");
    }).catch((error) => {
      Alert.alert(error.message);
      })
    }).catch((error) => {
      Alert.alert(error.message)
    });
}



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
    )
  }
}
