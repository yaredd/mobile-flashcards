import React, { Component } from 'react'
import { StyleSheet, Platform, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { addDeckToDB } from '../utils/db';
import { connect } from 'react-redux'
import { addDeck } from '../actions';
import { deckFromTitle } from '../utils/_decks';
import { purple, white } from '../utils/colors'

function SubmitBtn ({ onPress, disabled }) {
    return (
        <TouchableOpacity style={ Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn }
            onPress={onPress} disabled={disabled}>
            <Text style={styles.submitBtnTxt}>Submit</Text>
        </TouchableOpacity>
    )
}

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
            <View style={styles.container}>
                <Text>What is the title of the Deck?</Text>
                <TextInput style={{height: 20, }}
                  placeholder="Type the title of the new deck"
                  onChangeText={(inputText) => this.setState({newTitle: inputText})} value={newTitle} />
                <SubmitBtn onPress={this.submit} disabled={ newTitle.length === 0 || this.alreadyExists()} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingRight: 30,
        paddingLeft: 30,
        borderRadius: 5,
        height: 45,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnTxt: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    }
})

function mapStateToProps(state) {
    return {
        decks: state
    }
}
export default connect(mapStateToProps)(Deck)