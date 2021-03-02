import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  Alert,
  Dimensions,
  ImageBackground,
  ScrollView
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import NumberPad from "../components/NumberPad";
import CustomButton from "../components/CustomButton";

import Colors from "../constants/Colors";


const StartScreen = props => {

  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const [height, setHeight] = useState(Dimensions.get('window').height);

  const dimensionsChangeListener = () => {
    setHeight(Dimensions.get('window').height);
    setWidth(Dimensions.get('window').width);
  }

  Dimensions.addEventListener('change', dimensionsChangeListener);


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
        <CustomButton
          style={{backgroundColor: Colors.lightBlue}}
          onSelect={() => props.onStartGame(selectedNumber)}
        >
          START GAME
        </CustomButton>

      </Card>
    )
  }

  return (
    <ImageBackground
      source={require('../assets/images/StartScreenWallpaper.png')}
      style={{flex: 1, height: height, width: width}}
    >
      <ScrollView style={{flex: 1, height: height > width ? height : height * 1.1, width: width,}}>
        <TouchableWithoutFeedback onPress={() => {
          Keyboard.dismiss();
        }}>
          <View style={styles.screen}>
            <Text style={styles.text}>Start a New Game</Text>
            <Card style={{...styles.inputView, width: width < height ? width * 0.8 : width * 0.7}}>
              <Text>Select a number</Text>
              <Input
                style={styles.input}
                color='black'
                autoCapitalize='none'
                keyboardType='number-pad'
                maxLength={2}
                value={enteredValue}
                onChangeText={numberInputHandler}
              />
              <View style={styles.buttonsView}>
                <View style={{...styles.button, width: width / 4}}>
                  <Button
                    title="RESET"
                    color={Colors.reset}
                    onPress={resetInputHandler}
                  />
                </View>
                <View style={{width: width / 4}}>
                  <Button
                    title="SUBMIT"
                    color={Colors.submit}
                    style={{width: width / 4}}
                    onPress={submitInputHandler}/>
                </View>
              </View>
            </Card>
            {confirmedRender}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    alignItems: 'center',
  },
  inputView: {
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
    paddingHorizontal: 10,
    paddingTop: 10
  },
  input: {
    textAlign: 'center',
    width: 50,
    fontSize: 20
  },
  selectedNumberContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: '60%',
    marginBottom: 10
  }
});

export default StartScreen;