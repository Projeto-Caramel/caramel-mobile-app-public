import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Logo from '../assets/logotipo-brown.png'
import { Theme } from '../styles/Theme';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Image source={Logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.caramelLight[90],
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;
