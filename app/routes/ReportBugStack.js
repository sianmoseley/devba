import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ReportBugScreen from '../screens/ReportBugScreen';
import CustomHeader from '../custom/CustomHeader';

const Stack = createStackNavigator();

export default function ReportBugNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => {
        return {
          headerTitle: () => (
            <CustomHeader navigation={navigation} title="Report Bug" />
          ),
          headerTitleAlign: 'center',
        };
      }}>
      <Stack.Screen name="ReportBugScreen" component={ReportBugScreen} />
    </Stack.Navigator>
  );
}
