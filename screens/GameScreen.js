import React, {useState, useRef, useEffect} from "react";
import {View, Text, StyleSheet, Button, Alert} from "react-native";
import {Ionicons} from '@expo/vector-icons'

import Card from "../components/Card";
import NumberPad from "../components/NumberPad";

import Colors from "../constants/Colors";
import CustomButton from "../components/CustomButton";

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

  useEffect(() => {
    if (currentChoice === playersNumber) {
      onGameOver(rounds);
    }
  }, [rounds]);


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
      <Card style={styles.buttonContainer}>
        <CustomButton
          style={styles.buttonStyle}
          onSelect={hintHandler.bind(this, 'lower')}>
          <Ionicons name='ios-remove' size={35}/>
        </CustomButton>
        <CustomButton
          style={styles.buttonStyle}
          onSelect={hintHandler.bind(this, 'greater')}>
          <Ionicons name='ios-add' size={35}/>
        </CustomButton>
      </Card>
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
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  guessText: {
    fontSize: 26,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStyle: {
    backgroundColor: Colors.lightBlue,
    width: 70,
    borderRadius: 35
  }
});

export default GameScreen;