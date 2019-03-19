import React from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { white, gray } from '../utils/colors';

const DeckView = ({ deckTitle, decks, navigation }) => {
    return (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('DeckDetail', {deckTitle})}>
            <Text style={{fontSize: 24, alignSelf: 'center'}}>{deckTitle}</Text>
            <Text style={{fontSize: 16, alignSelf: 'center'}}>{decks[deckTitle].cards.length} Cards</Text>
        </TouchableOpacity>
    )
}

const mapStateToProps = (state, { deckTitle }) => {
    return {
        decks: state,
        deckTitle
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
    }
})

export default connect(mapStateToProps)(DeckView)