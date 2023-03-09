import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {MainStack} from './MainStack';
import {AuthStack} from './AuthStack';
import {useAuth} from '../contexts/Auth';
import Splash from '../screens/Splash';
import { StatusBar } from 'react-native';

export const EntryStack = () => {
  const {authData, loading} = useAuth();

  if (loading) {
    return <Splash />;
  }
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      {authData ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
