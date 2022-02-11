import React from 'react'
import {View, StyleSheet, Text, Button, TouchableOpacity} from 'react-native'
import {tools} from '../../utils'

export default (
    {
        fromTime = '10:00',
        endTime = '11:00',
        desc = '中文/2D',
        room = '1号厅',
        buttonTitle = '购票',
        oldPrice = 80,
        newPrice = 40,
        isDiscount = false,
        onPress,
        data,
        cardAmt = 19,
        index,
    },
) => {
    const {activity = '0', bktAmt, minDscAmt, withCardDscAmt, noCardDscAmt} = data

    const getPrice = () => {
        let baseprice = null
        let cardprice = null
        if (activity === '1') {

            baseprice = (noCardDscAmt < bktAmt && noCardDscAmt > 0) ? noCardDscAmt : bktAmt;
            cardprice = (withCardDscAmt < bktAmt && withCardDscAmt > 0) ? withCardDscAmt : (cardAmt < bktAmt && cardAmt > 0 ? cardAmt : bktAmt);
        } else {
            baseprice = bktAmt;
            cardprice = cardAmt;

        }
        return {
            baseprice: baseprice,
            cardprice: cardprice,
        }

    }

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={() => onPress(data, index)}>
            <View style={[styles.box, {borderBottomColor: '#e5e5e5'}]}>
                <View style={styles.row}>
                    <View>
                        <Text type="heading">{fromTime}</Text>
                        <Text>{endTime}散场</Text>
                    </View>
                    <View style={{marginLeft: 20}}>
                        <Text type="label" style={{color: '#222'}}>{desc}</Text>
                        <Text style={{maxWidth: 100, fontSize: 12}}>{room}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View>
                        <View style={[styles.row, {alignItems: 'flex-end'}]}>
                            <Text style={styles.oldPrice}>￥{oldPrice}</Text>
                            <Text style={{color: '#FC5869'}}>￥{getPrice().baseprice}</Text>
                        </View>
                        {
                            getPrice().baseprice > getPrice().cardprice && getPrice().cardprice > 0 ?
                                <View style={styles.infoContainer}>
                                    <View style={[styles.info, {backgroundColor: '#F1A23D'}]}>
                                        <Text style={{color: '#fff', fontSize: 12}}>E优卡</Text>
                                    </View>
                                    <View style={styles.info}>
                                        <Text style={{color: '#F1A23D'}}>￥{getPrice().cardprice}</Text>
                                    </View>
                                </View>
                                : null
                        }
                    </View>

                    <TouchableOpacity onPress={() => {
                        onPress(data, index)
                    }}>
                        <Text
                            style={[styles.button, {backgroundColor: isDiscount ? '#F1A23D' : '#FC5869'}]}> {buttonTitle} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingLeft: 15,
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        paddingVertical: 14,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    oldPrice: {
        textDecorationLine: 'line-through',
        color: '#ccc',
    },
    button: {
        padding: 0,
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 12,
        marginHorizontal: 15,
        color: '#fff'
    },
    infoContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#F1A23D'
    },
    info: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})
