import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation'
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import { Constants } from 'expo';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'

const tabs = {
  Decks: Decks,
  AddDeck: AddDeck
}
  
const TabNavigator = createAppContainer(createMaterialTopTabNavigator(tabs))

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
        <TabNavigator style={styles.container} />
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
