import React, {useContext, useState} from 'react'
import {View, TouchableOpacity, StyleSheet, Platform, Text, Image} from 'react-native'
import SectionHeader from '../../../../common/SectionHeader'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {navigate, tools} from '../../../../utils'

const CGVPaymentMethodContainer = ({
                                       current,
                                       getDscResult: _getDscResult
                                   }) => {

    const PayGiftCard = () => {
        return (
            <>
                <TouchableOpacity style={styles.row2} onPress={() =>
                    navigate('ModalCGVPayScreen', {
                        confirm: (data) => _getDscResult(data),
                        status: 3,
                        title: '使用星意卡',
                        addCardTitle: '添加星意卡',
                        mepty: '您还没有星意卡～',
                    })}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={styles.cardImg} source={require('../../../../assets/images/pay/xycard.png')}/>
                        <Text style={{fontSize: 15, color: '#181818'}}>星意卡余额支付</Text>
                    </View>
                    <AntDesign name="right" style={styles.rightIcon}/>
                </TouchableOpacity>
                {current?.paymentMethod?.memberCard?.giftCardAmt ? <View style={styles.sectionHeader}>
                        <Text style={styles.discountName}>{current?.paymentMethod?.memberCard?.cardName}</Text>
                        <Text style={styles.discountAmount}>{`-￥${current?.paymentMethod?.memberCard?.giftCardAmt}`}</Text>
                    </View>
                    : null}
            </>
        )
    }
    return (
        <View style={styles.payType}>
            <SectionHeader title="支付方式" isRenderRight={false}/>
            <View style={styles.detailLine}/>
            <PayGiftCard items={current?.paymentMethod?.giftCard}/>
        </View>
    )
}

CGVPaymentMethodContainer.propTypes = {}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        padding: 12,
    },
    discountLine: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
    },
    discountName: {
        width: 180,
        height: 29,
        lineHeight: 29,
        color: '#777',
        fontFamily: Platform.OS === 'ios' ? null : '',
    },
    discountAmount: {
        height: 29,
        lineHeight: 29,
        textAlign: 'right',
        color: '#F1A23D',
        marginRight: 5,
        fontFamily: Platform.OS === 'ios' ? null : '',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    moreBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    moreText: {
        color: '#999',
    },
    rightIcon: {
        color: '#ccc',
        fontSize: 15,
    },
    payType: {
        backgroundColor: '#fff',
        borderRadius: 5,
        overflow: 'hidden',
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        marginHorizontal: 10,
    },
    detailLine: {
        height: 1,
        backgroundColor: '#EFEFEF',
    },
    row2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 5,
    },
    cardImg: {
        width: 30,
        height: 24,
        marginRight: 10,
    },
})

export default CGVPaymentMethodContainer;
