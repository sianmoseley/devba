/**
 * @format
 */

//main screen form where the app is loaded

import {AppRegistry} from 'react-native';
import devba from './app/App';
import {name as appName} from './app.json';
import {decode, encode} from 'base-64';

global.btoa = encode;
global.atob = decode;

AppRegistry.registerComponent(appName, () => devba);
