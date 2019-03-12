import React from 'react' 
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { red } from '../utils/colors';

export default function TextBtn ({ children, onPress, style={} }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[styles.reset, style]}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    reset: {
        color: red,
        textAlign: 'center'
    }
})