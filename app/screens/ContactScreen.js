import React from 'react';
import {Image, Text, View} from 'react-native';
import {globalStyles} from '../config/Styles';

//basic page with Contact info

export default function ContactScreen({navigation}) {
  return (
    <View style={{padding: 25}}>
      <View style={globalStyles.logoContainer}>
        <Image
          style={{width: 275, height: 238}}
          source={require('../images/bigapp.png')}
        />
      </View>
      <Text style={globalStyles.aboutText}>
        {'\n'}Want to report a bug or post?{'\n\n'}
        Report a bug feature can be accessed from the side drawer,{'\n'}
        and you can report a post from the home feed.{'\n\n'}
        For anything else, please email us at:{'\n'}
        <Text style={{fontWeight: 'bold'}}>bigappetitesd@gmail.com</Text>
      </Text>
    </View>
  );
}
