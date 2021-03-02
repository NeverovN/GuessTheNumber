import React from "react";
import {TouchableOpacity, View, Text, StyleSheet} from "react-native";

const CustomButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onSelect}
    >
      <View style={{...styles.screen, ...props.style}}>
        <Text style={{...styles.textStyle, ...props.textStyle}}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: {
    overflow: 'hidden',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 7,
    justifyContent: 'center',
    alignItems: 'center',

  },
  textStyle: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'open-sans-bold'
  }
});

export default CustomButton;