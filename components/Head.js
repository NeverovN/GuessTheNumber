import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from "../constants/Colors";

const Head = props => {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    height: 90,
    width: '100%',
    backgroundColor: Colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 26
  }
});

export default Head