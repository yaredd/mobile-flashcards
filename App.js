import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native'
import { createAppContainer, createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import QuizView from './components/QuizView'
import { Constants } from 'expo';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import { white, purple } from './utils/colors';

const tabs = {
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Home'
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck'
    }
  }
}
  
const TabNavigator = createAppContainer(
        Platform.OS === 'ios'
        ? createBottomTabNavigator(tabs)
        : createMaterialTopTabNavigator(tabs)
      )

const MainNavigator = createAppContainer(createStackNavigator({
  Home: {
    screen: TabNavigator,
    navigationOptions: {
      header: null
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      header: null
    }
  },
}))

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar backgroundColor={backgroundColor} {...props} /> 
    </View>
  )
}

export default class App extends Component {
  
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <UdaciStatusBar backgroundColor={'blue'} barStyle='light-content' />
        <MainNavigator style={styles.container} />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
