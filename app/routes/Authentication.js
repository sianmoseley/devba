import {firebaseConfig} from '../database/Firebase';
import Firebase from 'firebase';
import React, {useState, useEffect, createContext} from 'react';
import LogInStack from './LoginStack';
import LogOutStack from './LogoutStack';
import Notifications from '../services/Notifications'

//plugs into App.js
//initializes firebase database on app start

// expose user data to LogInStack ONLY when the user succesfully logs in
const AuthContext = createContext(null);

export default function AuthNavigator() {
  // initializing state variable keeps track of changes in authentication state
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state change and subscribe to auth changes when component is mounted
  useEffect(() => {
    const authSubscriber = Firebase.auth().onAuthStateChanged(result => {
      setUser(result);
      if (initializing) {
        setInitializing(false);
      }
    });
    
    //unsubscribe on unmount
    return authSubscriber;
    
  }, [initializing]);

 
  if (initializing) {
    return null;
  }

  //directs to relevant stack dependant if user is logged in
  return user ? (
    
    <AuthContext.Provider value={user}>
      <LogInStack />
      <Notifications />
      
    </AuthContext.Provider>
  ) : (
    <LogOutStack />
  );
}

