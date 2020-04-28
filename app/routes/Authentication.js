import React, {useState, useEffect, createContext} from 'react';
import LogInStack from './LoginStack';
import LogOutStack from './LogoutStack';
import {firebaseConfig} from '../database/Firebase';
import Firebase from 'firebase';

//plugs into App.js
//initializes firebase database on app start

const AuthContext = createContext(null);

export default function AuthNavigator() {
  !Firebase.apps.length
    ? Firebase.initializeApp(firebaseConfig)
    : Firebase.app();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

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
    </AuthContext.Provider>
  ) : (
    <LogOutStack />
  );
}
