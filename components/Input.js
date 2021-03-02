import React from 'react';
import {TextInput, StyleSheet} from "react-native";

const Input = props => {
  return (
    <TextInput {...props} style={{...styles.input, ...props.style}}/>
  )
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    height: 25,
    marginVertical: 10
  }
})

export default Input;