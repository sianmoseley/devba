import React, {Component} from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import SubmitLogin from '../database/Login';
import {authenticationStyles, globalStyles} from '../config/Styles';
import {AuthInput} from '../config/Variables';

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

export default class Login extends Component {
  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <TouchableWithoutFeedback
          touchSoundDisabled={true}
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <View style={authenticationStyles.authContainer}>
            <View style={globalStyles.logoLoginContainer}>
              <Image
                style={{width: 275, height: 238, marginTop: 80}}
                source={require('../images/bigapp.png')}
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
                    <AuthInput
                      formikProps={formikProps}
                      formikKey="email"
                      label="Email:"
                      placeholder="Email"
                    />
                    <AuthInput
                      formikProps={formikProps}
                      formikKey="password"
                      label="Password:"
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
                          <Text style={authenticationStyles.authText}>
                            LOGIN
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    {/* <Text style={authenticationStyles.authError}>
                      {formikProps.errors.general}
                    </Text> */}
                    <TouchableOpacity
                      style={authenticationStyles.newUserButton}
                      onPress={() =>
                        this.props.navigation.navigate('Register')
                      }>
                      <Text style={authenticationStyles.authText}>
                        NEW USER?
                      </Text>
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
      </ScrollView>
    );
  }
}
