import React, {Component} from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
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

const FieldWrapper = ({children, formikProps, formikKey}) => (
  <View>
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

//client-side validation via yup
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .email()
    .required('Please provide your email.'),
  password: yup
    .string()
    .label('Password')
    .required('Please enter your password.'),
});

//firebase function to authenticate user gets called onSubmit
SubmitLogin = values => {
  Firebase.auth()
    .signInWithEmailAndPassword(values.email, values.password)
    .catch(function(error) {
      //handle errors here
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Incorrect password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  console.log('USER LOGGED IN SUCCESSFULLY', Date(Date.now()));
};

export default class Login extends Component {
  render() {
    return (
      <TouchableWithoutFeedback
        touchSoundDisabled={true}
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={authenticationStyles.authContainer}>
          <View style={globalStyles.logoContainer}>
            <Image
              style={globalStyles.logo}
              source={require('../images/burger.png')}
            />
            <Text style={globalStyles.logoTag}>An app for leftovers.</Text>
          </View>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              console.log(values);
              Keyboard.dismiss();
              setTimeout(() => {
                actions.setSubmitting(false);
              }, 1000);
              SubmitLogin(values, this.props.navigation);
            }}>
            {formikProps => (
              <React.Fragment>
                <View>
                  <CustomTextInput
                    formikProps={formikProps}
                    formikKey="email"
                    placeholder="Email"
                  />
                  <CustomTextInput
                    formikProps={formikProps}
                    formikKey="password"
                    placeholder="Password"
                    secureTextEntry
                  />
                  {formikProps.isSubmitting ? (
                    <ActivityIndicator size="large" color="white" />
                  ) : (
                    <View>
                      <TouchableOpacity
                        style={authenticationStyles.loginButton}
                        onPress={formikProps.handleSubmit}>
                        <Text style={authenticationStyles.authText}>LOGIN</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  <Text style={authenticationStyles.authError}>
                    {formikProps.errors.general}
                  </Text>
                  <TouchableOpacity
                    style={authenticationStyles.newUserButton}
                    onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={authenticationStyles.authText}>NEW USER?</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={authenticationStyles.forgotPassword}
                    onPress={() =>
                      this.props.navigation.navigate('ForgotPassword')
                    }>
                    <Text style={authenticationStyles.authText}>
                      Forgot password?
                    </Text>
                  </TouchableOpacity>
                </View>
              </React.Fragment>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
