import React, {useState, useEffect, createContext} from 'react';
import LogInStack from './LoginStack';
import LogOutStack from './LogoutStack';
import {firebaseConfig} from '../database/Config';
import Firebase from 'firebase';

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

  return user ? (
    <AuthContext.Provider value={user}>
      <LogInStack />
    </AuthContext.Provider>
  ) : (
    <LogOutStack />
  );
}
