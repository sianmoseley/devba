import React, {Component} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {authenticationStyles, globalStyles} from '../config/Styles';
import Firebase from 'firebase';

const FieldWrapper = ({children, label, formikProps, formikKey}) => (
  <View>
    <Text style={authenticationStyles.authLabel}>{label}</Text>
    {children}
    <Text style={globalStyles.error}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);
const CustomTextInput = ({label, formikProps, formikKey, ...rest}) => {
  const inputStyles = {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginBottom: 2,
    color: 'black',
    paddingHorizontal: 10,
  };
  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputStyles.borderColor = 'red';
  }
  return (
    <FieldWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
      <TextInput
        style={inputStyles}
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

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .label('Username')
    .required('Username required'),
  email: yup
    .string()
    .label('Email')
    .email('Please provide a valid email')
    .required(),
  password: yup
    .string()
    .label('Password')
    .required('Password must be 8 - 20 characters')
    .min(8)
    .max(20),
  confirmPassword: yup
    .string()
    .required()
    .label('Confirm password')
    .test('passwords-match', 'Passwords must match', function(value) {
      return this.parent.password === value;
    }),
  agreeToTerms: yup
    .boolean()
    .label('Terms')
    .test(
      'is-true',
      'Must agree to terms to continue',
      value => value === true,
    ),
});

function SubmitRegister(values) {
  Firebase.auth()
    .createUserWithEmailAndPassword(values.email, values.password)
    .then(res => {
      Firebase.database()
        .ref('users/' + res.user.uid)
        .set({
          uid: res.user.uid,
          username: values.username,
          email: values.email,
        })
        .then(
          Firebase.auth().onAuthStateChanged(user => {
            if (user) {
              user.updateProfile({displayName: values.username});
            }
          }),
        );
    })
    .catch(function(error) {
      //handle errors here
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is not secure enough.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  console.log('USER REGISTERED SUCCESSFULLY', Date(Date.now()), values);
}

export default class Register extends Component {
  render() {
    return (
      <TouchableWithoutFeedback
        touchSoundDisabled={true}
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={authenticationStyles.authContainer}>
          <View>
            <Formik
              initialValues={{
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                agreeToTerms: false,
              }}
              onSubmit={(values, actions) => {
                console.log(values);
                Keyboard.dismiss();
                setTimeout(() => {
                  actions.setSubmitting(false);
                }, 1000);
                SubmitRegister(values, this.props.navigation);
              }}
              validationSchema={registerSchema}>
              {formikProps => (
                <React.Fragment>
                  <View>
                    <CustomTextInput
                      label="Username"
                      formikProps={formikProps}
                      formikKey="username"
                      placeholder="Please enter a username"
                    />
                    <CustomTextInput
                      label="Email"
                      formikProps={formikProps}
                      formikKey="email"
                      placeholder="Please enter your email"
                    />
                    <CustomTextInput
                      label="Password"
                      formikProps={formikProps}
                      formikKey="password"
                      placeholder="Please enter a password"
                      secureTextEntry
                    />
                    <CustomTextInput
                      label="Confirm Password"
                      formikProps={formikProps}
                      formikKey="confirmPassword"
                      placeholder="Please confirm password"
                      secureTextEntry
                    />
                    <CustomSwitch
                      label="Agree to Terms"
                      formikKey="agreeToTerms"
                      formikProps={formikProps}
                    />
                    {formikProps.isSubmitting ? (
                      <ActivityIndicator size="large" color="white" />
                    ) : (
                      <View>
                        <TouchableOpacity
                          style={authenticationStyles.newUserButton}
                          onPress={formikProps.handleSubmit}>
                          <Text style={authenticationStyles.authText}>
                            Register your account!
                          </Text>
                        </TouchableOpacity>
                        <Text style={authenticationStyles.authError}>
                          {formikProps.errors.general}
                        </Text>
                      </View>
                    )}
                  </View>
                </React.Fragment>
              )}
            </Formik>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
