import React, {Component} from 'react';
import {
  ActivityIndicator,
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
// import {CustomTextInput} from '../config/CustomForm';
import ResetPassword from '../database/ForgotPassword';

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
                  <CustomTextInput
                    label="Email"
                    formikProps={formikProps}
                    formikKey="email"
                    placeholder="Please enter your email"
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
