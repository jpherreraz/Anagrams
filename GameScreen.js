import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const GameScreen = () => {
  const [letters, setLetters] = useState('');
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [randomLetters, setRandomLetters] = useState('');

  useEffect(() => {
    let interval;

    if (isPlaying && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0) {
      setIsPlaying(false);
    }

    return () => clearInterval(interval);
  }, [isPlaying, timer]);

  const handleStartGame = () => {
    const letters = generateRandomLetters(6);
    setRandomLetters(letters);
    setLetters('');
    setScore(0);
    setTimer(60);
    setIsPlaying(true);
  };

  const generateRandomLetters = (count) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let letters = '';

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      letters += alphabet[randomIndex];
    }

    return letters;
  };

  const handleStopGame = () => {
    setIsPlaying(false);
  };

  const calculatePoints = (word) => {
    const length = word.length;

    if (length === 3) {
      return 100;
    } else if (length === 4) {
      return 300;
    } else if (length === 5) {
      return 500;
    } else if (length === 6) {
      return 1000;
    } else {
      return 0;
    }
  };

  const handleCheckWord = () => {
    const lowercasedLetters = letters.toLowerCase();
    const isValid = isWordValid(lowercasedLetters, randomLetters.toLowerCase());

    if (isValid) {
      const wordPoints = calculatePoints(lowercasedLetters);
      setScore((prevScore) => prevScore + wordPoints);
    }

    setLetters('');
  };

  const isWordValid = (word, randomLetters) => {
    const randomLettersArray = randomLetters.toLowerCase().split('');
    const wordArray = word.toLowerCase().split('');

    for (let i = 0; i < wordArray.length; i++) {
      const letter = wordArray[i];
      const index = randomLettersArray.indexOf(letter);

      if (index === -1) {
        return false;
      }

      randomLettersArray.splice(index, 1);
    }

    return true;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Score: {score}</Text>
      <Text style={styles.timerText}>Time: {timer}</Text>
      <Text style={styles.lettersText}>Random Letters: {randomLetters}</Text>
      <TextInput
        placeholder="Enter words"
        value={letters}
        onChangeText={setLetters}
        style={styles.input}
      />
      <Button
        title="Check Word"
        onPress={handleCheckWord}
        disabled={!isPlaying}
      />
      {isPlaying ? (
        <Button title="Stop Game" onPress={handleStopGame} />
      ) : (
        <Button title="Start Game" onPress={handleStartGame} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  scoreText: {
    fontSize: 24,
    marginBottom: 10,
  },
  timerText: {
    fontSize: 20,
    marginBottom: 20,
  },
  lettersText: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
});

export default GameScreen;
