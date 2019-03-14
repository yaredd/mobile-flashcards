import React, { Component } from 'react'
import { View, Text } from 'react-native'
import SubmitBtn from '../components/SubmitBtn'

class AddCard extends Component {
    state = {
        textInput: ''
    }

    render () {
        return (
            <View>
                <Text>Add Card</Text>
            </View>
        )
    }
}

export default AddCard