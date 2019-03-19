import React, { Component } from 'react'
import { StyleSheet, Platform, View, Text, TouchableOpacity } from 'react-native'
import { removeDeck } from '../actions';
import { removeDeckFromDB } from '../utils/db';
import { connect } from 'react-redux'
import TextBtn from './TextBtn'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import AddCard from './AddCard'
import QuizView from './QuizView'
import { white, gray } from '../utils/colors'

class DeckDetail extends Component {
    state = {
        removed: false,
        responses: null,
        addedCard: false
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.deckTitle
        }
    }

    correctAnswerCounter = () => {
        responses
    }

    removeDeck () {
        const { deckTitle, goBack, remove } = this.props
        removeDeckFromDB(deckTitle)
        remove()
        this.setState(() => ({ removed: true}))
        goBack()
    }

    cardAddedToDeck = () => {
        this.setState(() => ({ addedCard: true }))
    }

    noCards = () => {
        const { decks, deckTitle } = this.props
        if (decks === undefined || decks[deckTitle].cards.length === 0){
            return true
        }
        return false
    }

    render () {
        if (this.state.removed === true){
            return (<Text>Ugly HACK: shouldComponentUpdate not working when using stackNavigator?!</Text>)
        }
        const { deckTitle, decks, navigation } = this.props
        return (
            <View>
                <Text style={{fontSize: 16, alignSelf: 'center'}}>{decks[deckTitle].cards.length} Cards</Text>
                <TouchableOpacity style={styles.item}
                        onPress={() => navigation.navigate('AddCard', {deckTitle: deckTitle, cardAdded: () => this.cardAddedToDeck() })}>
                        <Text style={styles.buttonText}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} 
                        onPress={() => navigation.navigate('QuizView', { cardIndex: 0, showAnswer: false, deckTitle: deckTitle, correctAnswerCount: 0})}
                        disabled={this.noCards()}>
                        <Text style={styles.buttonText}>Start Quiz</Text>
                </TouchableOpacity>
                <TextBtn style={{fontSize: 16, marginTop: 30}} onPress={() => this.removeDeck()}>Delete Entry</TextBtn>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: white,
        borderColor: gray,
        borderWidth: 2,
        borderRadius: Platform.OS === 'ios' ? 16 : 6,
        padding: 20,
        marginTop: 17,
        marginRight: 10,
        marginLeft: 10,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.0,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width:0,
            height: 3
        }
    },
    buttonText: {
        alignSelf: 'center',
        fontSize: 22
    }
})

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