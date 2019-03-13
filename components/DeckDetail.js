import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { removeDeck } from '../actions';
import { removeDeckFromDB } from '../utils/db';
import { connect } from 'react-redux'
import TextBtn from './TextBtn'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import AddCard from './AddCard'
import QuizView from './QuizView'

class DeckDetail extends Component {
    state = {
        removed: false
    }

    removeDeck () {
        const { deckTitle, goBack, remove } = this.props
        removeDeckFromDB(deckTitle)
        remove()
        goBack()
        this.setState({removed: true})
    }

    shouldComponentUpdate() {
        return  this.state.removed
    }
    
    render () {
        const { deckTitle, decks, navigation } = this.props
        return (
            <View>
                <Text>Deck Detail</Text>
                <Text style={{fontSize: 24 }}>{deckTitle}</Text>
                <Text style={{fontSize: 16 }}>{decks[deckTitle].cards.length} Cards</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AddCard')}><Text>Add Card</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('QuizView', { nextCard: 1, cardIndex: 0, showAnswer: false})}><Text>Start Quiz</Text></TouchableOpacity>
                <TextBtn style={{fontSize: 16}} onPress={() => this.removeDeck()}>Delete Entry</TextBtn>
            </View>
        )
    }
}

const mapStateToProps = (state, {navigation}) => {
    const { deckTitle } = navigation.state.params
    return {
        deckTitle,
        decks: state,
        navigation
    }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
    const { deckTitle } = navigation.state.params
    return {
        remove: () => dispatch(removeDeck(deckTitle)),
        goBack: () => navigation.goBack()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail)