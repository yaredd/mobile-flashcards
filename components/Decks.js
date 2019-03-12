import React, { Component } from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { getDecksFromDB } from '../utils/db'
import { getDecks } from '../actions';
import { AppLoading } from 'expo'
import DeckView from './DeckView'

class Decks extends Component {

    state = {
        ready: false
    }

    componentDidMount () {
        const { dispatch } = this.props
        //get entries from AsyncStorage add to Redux store
        getDecksFromDB().then((result) => dispatch(getDecks(result))) 
            .then(({ decks }) => this.setState({ready: true}))
    }

    render () {
        const { ready } = this.state
        const { decks } = this.props
        if (ready === false){
            return (
                <AppLoading />
            )
        }

        if (Object.keys(decks).length === 0 ){
            return <Text>No Decks to show! Click on Add Deck.</Text>
        }


        return (
            <ScrollView style={{ flex: 1 }}>
                <Text>All the decks</Text>
                {Object.keys(decks).map((deckTitle) => (
                    <DeckView key={deckTitle} deckTitle={deckTitle} />
                ))}
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(Decks)