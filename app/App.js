import 'react-native-gesture-handler';
import React from 'react';
import {YellowBox} from 'react-native';
import AuthNavigator from './routes/Authentication';

export default function devba() {
  YellowBox.ignoreWarnings(['Setting a timer']);
  return <AuthNavigator />;
}
