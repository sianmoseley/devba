import React from 'react';
import {
  Image,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {authenticationStyles, globalStyles} from './Styles';

//constant component for posts
export const Post = ({
  createdAt,
  createdBy,
  description,
  heading,
  location,
  onPress,
  uri,
  url
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={globalStyles.postContainer}>
      <Text style={globalStyles.postText}>
        {heading} @ {location}
        {'\n'}
        {description}
        {'\n'}
        posted by {createdBy}
        {'\n'}
        {createdAt}
      </Text>
      <Image
        style={{alignSelf: 'center', height: 150, width: 150}}
        source={{uri: url}}
      />

    </View>
  </TouchableOpacity>
);

//variables for custom text input and switches
//works with formik and yup for user authentication
const FieldWrapper = ({children, label, formikProps, formikKey}) => (
  <View>
    <Text style={globalStyles.formLabel}>{label}</Text>
    {children}
    <Text style={globalStyles.error}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);

//custom text input and switch for in app use
export const CustomTextInput = ({label, formikProps, formikKey, ...rest}) => {
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
export const CustomSwitch = ({formikKey, formikProps, label, ...rest}) => (
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

//variables for custom text input and switches on the authentication screens (login, register and forgot password)
const AuthFieldWrapper = ({children, label, formikProps, formikKey}) => (
  <View>
    <Text style={authenticationStyles.authLabel}>{label}</Text>
    {children}
    <Text style={globalStyles.error}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);

//custom text input and switch for authentication screens
export const AuthInput = ({label, formikProps, formikKey, ...rest}) => {
  return (
    <AuthFieldWrapper
      label={label}
      formikKey={formikKey}
      formikProps={formikProps}>
      <TextInput
        style={authenticationStyles.authInput}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
    </AuthFieldWrapper>
  );
};
export const AuthSwitch = ({formikKey, formikProps, label, ...rest}) => (
  <AuthFieldWrapper
    label={label}
    formikKey={formikKey}
    formikProps={formikProps}>
    <Switch
      value={formikProps.values[formikKey]}
      onValueChange={value => {
        formikProps.setFieldValue(formikKey, value);
      }}
      {...rest}
    />
  </AuthFieldWrapper>
);
