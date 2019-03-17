import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import TextBtn from './TextBtn';
import { red, gray, green, white } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

class QuizView extends Component {
    state = {
        showAnswer: false,
    }

    toggleShowAnswer = () => {
        this.setState((state) => ({showAnswer: !state.showAnswer}))
    }

    handleResponse = (response) => {
        const { correctAnswerCount, navigation, cardIndex, totalCards, deckTitle } = this.props

        let nextCardIndex = parseInt(cardIndex) + 1
        nextCardIndex = (nextCardIndex < parseInt(totalCards)) ? nextCardIndex : null
        let correctAnswerCounter = parseInt(correctAnswerCount)

        if (response === 'correct') {
           correctAnswerCounter = correctAnswerCounter + 1 
        }

        navigation.navigate('QuizView', { cardIndex: nextCardIndex, showAnswer: false, deckTitle: deckTitle, correctAnswerCount: correctAnswerCounter })
        //if reached the end of quiz
        if(nextCardIndex === null){
            clearLocalNotification()
                .then(setLocalNotification)
        }
    }


    render () {
        const { deckTitle,  cardIndex, totalCards, currentCard, navigation, correctAnswerCount } = this.props
        const { showAnswer } = this.state
        if (cardIndex === null || parseInt(cardIndex) >= parseInt(totalCards)){
            return (
                <View>
                    <Text>You result</Text>
                    <Text>{correctAnswerCount} out of {totalCards} questions</Text>
                    <TextBtn onPress={() => navigation.navigate('DeckDetail', {deckTitle})} style={{color: gray, fontSize: 14}}>Go Back</TextBtn>
                </View>
            )
        }

        return (
            <View style={{ flex: 1 }}>
                <Text style={{fontSize: 28}}>Cards in deck: {deckTitle}. {correctAnswerCount} of {totalCards} answered correctly</Text>
                { showAnswer === true ?
                    <View>
                        <Text style={{fontSize: 24}}>Answer</Text>
                        <Text style={{fontSize: 20}}>{currentCard.answer}</Text>
                        <TextBtn onPress={() => this.toggleShowAnswer()} style={{color: red, fontSize: 15, margin: 20}}>Show Question</TextBtn>
                    </View> 
                : 
                    <View>
                        <Text style={{fontSize: 24}}>Question</Text>
                        <Text style={{fontSize: 20}}>{currentCard.question}</Text>
                        <TextBtn onPress={() => this.toggleShowAnswer()} style={{color: red, fontSize: 15, margin: 20}}>Show Answer</TextBtn>
                    </View> 
                }
                <TouchableOpacity style={Object.assign({backgroundColor: green, marginBottom: 10 }, Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn) }
                                onPress={() => this.handleResponse('correct')}>
                    <Text style={styles.btnTxt}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Object.assign({backgroundColor: red, marginTop: 10 }, Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn) }
                                onPress={() => this.handleResponse('incorrect')}>
                    <Text style={styles.btnTxt}>Incorrect</Text>
                </TouchableOpacity>
                <TextBtn onPress={() => navigation.navigate('DeckDetail', {deckTitle})} style={{color: gray, fontSize: 14, margin: 20}}>Cancel Quiz</TextBtn>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    iosBtn: {
        borderRadius: 7,
        height: 50,
        marginLeft: 40,
        marginRight: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    androidBtn: {
        borderRadius: 5,
        height: 50,
        marginLeft: 40,
        marginRight: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTxt: {
        color: white,
        fontSize: 32,
        textAlign: 'center'
    }
})

function mapStateToProps(state, { navigation }) {
    const { deckTitle, cardIndex, showAnswer, correctAnswerCount } = navigation.state.params
    const cardsInDeck = state[deckTitle].cards
    const currentCard = cardsInDeck[parseInt(cardIndex)]
    return {
        deckTitle,
        cardIndex,
        totalCards: cardsInDeck.length,
        currentCard,
        correctAnswerCount,
        navigation
    }
}

export default connect(mapStateToProps)(QuizView)