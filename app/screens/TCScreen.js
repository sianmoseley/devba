import React from 'react';
import {Image, Text, View} from 'react-native';
import {globalStyles} from '../config/Styles';

//basic page with Terms & Conditions info

export default function TCScreen() {
  return (
    <View style={{padding: 25}}>
      <View style={globalStyles.logoContainer}>
        <Image
          style={{width: 275, height: 238}}
          source={require('../images/bigapp.png')}
        />
      </View>
      <Text style={globalStyles.aboutText}>{'\n'}TC</Text>
    </View>
  );
}
