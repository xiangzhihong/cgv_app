import React, {useEffect,} from 'react'
import {Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {tools} from '../../../../utils'
import {goBack} from '../../../../utils/rootNavigation'

const {width} = Dimensions.get('window')

const SpecialPromoItem = ({
                              items,
                              current,
                              onPress,
                              resetCheckoutCouponState: _resetCheckoutCouponState
                          }) => {

    useEffect(() => {
        if (items && items.length > 0) {
            if (items[0].postVerify === 200) {
                getPrice(items[0].id, items[0].productPromoTypeId, items[0].dscKnd, items[0].promoName)
            } else {
                tools.Toast.toast(items[0].postVerifyMsg, 1)
                // tools.Toast.toast("您要参与的活动名额已用完，请选择其他优惠。", 1)
            }
        }

    }, [])

    const [selectedId, setSelectedId] = React.useState(current?.ticketOrder?.specialPromo?.promoId || (items && items.length > 0 && items[0].id))

    const getPrice = (id, type, status, name) => {
        let prodcutList = []
        current.productOrder.product.products.map((data) => {
            let o = {}
            if (data.subProduct && data.subProduct.length > 0) {
                o = {
                    id: data.productCd,
                    prodCd: data.productId,
                    qty: data.quantity,
                    subprods: data.subProduct.map((ite) => {
                        return {
                            id: ite.productCd,
                            prodCd: ite.productId,
                            qty: ite.quantity,
                            productAssocCd: ite.productAssocCd,
                        }
                    }),
                }
            } else {
                o = {
                    id: data.productCd,
                    prodCd: data.productId,
                    qty: data.quantity,
                }
            }
            for (let i = data.quantity; i > 0; i--) {
                prodcutList.push(o)
            }
        })
        //清理以选择的优惠券 代金券
        //当选择的活动为21的时候清理已经选择朋友卡
        _resetCheckoutCouponState()
        let obj = {
            orderChnl: '07',
            pointUseYn: current.paymentMethod.point.useYn,
            orderId: current.onlineOrderNo,
            coupons: current?.ticketOrder?.ticketCoupons?.filter(ite => ite.DSC_TYP_CD === '02'),
            prods: prodcutList,
            mbrNm: status === '21' ? null : current.paymentMethod.memberCard.memberCardName,
            mbrCardNo: status === '21' ? null : current.paymentMethod.memberCard.memberCardNo,
            mbrCardPrice: status === '21' ? null : current.paymentMethod.memberCard.memberCardAmount,
            mbrCardType: status === '21' ? null : current.paymentMethod.memberCard.memberCardType,
            mbrCardPwd: status === '21' ? null : current.paymentMethod.memberCard.memberCardPassword,
            gftCardNm: current.paymentMethod.memberCard.cardName,
            gftCertNo: current.paymentMethod.memberCard.cardNo,
            gftAuthNo: current.paymentMethod.memberCard.cardType,
            gftCertPrice: current.paymentMethod.memberCard.paymentAmount,
            vouchers: [],
            eventNo: id ? id : null,
            eventType: id ? type : null,
            eventStatus: id ? status : null,
            eventPromoName: id ? name : null,
        }
        onPress(obj)
    }
    // 特惠活动 dsc_auth_no 是空的
    return (
        <View>
            <Text style={styles.sectionTitle} type="subheading" bold>特惠活动</Text>
            {items && items.length > 0 && items.map((item, index) => (
                <View style={styles.discountLine} key={index}>
                    <TouchableOpacity
                        onPress={() => {
                            if (item.postVerify === 500) {
                                tools.Toast.toast(item.postVerifyMsg, 1)
                                return;
                            }
                            setSelectedId(item.id)
                            if (item.id && (current?.ticketOrder?.vouchers?.length > 0 || current?.ticketOrder?.ticketCoupons?.filter(ite => ite.DSC_TYP_CD === '01')?.length > 0 ||
                                (current.ticketOrder.memberCard.memberCardNo && current?.ticketOrder?.specialPromo?.promoStatus !== '24'))) {
                                tools.alert(`特惠活动与其他优惠方式不可同时使用，是否其他优惠方式活动？`, '温馨提示', [{
                                    text: '取消', style: 'cancel', onPress: () => {
                                        goBack()
                                    }
                                }, {
                                    text: '确定', onPress: () => {
                                        goBack()
                                        getPrice(item.id, item.productPromoTypeId, item.dscKnd, item.promoName)
                                    }
                                }], {}, '', false)
                            } else {
                                getPrice(item.id, item.productPromoTypeId, item.dscKnd, item.promoName)
                            }
                        }}
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            marginTop: 10,
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {(current?.ticketOrder?.specialPromo?.promoId && selectedId === item.id) || current?.ticketOrder?.specialPromo?.promoId === item.id ?
                                <Image style={{width: 16, height: 16}}
                                       source={require('../../../../assets/images/common/check.png')}/>
                                : <Image style={{width: 16, height: 16}}
                                         source={require('../../../../assets/images/common/uncheck.png')}/>}
                            <Text numberOfLines={1}
                                  styles={{fontSize: 13, width: '80%'}}>&nbsp;&nbsp;{item.promoName}</Text>
                        </View>
                        {current?.ticketOrder?.specialPromo?.promoId && item.id && current?.ticketOrder?.ticketTotal?.details?.length ?
                            <Text style={{
                                fontSize: 11,
                                fontFamily: Platform.OS === 'ios' ? null : '',
                                color: '#6e6e6e'
                            }}>*{current?.ticketOrder?.ticketTotal?.details?.length}</Text> : null}
                        {current?.ticketOrder?.specialPromo?.promoId && item.id && current?.ticketOrder?.specialPromo?.promoAmount ?
                            <Text
                                style={styles.discountAmount}>-￥{current?.ticketOrder?.specialPromo?.promoAmount}</Text> : null}
                    </TouchableOpacity>

                </View>
            ))}
            <View style={styles.detailLine}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    sectionTitle: {
        color: '#222',
    },
    discountLine: {
        height: 29,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 18
    },
    discountName: {
        width: 180,
        height: 29,
        lineHeight: 29,
        color: '#777',
    },
    discountAmount: {
        width: 50,
        height: 29,
        lineHeight: 29,
        textAlign: 'right',
        color: '#F1A23D',
        marginRight: 5,
    },
    checkboxStyle: {
        height: 16,
        width: 16
    },
    detailLine: {
        width: width - 22,
        height: 1.5,
        backgroundColor: '#EFEFEF',
        left: -10,
        marginTop: 10,
        marginBottom: 10
    },
})

export default SpecialPromoItem
