import { AsyncStorage } from 'react-native'
import { FLASHCARD_STORAGE_KEY, formatDecks, deckFromTitle } from './_decks.js'


export function getDecksFromDB() {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
            .then(formatDecks)
}

export function getSingleDeckFromDB(id) {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
        .then((result) => {
            const data = JSON.parse(result)
            return data[id]
        })
}

export function removeDeckFromDB(key) {
    AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
        .then((result) => {
            const data = JSON.parse(result)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data))
        })
}

export function addDeckToDB(title) {
    AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify(deckFromTitle(title)))
}

export function addCardToDeckToDB(title, card) {
    AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
        .then((result) => {
            const data = result
            data[title].cards.push(card)
            AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data))
        })
}
