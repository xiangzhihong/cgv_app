import React from 'react'
import {StyleSheet, View, Image} from 'react-native'
import GoodInfo from '../../../common/GoodInfo/GoodInfo'
import httpConfig from "../../../api/httpConfig";

const Main = ({item, addUpdate}) => (
    <View style={styles.main}>
        <Image style={styles.cover} source={{uri: httpConfig.mediaUrl +item.mediumImageUrl}}/>
        <View style={styles.info}>
            <GoodInfo onLikePress={true} addFun={addUpdate} item={item} showTag={false} showPromotionText/>
        </View>
    </View>
)

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#fff',
        paddingBottom: 20,
    },
    cover: {
        height: 200,
        width: 200,
        marginVertical: 20,
        alignSelf: 'center',
    },
    info: {
        paddingHorizontal: 15,
    },
})

export default Main
