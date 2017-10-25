import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Header from '../@modules/Header';
import FooterNav from '../@modules/FooterNav';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function Sections() {
  return (
    <View style={styles.container}>
      <Header titleText="Sections" />
      <FooterNav>
        <FooterNav.Link
          to="/sections"
          label="sections"
          activeStyle={{ backgroundColor: 'red' }}
        />
        <FooterNav.Link
          to="/"
          label="feed"
          activeStyle={{ backgroundColor: 'red' }}
        />
      </FooterNav>
    </View>
  );
}