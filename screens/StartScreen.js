import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  Alert
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import NumberPad from "../components/NumberPad";

import Colors from "../constants/Colors";


const StartScreen = props => {

  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  }

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  }

  const submitInputHandler = inputText => {
    Keyboard.dismiss();
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Incorrect input',
        'Incoming value should be a number between 0 and 99',
        [{
          text: 'Got It',
          style: 'cancel',
          onPress: resetInputHandler
        }])
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber)
    setEnteredValue('');
  }

  let confirmedRender;
  if (confirmed) {
    confirmedRender = (
      <Card style={styles.selectedNumberContainer}>
        <Text style={{fontSize: 18}}> You selected </Text>
        <NumberPad>{selectedNumber}</NumberPad>
        <Button
          title='START GAME'
          color={Colors.lightBlue}
          onPress={() => props.onStartGame(selectedNumber)}
        />
      </Card>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={{flex: 1}}>
        <View style={styles.screen}>

          <Text style={styles.text}>Start a New Game</Text>
          <Card style={styles.inputView}>
            <Text>Select a number</Text>
            <Input
              style={styles.input}
              color='black'
              blurOnSubmit
              autoCapitalize='none'
              keyboardType='number-pad'
              maxLength={2}
              value={enteredValue}
              onChangeText={numberInputHandler}
            />
            <View style={styles.buttonsView}>
              <View style={styles.button}>
                <Button
                  title="RESET"
                  color={Colors.reset}
                  onPress={resetInputHandler}
                />
              </View>
              <View style={styles.button}>
                <Button
                  title="SUBMIT"
                  color={Colors.submit}
                  onPress={submitInputHandler}/>
              </View>
            </View>
          </Card>
          {confirmedRender}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  inputView: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'open-sans-bold',
  },
  textInput: {
    borderBottomWidth: 1,
    width: '80%'
  },
  buttonsView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingTop: 10
  },
  button: {
    width: 80,
  },
  input: {
    textAlign: 'center',
    width: 50,
    fontSize: 20
  },
  selectedNumberContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: '60%'
  },
  image: {
    height: 150,
    width: 150,
  },
  imageContainer: {
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderWidth: 5,
    borderRadius: 150,
  }

});

export default StartScreen;