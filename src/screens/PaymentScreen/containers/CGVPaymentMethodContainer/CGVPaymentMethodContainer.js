import React, {useContext, useState} from 'react'
import {View, TouchableOpacity, StyleSheet, Switch, Platform, Text, Image} from 'react-native'
import SectionHeader from '../../../../common/SectionHeader'
import Card from '../../../../common/Card/Card'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {navigate, tools} from '../../../../utils'

const CGVPaymentMethodContainer = ({
                                       current,
                                       userInfo,
                                       list,
                                       usableMemberCards,
                                       getDscResult: _getDscResult
                                   }) => {
    const [isUseStarCard, setIsUseStarCard] = useState(false)

    const getDscRes = async () => {
        let obj = {
            coupons: [...current.ticketOrder.ticketCoupons],
            orderId: current.onlineOrderNo,
            orderChnl: '07',
            mbrNm: current.ticketOrder.memberCard.memberCardName,
            mbrCardNo: current.ticketOrder.memberCard.memberCardNo,
            mbrCardPrice: current.ticketOrder.memberCard.memberCardAmount,
            mbrCardType: current.ticketOrder.memberCard.memberCardType,
            mbrCardPwd: current.ticketOrder.memberCard.memberCardPassword,
            gftCardNm: current.paymentMethod.memberCard.cardName,
            gftCertNo: current.paymentMethod.memberCard.cardNo,
            gftAuthNo: current.paymentMethod.memberCard.cardType,
            gftCertPrice: current.paymentMethod.memberCard.paymentAmount,
            prods: current.productOrder.product.products.map(item => {
                item.qty = 1
                item.id = item.productCd
                item.prodCd = item.productId
                if (item.subProduct) {
                    item.subprods = item.subProduct.map(ite => {
                        ite.qty = 1
                        ite.id = ite.productCd
                        ite.prodCd = ite.productId
                        ite.productAssocCd = ite.productAssocCd
                        return ite
                    })
                }
                return item
            }),
            vouchers: current?.ticketOrder?.vouchers,
            eventNo: current?.ticketOrder?.specialPromo?.promoId,
            eventType: current?.ticketOrder?.specialPromo?.promoUseSeatNo,
        }
        if (isUseStarCard) {
            _getDscResult({...obj, pointUseYn: '0'})
        } else {
            try {
                _getDscResult({...obj, pointUseYn: '1'})
            } catch (error) {
                console.log(error)
            }
        }
    }

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
                        <Text type='subheading'
                              style={styles.discountName}>{current?.paymentMethod?.memberCard?.cardName}</Text>
                        <Text type='bodyheading'
                              style={styles.discountAmount}>{`-￥${current?.paymentMethod?.memberCard?.giftCardAmt}`}</Text>
                    </View>
                    : null}
            </>
        )
    }

    const PayPoint = () => {
        return (
            <>
                <View style={[styles.sectionHeader, {paddingTop: 10, marginBottom: 0}]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text type={'subheading'} bold>使用积分</Text>
                    </View>
                    <Switch
                        style={styles.switch}
                        value={isUseStarCard}
                        onValueChange={() => {
                            setIsUseStarCard(!isUseStarCard)
                            if (current?.totalAmount === 0 && !isUseStarCard) {
                                tools.alert('所需支付金额为0，无需选择积分！')
                                setIsUseStarCard(false)
                                return
                            }
                            if (!userInfo?.point) {
                                setIsUseStarCard(false)
                                return
                            }
                            getDscRes()
                        }}
                        trackColor={{true: '#FC5869', false: '#EFEFEF'}}
                        thumbColor="white"
                    />
                </View>
                <View>
                    {current?.paymentMethod?.point?.usableAmount > 0 && (
                        <View style={styles.discountLine}>
                            <Text type='subheading'
                                  style={styles.discountName}>{current?.paymentMethod?.point?.usablePoint}</Text>
                            <View style={styles.discountLine}>
                                <Text type='bodyheading'
                                      style={styles.discountAmount}>-¥{current?.paymentMethod?.point?.usableAmount}</Text>
                            </View>
                        </View>
                    )}
                    <Text type={'subheading'} style={{
                        width: '95%',
                        color: '#9e9e9e',
                        fontFamily: Platform.OS === 'ios' ? null : '',
                        fontSize: 12,
                        marginLeft: 10,
                    }}>{`可用积分${userInfo?.point ? userInfo?.point : 0}，${userInfo.point ? '最多可减' + (userInfo?.point / 10 > 100 ? 100 : userInfo?.point * 1000 / 10000) + '元，' : ''}积分满50可抵扣现金`}</Text>
                </View>
            </>
        )
    }

    const PayMemberCard = () => {

        return (
            <>
                <SectionHeader title="朋友卡余额支付" isRenderRight isRenderButton
                               onClick={() => navigate('ModalCGVPayScreen', {
                                   items: usableMemberCards,
                                   confirm: (data) => _getDscResult(data),
                                   status: 2,
                                   title: '使用朋友卡',
                                   addCard: false,
                                   mepty: '您还没有朋友卡～',
                               })}/>
                {current?.ticketOrder?.memberCard?.memberCardDiscountAmount ?
                    <View style={[styles.discountLine, {justifyContent: 'space-around'}]}>
                        <Text type='subheading'
                              style={styles.discountName}>{current?.ticketOrder?.memberCard?.memberCardName}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text type='bodyheading'
                                  style={[styles.discountName, {width: 20, textAlign: 'left'}]}>X1</Text>
                            <Text type='subheading' style={[styles.discountAmount, {
                                width: 100,
                                textAlign: 'right',
                            }]}>-￥{current?.ticketOrder?.memberCard?.memberCardDiscountAmount}</Text>
                        </View>
                    </View> : null}
            </>
        )
    }

    return (
        <View>
            <Card type="clear" style={styles.container}>
                {current?.ticketOrder?.ticket?.seats?.length && !current?.paymentMethod?.memberCard?.memberCardDiscountAmount ? null :
                    <PayMemberCard items={usableMemberCards}/>}
                {current?.ticketOrder?.ticket?.seats?.length && !current?.paymentMethod?.memberCard?.memberCardDiscountAmount ? null :
                    <View style={styles.detailLine}/>}
                {
                    list?.findIndex(item => item.kbn === 'except_yn' && item.useYn === '1') > -1 ?
                        <PayPoint items={userInfo}/>
                        : null}
            </Card>
            <View style={{
                backgroundColor: '#fff',
                borderTopLeftRadius: 7,
                borderTopRightRadius: 7,
                marginHorizontal: 10,
            }}>
                <View style={styles.whiteBoard}>
                    <SectionHeader title="支付方式" isRenderRight={false}/>
                    <View style={styles.detailLine}/>
                    <PayGiftCard items={current?.paymentMethod?.giftCard}/>
                </View>
                <View style={[styles.detailLine, {marginHorizontal: 10,}]}/>
            </View>
        </View>
    )
}

CGVPaymentMethodContainer.propTypes = {

}

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
    whiteBoard: {
        backgroundColor: '#fff',
        borderRadius: 5,
        overflow: 'hidden',
        paddingHorizontal: 10,
        paddingVertical: 12,
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
