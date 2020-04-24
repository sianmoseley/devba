import React from 'react';
import {Image, Text, View} from 'react-native';
import {globalStyles} from '../config/Styles';

//basic page with About info

export default function AboutScreen() {
  return (
    <View style={globalStyles.logoContainer}>
      <Image
        style={globalStyles.logo}
        source={require('../images/bigapp.jpeg')}
      />
      <View style={{padding: 25}}>
        <Text style={globalStyles.aboutText}>
          Big APPetite reduces food waste and feeds students on a budget by
          advertising when free food is available on campus.
          {'\n\n'}
          It was created in 2020 by student developers at Sheffield Hallam
          University.
          {'\n\n'}
          big APPetite logo designed and created by Natalie Walker (Instagram:
          ataraxiaarts) and Sam Jackson.
        </Text>
      </View>
    </View>
  );
}
