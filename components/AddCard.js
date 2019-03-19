import React, { Component } from 'react'
import { StyleSheet, View, Platform, Text, TextInput } from 'react-native'
import SubmitBtn from '../components/SubmitBtn'
import { connect } from 'react-redux'
import { addCardToDeck } from '../actions';
import { cardFromQuestionAnswer } from '../utils/_decks';
import { addCardToDeckToDB } from '../utils/db';
import { white, gray } from '../utils/colors'

class AddCard extends Component {
    state = {
        newQuestion: '',
        newAnswer: ''
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: Platform.OS === 'ios' ? "" : navigation.getParam('deckTitle')
        }
    }

    submit = () => {
        const { dispatch, deckTitle, goBack, cardAdded } = this.props
        const { newQuestion, newAnswer } = this.state
        const newCard = cardFromQuestionAnswer({question: newQuestion, answer: newAnswer})
        //update redux
        dispatch(addCardToDeck(deckTitle, newCard))

        //reset state
        this.setState({ newAnswer: '', newQuestion: '' })

        //update DB
        addCardToDeckToDB(deckTitle, newCard)

        //update state in DeckDetail
        cardAdded()

        //goBack
        goBack()
    }

    render () {
        const { newQuestion, newAnswer } = this.state
        return (
            <View>
                <Text style={styles.screenTitle}>Add Card</Text>
                <TextInput style={styles.inputText}
                  placeholder="Type the Question"
                  onChangeText={(inputText) => this.setState({newQuestion: inputText})} value={newQuestion} />
                <TextInput style={styles.inputText}
                  placeholder="Type the Answer"
                  onChangeText={(inputText) => this.setState({newAnswer: inputText})} value={newAnswer} />
                <SubmitBtn onPress={this.submit} disabled={ newQuestion.length === 0 || newAnswer.length === 0} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    screenTitle: {
        fontSize: 24,
        alignSelf: 'center'
    },
    inputText: {
        height: 40, 
        margin: 20,
        borderColor: gray,
        borderWidth: 1
    }
})

function mapStateToProps(state, { navigation }) {
    const { deckTitle } = navigation.state.params
    return {
        deckTitle,
    }
}

function mapDispatchToProps(dispatch, { navigation }) {
    const { deckTitle, cardAdded } = navigation.state.params
    return {
        goBack: () => navigation.goBack(),
        cardAdded: () => cardAdded(),
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)