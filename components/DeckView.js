import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux';

const DeckView = ({ deckTitle, decks }) => {
    return (
        <View>
            <Text style={{fontSize: 24}}>{deckTitle}</Text>
            <Text style={{fontSize: 16}}>{decks[deckTitle].cards.length} Cards</Text>
        </View>
    )
}

const mapStateToProps = (state, { deckTitle }) => {
    return {
        decks: state,
        deckTitle
    }
}

export default connect(mapStateToProps)(DeckView)