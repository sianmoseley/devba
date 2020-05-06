import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {YellowBox} from 'react-native';
import AuthNavigator from './routes/Authentication';
import 'firebase/database';

export default class devba extends Component {
  

  render() {
    //plugs into index.js
    YellowBox.ignoreWarnings(['Setting a timer']);
    return <AuthNavigator />;
  }
}
