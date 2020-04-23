import React from 'react';
import {Image, Text, View} from 'react-native';
import {globalStyles} from '../config/Styles';

export default function ContactScreen() {
  return (
    <View style={{padding: 25}}>
      <Text style={globalStyles.aboutText}>
        Want to report a bug or post?{'\n'}
        [insert appropriate navigation options]
        {'\n\n'}
        For anything else, please email us at:{'\n'}
        bigappetitesd@gmail.com.
      </Text>
    </View>
  );
}
