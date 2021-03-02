import React from "react";
import {View, Text, StyleSheet, Button} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/Colors";
import NumberPad from "../components/NumberPad";

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Card style={styles.opponentsChoiceContainer}>
        <Text style={styles.guessText}>It took {props.roundCount} rounds to get it</Text>
        <Text style={styles.guessText}>Your number is</Text>
        <NumberPad>{props.playersNumber}</NumberPad>
      </Card>
      <View style={{margin: 20, height: 30, width: 50}}>
        <Button title='Yes' color={Colors.submit} onPress={() => {
          props.onEndGame(undefined, 0);
        }}/></View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  opponentsChoiceContainer: {
    width: 350,
    maxWidth: '80%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  guessText: {
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default GameOverScreen;