import React from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet, Dimensions} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import {navigate} from '../../../../utils'
import httpConfig from "../../../../api/httpConfig";

const ShopProductItem = ({
                             item,
                             add,
                             goAdd
                         }) => {
    const CountBtns = () => (
        <>
            <TouchableOpacity onPress={() => {
                item.isVirtual === '1' ? navigate('GoodDetailScreen', {
                    type: 'movie',
                    where: 'detail',
                    item,
                    update: (i) => goAdd(i)
                }) : add()
            }}>
                <AntDesign name="pluscircle" size={18} color={'#FC5869'} style={styles.plusIconStyle}/>
            </TouchableOpacity>
        </>
    )

    return (
        <TouchableOpacity style={styles.topicItem} onPress={() => navigate('GoodDetailScreen', {
            type: 'movie',
            where: 'detail',
            item,
            update: (i) => goAdd(i)
        })}>
            <Image style={styles.goodPic}
                   source={{uri: httpConfig.mediaUrl + item.smallImageUrl}}
            />
            <View style={styles.productNameContainer}>
                {item?.productName ? <Text numberOfLines={1} type='bodySmall'
                                           style={styles.productName}>{item?.productName}</Text> : null}
            </View>
            <View style={styles.priceLayer}>
                {/* <Text allowFontScaling={false} style={styles.redText}>¥<Text allowFontScaling={false} style={styles.price}>{item.price}</Text></Text> */}
                <Text type='body' allowFontScaling={false} style={styles.redText}>¥<Text type='bodyHeading'
                                                                                         allowFontScaling={false}
                                                                                         style={styles.redText}>{item.price}</Text></Text>
                <Text type='body' allowFontScaling={false}
                      style={styles.originalPrice}>¥{parseFloat(item.guidePrice)}</Text>
                <CountBtns/>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    topicItem: {
        width: 100,
        height: 125,
        marginRight: 8,
        borderRadius: 3,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    goodPic: {
        width: 60,
        height: 60,
        marginTop: 4,
        marginLeft: 16,
        alignItems: 'center',
    },
    productNameContainer: {
        overflow: 'hidden',
    },
    productName: {
        alignSelf: 'flex-start',
        marginTop: 12,
        color: '#222222',
        paddingLeft: 8,
        width: 100,
        overflow: 'hidden',
    },
    priceLayer: {
        marginTop: 5,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingLeft: 8
    },
    redText: {
        color: '#FC5869',
    },
    price: {
        fontSize: 29,
    },
    originalPrice: {
        color: '#ccc',
        textDecorationLine: 'line-through',
        marginLeft: 4
    },
    plusIconStyle: {
        paddingLeft: 10,
        paddingRight: 15,
        paddingTop: 2,
        paddingBottom: 14,
    },
});

export default ShopProductItem;
