import React, {useEffect, useState} from 'react'
import {StyleSheet, View, Text, TouchableOpacity,Image, Platform} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'
import Empty from '../../common/Empty'
import {navigate} from '../../utils'
import apiRequest from "../../api";
import httpConfig from "../../api/httpConfig";

const FriendCard = ({item}) => (
    <View style={[styles.cardBox]}>
        <Image
            source={item.product.smallImageUrl ? {uri: httpConfig.mediaUrl+ item.product.smallImageUrl} : require('../../assets/images/shop/card.png')}
            style={styles.cardImg}/>
        <Text style={styles.friendcardName}>{item.product.productName}</Text>
        <Text style={styles.friendcardContent}>{item.product.comments}</Text>
        <View style={styles.handleLayer}>
            <View style={styles.left}>
                <Text style={styles.presentPriceSymbol}>¥<Text
                    style={styles.presentPrice}>{item.price + item.taxAmount}</Text></Text>
                <Text style={styles.originalPrice}>¥{item.product.productRating}</Text>
            </View>
            <View style={styles.right}>
                <TouchableOpacity onPress={() => navigate('FriendCardDetailScreen', {type: 'buying', item})}>
                    <Text style={[styles.btn, styles.givCard]}>赠送朋友</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('FriendCardDetailScreen', {type: 'buying', item})}>
                    <Text style={[styles.btn, styles.cardImmediately]}>立即办卡</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
)

const FriendCardListScreen = ({thatCd}) => {

    const [list, setList] = useState([])

    useEffect(() => {
        getShopFriendCards()
    }, [])

    const getShopFriendCards = async () => {
        let url = '/api/shop/card';
        const params = {thatCd:1001};
        const data = await apiRequest.get(url,params);
        setList(data|| [])
    }

    return (
        <FlatList
            data={list}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listViewStyle}
            renderItem={({item}) => <FriendCard item={item}/>}
            ListFooterComponent={() => <View style={styles.footer}/>}
            keyExtractor={(item, index) => `key-${index}`}
            ListEmptyComponent={
                <Empty title="没有朋友卡" style={{marginTop: 100}}/>
            }
        />
    )
}

const styles = StyleSheet.create({
    cardBox: {
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor:'#fff',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 6,
    },
    cardImg: {
        width: 160,
        height: 100,
        marginBottom: 18,
        alignSelf: 'center',
    },
    friendcardName: {
        color: '#333333',
        fontSize: 18,
        marginBottom: 8,
    },
    friendcardContent: {
        color: '#999999',
        fontSize: 13,
        lineHeight: 19,
    },
    handleLayer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    right: {
        flexDirection: 'row',
    },
    presentPriceSymbol: {
        fontSize: 14,
        fontFamily: Platform.OS === 'ios' ? null : '',
        color:'#FC5869',
    },
    presentPrice: {
        fontSize: 18,
    },
    originalPrice: {
        fontSize: 13,
        color: '#CCCCCC',
        marginLeft: 8,
        textDecorationLine: 'line-through',
        fontFamily: Platform.OS === 'ios' ? null : ''
    },
    btn: {
        paddingHorizontal: 8,
        paddingVertical: 7,
        borderRadius: 3,
        fontSize: 14,
        borderColor: '#FC5869',
        borderWidth: 1,
        overflow: 'hidden',

    },
    givCard: {
        color:'#FC5869',
        marginRight: 8,
    },
    cardImmediately: {
        backgroundColor:'#FC5869',
        color: '#fff',
    },
    footer: {
        height: 60,
    },
})


export default FriendCardListScreen
