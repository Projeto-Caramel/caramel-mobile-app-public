import React from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { Theme } from './src/styles/Theme';
import Routes from './src/navigation/Routes';

export default function App() {
  return (
    <NativeBaseProvider theme={Theme}>
      <StatusBar backgroundColor={Theme.colors.brown.minus10}/>
      <Routes />
    </NativeBaseProvider>
  );
}
