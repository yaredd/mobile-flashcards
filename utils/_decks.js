export const FLASHCARD_STORAGE_KEY = 'MobileFlashcard:decks'

export function formatDecks(result) {
    //JSON.parse the result and make into 
    if (result === null){
        return {}
    }
    return JSON.parse(result)
}

export function deckFromTitle(title) {
    return {
        [title] : {
            title: title,
            cards: []
        }
    }
}