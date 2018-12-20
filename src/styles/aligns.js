import {
    StyleSheet
} from 'react-native'

export const aligns = StyleSheet.create({
    alignCenter: {
        alignItems: 'center'
    },
    alignEnd: {
        alignItems: 'flex-end'
    },
    alignStart: {
        alignItems: 'flex-start'
    },
    justifyCenter: {
        justifyContent: 'center'
    },
    justifyEnd: {
        justifyContent: 'flex-end'
    },
    justifyStart: {
        justifyContent: 'flex-start'
    },
    fillHeight: {
        height: '100%'
    },
    alignSelfStart: {
        alignSelf: 'flex-start'
    },
    alignSelfCenter: {
        alignSelf: 'center'
    },
    alignSelfEnd: {
        alignSelf: 'flex-end'
    },
    row: {
        flexDirection: 'row'
    },
    column: {
        flexDirection: 'column'
    },
})
