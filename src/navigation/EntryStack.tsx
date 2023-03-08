import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {MainStack} from './MainStack';
import {AuthStack} from './AuthStack';
import {useAuth} from '../contexts/Auth';
import Splash from '../screens/Splash';

export const EntryStack = () => {
  const {authData, loading} = useAuth();

  if (loading) {
    return <Splash />;
  }
  return (
    <NavigationContainer>
      {authData ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
