import React, {useState, useRef} from "react";
import {View, Text, StyleSheet, Button, Alert} from "react-native";

import Card from "../components/Card";
import NumberPad from "../components/NumberPad";

import Colors from "../constants/Colors";

const generateRandomBetween = (min, max, given) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  let rndNumber = Math.floor(Math.random() * (max - min)) + min;
  if (rndNumber === parseInt(given) || rndNumber === min || rndNumber === max)
    return generateRandomBetween(min, max, given);
  else
    return rndNumber;
}

const GameScreen = props => {

  let {playersNumber, onGameOver} = props;
  const [currentChoice, setCurrentChoice] = useState(
    generateRandomBetween(1, 100, playersNumber)
  );
  const min = useRef(1);
  const max = useRef(100);
  const [rounds, setRounds] = useState(0);

  if (currentChoice == playersNumber) {
    onGameOver(rounds);
  }

  const hintHandler = direction => {
    if ((direction === 'lower' && currentChoice < playersNumber) ||
      (direction === 'greater' && currentChoice > playersNumber)) {
      Alert.alert(
        `Don't try to fool me`,
        'You know that it is lie',
        [{text: 'Sorry', style: 'cancel'}]
      );
      return;
    }
    if (direction === 'lower') {
      max.current = currentChoice;
    } else {
      min.current = currentChoice;
    }
    setCurrentChoice(
      generateRandomBetween(min.current, max.current, currentChoice)
    );
    setRounds(rounds => rounds + 1);
  }

  return (
    <View style={styles.screen}>
      <Card style={styles.opponentsChoiceContainer}>
        <Text style={styles.guessText}>I guess the number is</Text>
        <NumberPad>{currentChoice}</NumberPad>
      </Card>
      <View style={{width: '100%', alignItems: 'center'}}>
        <Card style={styles.buttonContainer}>
          <View style={{width: 90}}><Button title="Lower" color={Colors.lightBlue}
                                            onPress={hintHandler.bind(this, 'lower')}/></View>
          <View style={{width: 90}}><Button title="Greater" color={Colors.lightBlue}
                                            onPress={hintHandler.bind(this, 'greater')}/></View>
        </Card>
      </View>
    </View>);
}

const styles = StyleSheet.create({
  opponentsChoiceContainer: {
    width: 350,
    maxWidth: '80%',
    marginTop: 20,
    alignItems: 'center'
  },
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  buttonContainer: {
    width: 240,
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around'
  },
  guessText: {
    fontSize: 26,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default GameScreen;