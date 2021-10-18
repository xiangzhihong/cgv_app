import React from 'react'
import {View, StyleSheet, Image, Text, ImageBackground, TouchableOpacity, Dimensions} from 'react-native'
import {tools} from '../../../../utils'
import {lowerlove, lowlove, love, mostlove} from '../../../../assets/images/mine'
import httpConfig from "../../../../api/httpConfig";

const {width} = Dimensions.get('window');

const LOVE_LEVEL_IMG_MAP = {
    '01': lowerlove,
    '02': lowlove,
    '03': love,
    '04': mostlove,
}

const LOVE_LEVEL_NAME_MAP = {
    '01': '初心',
    '02': '动心',
    '03': '知心',
    '04': '衷心',
}

const PromotionBanner = ({item, onItemClick}) => {

    const {promoName, promoText, fromDate, thruDate, userLevelLimit} = item

    const renderMemberIcon = () => {
        const defaultLevels = ['01', '02', '03', '04']
        let arr = userLevelLimit.split(',')
        if (userLevelLimit === '') {
            arr = defaultLevels
        }
        return arr.map(code => {
            const name = LOVE_LEVEL_NAME_MAP[code]
            if (name) {
                return (
                    <View key={code} style={styles.heartBox}>
                        <Image style={styles.heartImg} source={LOVE_LEVEL_IMG_MAP[code]}/>
                        <Text style={styles.heartText}>{name}</Text>
                    </View>
                )
            }
            return null
        })
    }

    return (
        <TouchableOpacity onPress={onItemClick}>
            <ImageBackground
                style={styles.imageStyle}
                resizeMode="stretch"
                source={{uri:httpConfig.baseUrl+promoText}}/>
            <View style={styles.content}>
                <Text>{promoName}</Text>
                <View style={styles.rowBox}>
                    <Text>{tools.formatDate(fromDate)} ~ {tools.formatDate(thruDate)}</Text>
                    <View style={styles.hearts}>{renderMemberIcon()}</View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
    rowBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    imageStyle: {
        height: 165,
        width:width,
    },
    positionBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    hearts: {
        flexDirection: 'row',
    },
    heartBox: {
        marginLeft: 8,
        alignItems: 'center',
        flexDirection: 'row',
    },
    heartImg: {
        width: 12,
        height: 10,
    },
    heartText: {
        color: '#FC5869',
        fontSize: 12,
        marginLeft: 4,
    },
})

export default PromotionBanner
