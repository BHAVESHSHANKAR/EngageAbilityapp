import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions, ActivityIndicator, Modal, Linking } from 'react-native';
import Header from '../components/Header'; // Assuming this is converted to RN
import Gobacktohome from '../components/gobacktohome'; // Already converted to RN

const { width, height } = Dimensions.get('window');

function DeafandDumb() {
  const [word, setWord] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [gamePopup, setGamePopup] = useState(null);

  const fetchASL = async () => {
    if (!word) {
      setError('Please enter a word.');
      return;
    }
    setError('');
    setImageUrl('');
    setIsLoading(true);

    const url = `https://american-sign-language-spelling-tool.p.rapidapi.com/${encodeURIComponent(word)}?scale=2`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '9b06821156mshb276c6dbbc2e4c6p138fccjsn56a7ca33b952',
        'x-rapidapi-host': 'american-sign-language-spelling-tool.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      // Convert the response to a blob
      const blob = await response.blob();

      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        console.log('Base64 Image Data:', base64data.substring(0, 100) + '...'); // Debug log
        setImageUrl(base64data); // Set the base64 string as the image source
      };
      reader.onerror = (err) => {
        throw new Error(`Error converting blob to base64: ${err}`);
      };
    } catch (error) {
      console.error('Fetch ASL Error:', error);
      setError(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const openGamePopup = (game) => setGamePopup(game);
  const closeGamePopup = () => setGamePopup(null);

  // Rock Paper Scissors Game Logic
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');

  const playRockPaperScissors = (choice) => {
    const choices = ['rock', 'paper', 'scissors'];
    const randomChoice = choices[Math.floor(Math.random() * 3)];
    setUserChoice(choice);
    setComputerChoice(randomChoice);

    if (choice === randomChoice) {
      setResult("It's a tie!");
    } else if (
      (choice === 'rock' && randomChoice === 'scissors') ||
      (choice === 'paper' && randomChoice === 'rock') ||
      (choice === 'scissors' && randomChoice === 'paper')
    ) {
      setResult('You win!');
    } else {
      setResult('Computer wins!');
    }
  };

  // Guess the Number Game Logic
  const [guess, setGuess] = useState('');
  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 10) + 1);
  const [guessResult, setGuessResult] = useState('');

  const playGuessTheNumber = () => {
    const num = parseInt(guess);
    if (isNaN(num) || num < 1 || num > 10) {
      setGuessResult('Please enter a number between 1 and 10.');
    } else if (num === targetNumber) {
      setGuessResult('Correct! You guessed the number!');
      setTargetNumber(Math.floor(Math.random() * 10) + 1);
    } else if (num < targetNumber) {
      setGuessResult('Too low! Try again.');
    } else {
      setGuessResult('Too high! Try again.');
    }
    setGuess('');
  };

  // Color Match Game Logic
  const [colors] = useState(['red', 'blue', 'green', 'yellow']);
  const [targetColor, setTargetColor] = useState(colors[Math.floor(Math.random() * 4)]);
  const [colorResult, setColorResult] = useState('');

  const playColorMatch = (color) => {
    if (color === targetColor) {
      setColorResult('Correct! You matched the color!');
      setTargetColor(colors[Math.floor(Math.random() * 4)]);
    } else {
      setColorResult('Wrong! Try again.');
    }
  };

  const openWebsite = async () => {
    const url = 'https://engage-ability.vercel.app/';
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.error(`Don't know how to open URL: ${url}`);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  return (
    <ScrollView style={styles.pageWrapper}>
      <Header />
      <View style={styles.deafAndDumb}>
        <View style={styles.signToText}>
          <Text style={styles.heading}>Text-to-Sign</Text>
          <TextInput
            style={styles.signInput}
            placeholder="Enter a word"
            value={word}
            onChangeText={setWord}
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.getSignImage} onPress={fetchASL}>
            <Text style={styles.buttonText}>Get Sign Language</Text>
          </TouchableOpacity>
          {isLoading && <ActivityIndicator size="large" color="#00b4db" style={styles.loader} />}
          {imageUrl ? (
            <View style={styles.result}>
              <Image
                source={{ uri: imageUrl }}
                style={styles.imageOfSign}
                onError={(e) => console.log('Image Load Error:', e.nativeEvent.error)}
              />
            </View>
          ) : null}
          {error && <Text style={styles.error}>{error}</Text>}
        </View>

        <View style={styles.signVideos}>
          <Text style={styles.videoMessage}>
            To watch sign language videos, visit our{' '}
            <Text style={styles.linkText} onPress={openWebsite}>
              website
            </Text>
          </Text>
        </View>

        <View style={styles.gamesSection}>
          <Text style={styles.gamesTitle}>Simple Games for Deaf and Dumb</Text>
          <View style={styles.gamesContainer}>
            <View style={styles.gameCard}>
              <Text style={styles.gameCardTitle}>Rock Paper Scissors</Text>
              <Text style={styles.gameCardText}>Play the classic game with visual choices.</Text>
              <TouchableOpacity style={styles.gameButton} onPress={() => openGamePopup('rock-paper-scissors')}>
                <Text style={styles.buttonText}>Play Now</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.gameCard}>
              <Text style={styles.gameCardTitle}>Guess the Number</Text>
              <Text style={styles.gameCardText}>Guess a number between 1 and 10.</Text>
              <TouchableOpacity style={styles.gameButton} onPress={() => openGamePopup('guess-the-number')}>
                <Text style={styles.buttonText}>Play Now</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.gameCard}>
              <Text style={styles.gameCardTitle}>Color Match</Text>
              <Text style={styles.gameCardText}>Match the color shown!</Text>
              <TouchableOpacity style={styles.gameButton} onPress={() => openGamePopup('color-match')}>
                <Text style={styles.buttonText}>Play Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <Modal visible={!!gamePopup} transparent animationType="fade">
        <View style={styles.gamePopup}>
          <View style={styles.gamePopupContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closeGamePopup}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            {gamePopup === 'rock-paper-scissors' && (
              <>
                <Text style={styles.popupTitle}>Rock Paper Scissors</Text>
                <Text style={styles.popupText}>Choose your move!</Text>
                <View style={styles.gameArea}>
                  <TouchableOpacity style={styles.gameAreaButton} onPress={() => playRockPaperScissors('rock')}>
                    <Text style={styles.buttonText}>Rock</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.gameAreaButton} onPress={() => playRockPaperScissors('paper')}>
                    <Text style={styles.buttonText}>Paper</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.gameAreaButton} onPress={() => playRockPaperScissors('scissors')}>
                    <Text style={styles.buttonText}>Scissors</Text>
                  </TouchableOpacity>
                  {userChoice && computerChoice && (
                    <View>
                      <Text style={styles.popupText}>You chose: {userChoice}</Text>
                      <Text style={styles.popupText}>Computer chose: {computerChoice}</Text>
                      <Text style={styles.popupText}>{result}</Text>
                    </View>
                  )}
                </View>
              </>
            )}
            {gamePopup === 'guess-the-number' && (
              <>
                <Text style={styles.popupTitle}>Guess the Number</Text>
                <Text style={styles.popupText}>Guess a number between 1 and 10!</Text>
                <View style={styles.gameArea}>
                  <TextInput
                    style={styles.gameInput}
                    value={guess}
                    onChangeText={setGuess}
                    placeholder="Enter your guess"
                    keyboardType="numeric"
                  />
                  <TouchableOpacity style={styles.gameAreaButton} onPress={playGuessTheNumber}>
                    <Text style={styles.buttonText}>Submit Guess</Text>
                  </TouchableOpacity>
                  {guessResult && <Text style={styles.popupText}>{guessResult}</Text>}
                </View>
              </>
            )}
            {gamePopup === 'color-match' && (
              <>
                <Text style={styles.popupTitle}>Color Match</Text>
                <Text style={styles.popupText}>Click the button that matches this color:</Text>
                <View style={styles.gameArea}>
                  <View style={[styles.colorBox, { backgroundColor: targetColor }]} />
                  <TouchableOpacity style={[styles.gameAreaButton, { backgroundColor: 'red' }]} onPress={() => playColorMatch('red')}>
                    <Text style={styles.buttonText}>Red</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.gameAreaButton, { backgroundColor: 'blue' }]} onPress={() => playColorMatch('blue')}>
                    <Text style={styles.buttonText}>Blue</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.gameAreaButton, { backgroundColor: 'green' }]} onPress={() => playColorMatch('green')}>
                    <Text style={styles.buttonText}>Green</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.gameAreaButton, { backgroundColor: 'yellow' }]} onPress={() => playColorMatch('yellow')}>
                    <Text style={styles.buttonText}>Yellow</Text>
                  </TouchableOpacity>
                  {colorResult && <Text style={styles.popupText}>{colorResult}</Text>}
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      <Gobacktohome />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: '#f5f7fa', // Simplified gradient
  },
  deafAndDumb: {
    padding: Math.min(Math.max(24, width * 0.03), 40),
    width: '100%',
  },
  // signToText: {
  //   padding: Math.min(Math.max(24, width * 0.03), 32),
  //   borderRadius: 25,
  //   backgroundColor: 'rgba(255, 255, 255, 0.2)', // Simplified gradient
  //   marginBottom: Math.min(Math.max(32, width * 0.04), 48),
  //   alignItems: 'center',
  // },
  // heading: {
  //   fontSize: Math.min(Math.max(32, width * 0.05), 48),
  //   color: '#1a3c5e',
  //   fontWeight: '700',
  //   marginBottom: Math.min(Math.max(16, width * 0.02), 24),
  //   textTransform: 'uppercase',
  // },
  // signInput: {
  //   width: '100%',
  //   maxWidth: Math.min(Math.max(250, width * 0.6), 400),
  //   padding: Math.min(Math.max(11, width * 0.015), 14),
  //   fontSize: Math.min(Math.max(16, width * 0.02), 18),
  //   borderRadius: 12,
  //   backgroundColor: 'rgba(255, 255, 255, 0.9)',
  //   marginBottom: Math.min(Math.max(16, width * 0.02), 24),
  // },
  // getSignImage: {
  //   backgroundColor: '#00b4db', // Simplified gradient
  //   paddingVertical: Math.min(Math.max(12, width * 0.02), 16),
  //   paddingHorizontal: Math.min(Math.max(32, width * 0.03), 40),
  //   borderRadius: 50,
  //   alignItems: 'center',
  // },
  // buttonText: {
  //   color: 'white',
  //   fontSize: Math.min(Math.max(16, width * 0.025), 19),
  //   fontWeight: '600',
  // },
  // loader: {
  //   marginVertical: Math.min(Math.max(24, width * 0.02), 32),
  // },
  // result: {
  //   marginTop: Math.min(Math.max(24, width * 0.02), 32),
  // },
  // imageOfSign: {
  //   width: Math.min(Math.max(300, width * 0.5), 400),
  //   height: undefined,
  //   aspectRatio: 1,
  //   borderRadius: 15,
  // },
  // error: {
  //   color: '#ff6b6b',
  //   fontSize: Math.min(Math.max(14, width * 0.02), 16),
  //   marginTop: Math.min(Math.max(12, width * 0.01), 16),
  //   fontWeight: '500',
  //   backgroundColor: 'rgba(255, 107, 107, 0.1)',
  //   padding: 8,
  //   borderRadius: 10,
  // },
  // signVideos: {
  //   padding: Math.min(Math.max(24, width * 0.03), 32),
  //   borderRadius: 25,
  //   backgroundColor: 'rgba(255, 255, 255, 0.2)', // Simplified gradient
  //   marginBottom: Math.min(Math.max(32, width * 0.04), 48),
  //   alignItems: 'center',
  // },
  // videoMessage: {
  //   fontSize: Math.min(Math.max(16, width * 0.025), 18),
  //   color: '#555',
  //   textAlign: 'center',
  // },
  // linkText: {
  //   color: '#00b4db',
  //   textDecorationLine: 'underline',
  // },
  signToText: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  result: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
  
  imageOfSign: {
    width: 250, // Fixed width that works well for sign images
    height: 250, // Fixed height to match
    resizeMode: 'contain', // Ensures whole image is visible
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  // Make the input and button more compact
  signInput: {
    width: '80%',
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  getSignImage: {
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
  },

  // Adjust the video message section
  signVideos: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  videoMessage: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },

  linkText: {
    color: '#4a90e2',
    fontWeight: '600',
  },
  gamesSection: {
    padding: Math.min(Math.max(24, width * 0.03), 32),
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Simplified gradient
    alignItems: 'center',
  },
  gamesTitle: {
    fontSize: Math.min(Math.max(28, width * 0.04), 40),
    color: '#1a3c5e',
    fontWeight: '700',
    marginBottom: Math.min(Math.max(24, width * 0.02), 32),
  },
  gamesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Math.min(Math.max(24, width * 0.02), 32),
  },
  gameCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Simplified gradient
    padding: Math.min(Math.max(19, width * 0.02), 29),
    borderRadius: 20,
    width: Math.min(Math.max(200, width * 0.25), 280),
    alignItems: 'center',
  },
  gameCardTitle: {
    fontSize: Math.min(Math.max(21, width * 0.03), 26),
    color: '#34495e',
    fontWeight: '600',
    marginBottom: Math.min(Math.max(8, width * 0.01), 13),
  },
  gameCardText: {
    fontSize: Math.min(Math.max(14, width * 0.02), 16),
    color: '#555',
    marginBottom: Math.min(Math.max(16, width * 0.015), 24),
  },
  gameButton: {
    backgroundColor: '#00b4db', // Simplified gradient
    paddingVertical: Math.min(Math.max(10, width * 0.01), 13),
    paddingHorizontal: Math.min(Math.max(19, width * 0.02), 29),
    borderRadius: 30,
    alignItems: 'center',
  },
  gamePopup: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gamePopupContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Simplified gradient
    padding: Math.min(Math.max(32, width * 0.03), 40),
    borderRadius: 25,
    width: Math.min(Math.max(350, width * 0.8), 700),
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#ff6b6b',
    borderRadius: 17.5,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  popupTitle: {
    fontSize: Math.min(Math.max(28, width * 0.04), 40),
    color: '#1a3c5e',
    marginBottom: Math.min(Math.max(16, width * 0.015), 24),
    textAlign: 'center',
  },
  popupText: {
    fontSize: Math.min(Math.max(16, width * 0.02), 18),
    color: '#555',
    marginBottom: Math.min(Math.max(24, width * 0.02), 32),
    textAlign: 'center',
  },
  gameArea: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: Math.min(Math.max(24, width * 0.02), 32),
    borderRadius: 15,
    alignItems: 'center',
    minHeight: 250,
    marginTop: 20,
  },
  gameAreaButton: {
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#00b4db', // Default color for buttons
  },
  gameInput: {
    padding: 5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: 150,
    textAlign: 'center',
  },
  colorBox: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});

export default DeafandDumb;