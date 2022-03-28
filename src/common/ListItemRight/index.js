import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

const ListItemRight = ({placeHolder = '', value = '', showArrow = true, renderBeforeValue}) => (
    <View style={styles.right}>
        {renderBeforeValue && renderBeforeValue()}
        {value ? <Text style={styles.value}>{value}</Text> : <Text style={styles.placeHolder}>{placeHolder}</Text>}
        {showArrow && <Icon name="chevron-thin-right" color="#ccc" size={16}/>}
    </View>
)

const styles = StyleSheet.create({
    right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    value: {
        fontSize: 14,
        color: '#777',
        marginRight: 3,
    },
    placeHolder: {
        fontSize: 14,
        color: '#999',
        marginRight: 3,
    },
})

export default ListItemRight
