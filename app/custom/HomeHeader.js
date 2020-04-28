import React from 'react';
import {Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {globalStyles} from '../config/Styles';

//custom header that loads on home screen
//has icon in top right corner to navigate to add post screen

export default function HomeHeader({navigation, title}) {
  return (
    <View style={globalStyles.header}>
      <View style={globalStyles.iconLeft}>
        <Icon
          iconStyle={{color: 'white'}}
          name="more-vertical"
          type="feather"
          onPress={() => navigation.toggleDrawer()}
        />
      </View>
      <Text style={globalStyles.headerText}>{title}</Text>
      <View style={globalStyles.iconRight}>
        <Icon
          iconStyle={{color: 'white'}}
          name="squared-plus"
          type="entypo"
          onPress={() => navigation.navigate('AddPostScreen')}
        />
      </View>
    </View>
  );
}
