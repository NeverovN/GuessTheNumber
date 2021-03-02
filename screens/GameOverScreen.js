import React from "react";
import {View, Text, StyleSheet, Button} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/Colors";
import NumberPad from "../components/NumberPad";
import CustomButton from "../components/CustomButton";

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Card style={styles.opponentsChoiceContainer}>
        <Text style={styles.guessText}>It took {props.roundCount} rounds to get it</Text>
        <Text style={styles.guessText}>Your number is</Text>
        <NumberPad>{props.playersNumber}</NumberPad>
      </Card>
      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.buttonStyle}
          textStyle={styles.buttonTextStyle}
          onSelect={() => {
            props.onEndGame(undefined, 0);
          }}>
          YES
        </CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen:
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  opponentsChoiceContainer:
    {
      width: 350,
      maxWidth: '80%',
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center'
    },
  guessText:
    {
      fontSize: 20,
      alignItems: 'center',
      justifyContent: 'center'
    },
  buttonStyle: {
    backgroundColor: Colors.submit,
    borderRadius: 50
  },
  buttonTextStyle: {
    fontSize: 26,
    fontFamily: 'open-sans',
  },
  buttonContainer: {
    margin: 20,
    height: 40,
    width: 90,
  }

});

export default GameOverScreen;