import React from 'react';
import {Image, Text, View} from 'react-native';
import {globalStyles} from '../config/Styles';

export default function AboutScreen() {
  return (
    <View style={globalStyles.logoContainer}>
      <Image
        style={globalStyles.logo}
        source={require('../images/burger.png')}
      />
      <View style={{padding: 25}}>
        <Text style={globalStyles.aboutText}>
          Big APPetite reduces food waste and feeds students on a budget by
          advertising when free food is available on campus.{'\n\n'}It was
          created in 2020 by student developers at Sheffield Hallam University.
        </Text>
      </View>
    </View>
  );
}
