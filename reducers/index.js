import { RECEIVE_DECKS,
        GET_DECK,
        ADD_DECK,
        ADD_CARD_TO_DECK,
        REMOVE_DECK } from '../actions'

export default function decks(state={}, action) {
    switch(action.type){
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return {
                ...state,
                [action.deck.title]: action.deck
            }
        case ADD_CARD_TO_DECK:
            return {
                ...state,
                [action.deck.title]: { title: action.deck.title, cards: action.deck.cards.concat(action.card)}
            }
        case REMOVE_DECK:
            const {[action.deck.title]: _, ...rest} = state
            return rest
        default:
            state
    }
}