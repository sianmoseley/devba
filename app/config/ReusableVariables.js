import React from 'react';
import {Text, View, Image, TouchableOpacity, TextInput} from 'react-native';
import Firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import {globalStyles} from './Styles';

//constant component for posts
export const Post = ({
  heading,
  description,
  location,
  createdBy,
  createdAt,
  uri,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={globalStyles.postContainer}>
      <Image style={globalStyles.image} source={uri} />
      <Text style={globalStyles.postText}>
        {heading} @ {location}
        {'\n'}
        posted by {createdBy}
        {'\n'}
        {description}
        {'\n'}
        {createdAt}
      </Text>
    </View>
  </TouchableOpacity>
);

//unique user id of the logged in user
export const userKey = Firebase.auth().currentUser.uid;

//database reference for all posts created by logged in user
export const userPostRef = Firebase.database().ref('user_posts/' + userKey);

const FieldWrapper = ({children, label, formikProps, formikKey}) => (
  <View>
    <Text style={globalStyles.formLabel}>{label}</Text>
    {children}
    <Text style={globalStyles.error}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);

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
