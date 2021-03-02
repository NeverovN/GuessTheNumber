import React, {useState} from 'react';
import {StyleSheet, ScrollView, ImageBackground, Keyboard, Dimensions, TouchableWithoutFeedback} from 'react-native';
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading';

import Head from './components/Head'
import StartScreen from "./screens/StartScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = () => {
  return Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    }
  );
}

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [uploading, setUploading] = useState(false);

  if (!uploading) {
    return (<AppLoading
      startAsync={fetchFonts}
      onFinish={() => setUploading(true)}
      onError={() => console.log()}
    />);
  }


  const changeScreenHandler = (rndNumber = undefined, roundCount = 0) => {
    setUserNumber(rndNumber);
    setGuessRounds(roundCount);
  };

  const gameOverHandler = roundCount => {
    setGuessRounds(roundCount);
  }

  let renderedScreen = <StartScreen onStartGame={changeScreenHandler}/>;

  if (userNumber !== undefined && guessRounds == 0) {
    renderedScreen = <GameScreen
      playersNumber={userNumber}
      onGameOver={gameOverHandler}
    />
  } else if (guessRounds > 0) {
    renderedScreen = <GameOverScreen
      playersNumber={userNumber}
      roundCount={guessRounds}
      onEndGame={changeScreenHandler}
    />
  }

  return (
    <ScrollView>
      <ImageBackground
        source={require('./assets/images/StartScreenWallpaper.png')}
        style={styles.screen}
      >
          <Head title="Guess the number"/>
          {renderedScreen}
      </ImageBackground>
    </ScrollView>
  );

}

const styles = StyleSheet.create({
  screen: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
