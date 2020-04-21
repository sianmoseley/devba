import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNav from './TabNav';
import AboutStack from './AboutStack';
import AccountStack from './AccountStack';
import ContactStack from './ContactStack';
import ReportBugStack from './ReportBugStack';
import TCStack from './TCStack';

const Drawer = createDrawerNavigator();

export default function RootStack() {
  return (
    <Drawer.Navigator
      drawerType="back"
      initialRouteName="HomeStack"
      drawerContentOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#2bb76e',
        activeBackgroundColor: '#2bb76e',
        inactiveBackgroundColor: 'white',
      }}>
      <Drawer.Screen
        name="HomeStack"
        component={TabNav}
        options={{drawerLabel: 'big APPetite'}}
      />
      <Drawer.Screen
        name="Acount"
        component={AccountStack}
        options={{
          drawerLabel: 'Account',
          swipeEnabled: false,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutStack}
        options={{
          drawerLabel: 'About',
          swipeEnabled: false,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={ContactStack}
        options={{
          drawerLabel: 'Contact',
          swipeEnabled: false,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="ReportBugStack"
        component={ReportBugStack}
        options={{
          drawerLabel: 'Report Bug',
          swipeEnabled: false,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="TC"
        component={TCStack}
        options={{
          drawerLabel: 'Terms & Conditions',
          swipeEnabled: false,
          unmountOnBlur: true,
        }}
      />
    </Drawer.Navigator>
  );
}
