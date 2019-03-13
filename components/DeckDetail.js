import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { removeDeck } from '../actions';
import { removeDeckFromDB } from '../utils/db';
import { connect } from 'react-redux'
import TextBtn from './TextBtn'

class DeckDetail extends Component {

    removeDeck () {
        const { deckTitle, goBack, remove } = this.props
        removeDeckFromDB(deckTitle)
        remove()
        goBack()

    }

    render () {
        const { deckTitle, decks } = this.props
        return (
            <View>
                <Text>Deck Detail</Text>
                <Text style={{fontSize: 24 }}>{deckTitle}</Text>
                <Text style={{fontSize: 16 }}>{decks[deckTitle].cards.length} Cards</Text>
                <TextBtn style={{fontSize: 16}} onPress={this.removeDeck}>Delete Entry</TextBtn>
            </View>
        )
    }
}

const mapStateToProps = (state, {navigation}) => {
    const { deckTitle } = navigation.state.params
    return {
        deckTitle,
        decks: state
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