import React from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'

const HotTitle = ({title, isHot}) => {
    return isHot ?
        <View style={styles.hotTitle}>
            <Image source={require('../../../assets/images/shop/hot.png')} style={styles.hot}/>
            <Text style={styles.title}>{title}</Text>
        </View> : <Text style={styles.title}>{title}</Text>
}

const styles = StyleSheet.create({
    hotTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        textColor: '#777',
        fontSize: 12,
        paddingTop: 2,
    },
    hot: {
        height: 14,
        width: 14,
    },
})

export default HotTitle
