import React, {Component} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import ResetPassword from '../database/ForgotPassword';
import {authenticationStyles} from '../config/Styles';
import {AuthInput} from '../config/Variables';
import {globalStyles} from '../config/Styles';

const passwordSchema = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
});

export default class ForgotPassword extends Component {
  render() {
    return (
      <TouchableWithoutFeedback
        touchSoundDisabled={true}
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={authenticationStyles.authContainer}>
          <Formik
            initialValues={{email: ''}}
            onSubmit={(values, actions) => {
              ResetPassword(values, this.props.navigation);
              setTimeout(() => {
                actions.setSubmitting(false);
              }, 1000);
            }}
            validationSchema={passwordSchema}>
            {formikProps => (
              <React.Fragment>
                <View>
                  <AuthInput
                    label="Email:"
                    formikProps={formikProps}
                    formikKey="email"
                    placeholder="Please enter your email"
                    style={globalStyles.formPlaceholder}
                  />
                  {formikProps.isSubmitting ? (
                    <ActivityIndicator size="large" color="white" />
                  ) : (
                    <View>
                      <TouchableOpacity
                        style={authenticationStyles.newUserButton}
                        onPress={formikProps.handleSubmit}>
                        <Text style={authenticationStyles.authText}>
                          Receive your new password
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </React.Fragment>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
