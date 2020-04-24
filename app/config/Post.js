import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
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
