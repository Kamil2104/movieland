import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DiscoverScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#131318'
  },
  title: {
    fontSize: 24,
    fontWeight: '600'
  }
});
