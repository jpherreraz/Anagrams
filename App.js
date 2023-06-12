import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import GameScreen from './GameScreen';

const Stack = createStackNavigator({
  WordGame: {
    screen: GameScreen,
    navigationOptions: {
      title: 'Anagrams',
    },
  },
});

const AppContainer = createAppContainer(Stack);

const App = () => {
  return <AppContainer />;
};

export default App;
