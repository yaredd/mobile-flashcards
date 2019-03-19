import React, { Component } from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { getDecksFromDB } from '../utils/db'
import { getDecks } from '../actions';
import { AppLoading } from 'expo'
import DeckView from './DeckView'
import { white, gray } from '../utils/colors'

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
            <ScrollView style={styles.container}>
                <Text style={{ fontSize: 24, alignSelf: 'center'}}>Click on deck</Text>
                {Object.keys(decks).map((deckTitle) => (
                    <DeckView key={deckTitle} deckTitle={deckTitle} navigation={this.props.navigation} />
                ))}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: white,
    },
    deck: {
        borderWidth: 2,
        borderColor: gray,
        padding: 40,
        margin: 20,
        alignSelf: 'center'
    }
  })

function mapStateToProps(state) {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(Decks)