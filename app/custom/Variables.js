import React from 'react';
import {
  Image,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {authenticationStyles, globalStyles} from '../style/Styles';

//reads today's date in default Javascript
let date = new Date();
export let today =
  [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/') +
  ' ' +
  [
    date.getHours(),
    (date.getMinutes() < 10 ? '0' : '') + date.getMinutes(),
  ].join(':');

//constant component for posts
export const Post = ({
  createdAt,
  createdBy,
  description,
  heading,
  location,
  onPress,
  url,
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
      <Image style={globalStyles.image} source={{uri: url}} />
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
        style={globalStyles.formPlaceholder}
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
      trackColor={{false: '#767577', true: '#81b0ff'}}
      value={formikProps.values[formikKey]}
      onValueChange={value => {
        formikProps.setFieldValue(formikKey, value);
      }}
      {...rest}
    />
  </FieldWrapper>
);

//authentication custom components exist
//as they're styled differently to in app inputs

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
        style={globalStyles.formPlaceholder}
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
