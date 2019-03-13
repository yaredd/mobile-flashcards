export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const GET_DECK = 'GET_DECK'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'

export function getDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }    
}

export function getDeck(deckTitle) {
    return {
        type: GET_DECK,
        deckTitle
    }
}

export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function addCardToDeck(deck, card) {
    return {
        type: ADD_CARD_TO_DECK,
        deck,
        card
    }
}

export function removeDeck(deckTitle) {
    return {
        type: REMOVE_DECK,
        deckTitle
    }
}