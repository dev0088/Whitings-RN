/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MainScreen from './src/main';

const App: () => React$Node = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View contentInsetAdjustmentBehavior="automatic" style={styles.content}>
          <MainScreen />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  content: {
    backgroundColor: Colors.black,
    flex: 1,
  },
});

export default App;
