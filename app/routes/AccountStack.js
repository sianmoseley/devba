import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CustomHeader from '../custom/CustomHeader';
import AccountScreen from '../screens/AccountScreen';
import ViewPostsScreen from '../screens/ViewPostsScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import DeleteAccountScreen from '../screens/DeleteAccountScreen';
import ChangeUsernameScreen from '../screens/ChangeUsernameScreen';
import EditPostScreen from '../screens/EditPostScreen';

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator
      initialRouteName="Account"
      screenOptions={() => ({
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#2bb76e'},
      })}>
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={({navigation}) => ({
          headerTitle: () => (
            <CustomHeader navigation={navigation} title="Account" />
          ),
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="ViewPosts"
        component={ViewPostsScreen}
        options={{title: 'Your Posts', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="EditForm"
        component={EditPostScreen}
        options={{title: 'Edit Post', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{title: 'Change Password', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="ChangeUsername"
        component={ChangeUsernameScreen}
        options={{title: 'Change Username', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccountScreen}
        options={{title: 'Delete Account', headerTitleAlign: 'center'}}
      />
    </Stack.Navigator>
  );
}
