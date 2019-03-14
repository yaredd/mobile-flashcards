import React from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet} from 'react-native'
import { purple, white } from '../utils/colors'

export default function SubmitBtn ({ onPress, disabled }) {
    return (
        <TouchableOpacity style={ Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn }
            onPress={onPress} disabled={disabled}>
            <Text style={styles.submitBtnTxt}>Submit</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingRight: 30,
        paddingLeft: 30,
        borderRadius: 5,
        height: 45,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnTxt: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    }})