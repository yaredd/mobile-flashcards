import React, { Component } from 'react'
import { View, Text } from 'react-native'

class QuizView extends Component {
    state = {
        showAnswer: false,
        
    }
    render () {
        return (
            <View>
                <Text>Quiz View</Text>
            </View>
        )
    }
}

export default QuizView