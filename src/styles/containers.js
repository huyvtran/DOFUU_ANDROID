import {
    StyleSheet, Dimensions
} from 'react-native'

var {width, height} = Dimensions.get('window')

export const styles = StyleSheet.create({
    container: {
        flex           : 1,
        backgroundColor: '#E0E0E0'
    },
    cardRadius: {
        borderRadius: 8
    },
    cardHeader: {
        borderTopLeftRadius    : 8,
        borderTopRightRadius   : 8,
        borderBottomLeftRadius : 0,
        borderBottomRightRadius: 0,
    },
    cardFooter: {
        borderTopLeftRadius    : 0,
        borderTopRightRadius   : 0,
        borderBottomLeftRadius : 8,
        borderBottomRightRadius: 8,
    },
    avatar: {
        margin: 2
    },
    iconSize: {
        fontSize: 20
    },
    rounded: {
        borderRadius: 22
    },
    circle: {
        borderRadius: 50
    },
    raised: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderRadius     : 2,
        borderColor      : '#ccc',
        shadowColor      : "#000",
        shadowOffset     : { width: 0, height: 2 },
        shadowOpacity    : 0.1,
        shadowRadius     : 1.5,
        elevation        : 3
    },
    map: {
        position: 'absolute',
        top     : 0,
        left    : 0,
        right   : 0,
        bottom  : 0,
    },
})
