import React from 'react'
import {View, FlatList, Text, StyleSheet, Image, ImageBackground} from 'react-native'
import httpConfig from "../../../api/httpConfig";

const Pic = ({url, isVideo = false}) => (
    <ImageBackground
        style={styles.pic}
        source={{uri: httpConfig.mediaUrl + url}}>
        {isVideo &&
        <Image style={{width: 30, height: 30}} source={require('../../../assets/images/shop/paused.png')}/>}
    </ImageBackground>
)

const Pictures = ({list = []}) => {
    if (!list.length) {
        return null
    }
    return (
        <View style={styles.pictures}>
            <Text style={styles.title}>商品详细照片</Text>
            <FlatList
                data={list}
                keyExtractor={item => item}
                renderItem={({item}) => <Pic url={item}/>}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    pictures: {
        backgroundColor: '#fff',
        marginTop: 10,
        paddingVertical: 15,
        paddingLeft: 15,
    },
    title: {
        fontSize: 15,
        marginBottom: 12,
    },
    pic: {
        width: 100,
        height: 100,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    paused: {
        height: 30,
        width: 30,
    },
})

export default Pictures
