import React, { Component } from 'react'
import { StyleSheet, Platform, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { addDeckToDB } from '../utils/db'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { deckFromTitle } from '../utils/_decks'
import SubmitBtn from '../components/SubmitBtn'
import { white, gray } from '../utils/colors'

class Deck extends Component {
    state = {
        newTitle: ''
    }
    
    submit = () => {
        const { newTitle } = this.state
        //update redux
        this.props.dispatch(addDeck(deckFromTitle(newTitle)))

        //reset state
        this.setState({newTitle: ''})

        //update DB
        addDeckToDB(newTitle)

        //go Home
        this.props.navigation.goBack()        
    }

    alreadyExists = () => {
        const { decks } = this.props
        const { newTitle } = this.state
        return decks[newTitle] !== undefined 
    }

    render () {
        const { newTitle } = this.state
        const { alreadyExists } = this.props

        return (
            <View>
                <Text style={styles.screenTitle}>What is the title of the Deck?</Text>
                <TextInput style={styles.inputText}
                  placeholder="Type the title of the new deck"
                  onChangeText={(inputText) => this.setState({newTitle: inputText})} value={newTitle} />
                <SubmitBtn onPress={this.submit} disabled={ newTitle.length === 0 || this.alreadyExists()} />
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

function mapStateToProps(state) {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(Deck)