import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import Colors from "../constants/Colors";

const NumberPad = props => {
  return (
    <View style={styles.numberView}>
      <Text style={styles.numberText}>{props.children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  numberView: {
    width: 60,
    maxWidth: '80%',
    borderWidth: 2,
    borderColor: Colors.lightBlue,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  numberText: {
    fontSize: 25,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  }
})

export default NumberPad;