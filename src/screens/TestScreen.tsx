import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';

// declare types for your props here
interface Props {
  navigation: any;
}

export default function TestScreen(props: Props) {
  const {navigation} = props;

  return (
    <View style={styles.container}>
      <Text>Test screen to test out React Native Paper library</Text>
      <Button
        mode="contained"
        color="green"
        labelStyle={styles.buttonText}
        contentStyle={styles.innerButton}
        style={styles.button}
      >
        Test Button
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
  },
  innerButton: {
    padding: 10,
  },
  button: {
    borderRadius: 50,
  },
});
