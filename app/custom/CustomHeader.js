import React from 'react';
import {Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {globalStyles} from '../config/Styles';

//custom header that loads on every screen except for the home screen
//top right icon blends into background so that header content is aligned

export default function DrawerHeader({navigation, title}) {
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
      <View>
        {/* Icon is invisible and has no onPress, but is needed so that the header is aligned in the middle */}
        <Icon iconStyle={{color: '#2bb76e'}} name="plus" type="feather" />
      </View>
    </View>
  );
}
