import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import TextBtn from './TextBtn';
import { red, gray, green, white, blue } from '../utils/colors'
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
        const { showAnswer } = this.state

        let nextCardIndex = parseInt(cardIndex) + 1
        nextCardIndex = (nextCardIndex < parseInt(totalCards)) ? nextCardIndex : null
        let correctAnswerCounter = parseInt(correctAnswerCount)

        if (response === 'correct') {
           correctAnswerCounter = correctAnswerCounter + 1 
        }

        this.setState(() => ({showAnswer: false}))

        navigation.navigate('QuizView', { cardIndex: nextCardIndex, showAnswer: showAnswer, deckTitle: deckTitle, correctAnswerCount: correctAnswerCounter })

        //if reached the end of quiz
        if(nextCardIndex === null){
            clearLocalNotification()
                .then(setLocalNotification)
        }
    }


    render () {
        const { deckTitle,  cardIndex, totalCards, nextCardIndex, currentCard, navigation, correctAnswerCount } = this.props
        const { showAnswer } = this.state
        if (cardIndex === null || parseInt(cardIndex) >= parseInt(totalCards)){
            return (
                <View style={{ flex: 1 }}>
                    <Text style={styles.screenTitle}>You result on "{deckTitle}" quiz:</Text>
                    <Text style={{ fontSize: 28, margin: 10, alignSelf: 'center' }}>{correctAnswerCount} out of {totalCards} questions answered correctly.</Text>
                    <View style={styles.resultBtns}>
                        <TextBtn onPress={() => navigation.navigate('DeckDetail', {deckTitle})} style={styles.goBackBtn}>Back to Deck</TextBtn>
                        <TextBtn onPress={() => navigation.navigate('QuizView', { cardIndex: 0, showAnswer: false, deckTitle: deckTitle, correctAnswerCount: 0})} style={styles.restartBtn}>Restart Quiz</TextBtn>
                    </View>
                </View>
            )
        }

        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.screenTitle} >Quiz on {deckTitle}</Text>
                <Text style={{fontSize: 28}}>{parseInt(totalCards) - cardIndex - 1} of {totalCards} questions remaining</Text>
                { showAnswer === true ?
                    <View style={styles.question}>
                        <Text style={{fontSize: 24}}>Answer:</Text>
                        <Text style={{fontSize: 20}}>{currentCard.answer}</Text>
                        <TextBtn onPress={() => this.toggleShowAnswer()} style={{color: blue, fontSize: 15, margin: 20}}>Show Question</TextBtn>
                    </View> 
                : 
                    <View style={styles.question}>
                        <Text style={{fontSize: 24}}>Question:</Text>
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
    screenTitle: {
        fontSize: 24,
        alignSelf: 'center'
    },
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
    },
    question: {
        borderColor: gray,
        margin: 20,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    resultBtns: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around'
    },
    restartBtn: {
        color: red,
        fontSize: 14,
    },
    goBackBtn: {
        color: gray,
        fontSize: 14,
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