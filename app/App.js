import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {YellowBox} from 'react-native';
import AuthNavigator from './routes/Authentication';
import 'firebase/database';

export default class devba extends Component {
  render() {
    //plugs into index.js
    //removes warning from screen
    //no solution for this warning can be found online
    YellowBox.ignoreWarnings(['Setting a timer']);
    YellowBox.ignoreWarnings(["Can{'}t perform a React state update"]);
    return <AuthNavigator />;
  }
}
