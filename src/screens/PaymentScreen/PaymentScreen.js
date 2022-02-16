import React, {useEffect, useRef, useState} from 'react'
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import Card from '../../common/Card/Card'
import {aliPay, UPPay, Wxpay} from '../../nativeBridge/pay'
import {
    CGVPaymentMethodContainer,
    PaymentBannerContainer,
    ShopContainer,
    ShopCouponContainer,
    ThirdPaymentContainer,
    TicketSummaryContainer,
    TicketTotalContainer,
    TopMessageContainer,
    VoucherContainer,
    PayBottomContainer
} from './containers'
import {PaymentBottomBtn} from './components'
import {tools} from '../../utils'
import {goBack} from '../../utils/rootNavigation'
import couponPoint from '../../mock/coupon.json'
import apiRequest from "../../api";

const endTime = new Date().getTime() + (14 * 60 + 59) * 1000  //倒计时截止时间

const PaymentScreen = ({
                           route,
                           current,
                           selectedCinema,
                           currentRouteName,
                           navigation,
                           getBestDisc: _getBestDisc,
                           createPayment: _createPayment,
                           resetPaymentState: _resetPaymentState,
                           getUsableCouponsAndCardsForSchedule: _getUsableCouponsAndCardsForSchedule,
                           getFeaturedProducts: _getFeaturedProducts,
                           getAvailablePromotions: _getAvailablePromotions,
                           setTicketVoucher: _setTicketVoucher,
                           getGiftCards: _getGiftCards,
                           getCustomerPoint: _getCustomerPoint,
                           getDscResult: _getDscResult,
                           editMobileNumber: _editMobileNumber,
                           resetCheckoutProductState: _resetCheckoutProductState,
                           updateUserInfoInRedux: _updateUserInfoInRedux
                       }) => {
    const {
        cinema, lang, movCd, movFmt, movId, movName, movUrl, screenName, seats, srmCd,
        thatAddr, thatCd, thatId, thatName, thatParty, type
    } = route.params || {}
    const [minutes, setMinutes] = useState('14')
    const [seconds, setSeconds] = useState('59')
    const [pointCoupons, setPointCoupons] = React.useState([])
    const [featuredProducts, setFeaturedProducts] = React.useState([])
    const [payStatusList, setPayStatusList] = useState([]);
    let interval = useRef()

    const clearTimer = () => interval.current && clearInterval(interval.current)

    useEffect(() => {
        getCouponByPoint()
        getGoodList()
    }, [])

    useEffect(() => {
        interval.current = setInterval(function () {
            getTimeCountdown()
        }, 1000)
        return clearTimer
    }, [])

    async function getCouponByPoint() {
        const data = couponPoint
        setPointCoupons(data.data)
    }

    async function getGoodList() {
        let baseUrl = '/product/good/list-all'
        let param = {
            prodCatalogCd: 1201,
            facilityCd: 188,
            showInSelect: 1,
            ishotgoods:1
        };
        const res = await apiRequest.post(baseUrl, param)
        let contents=res.content
        if(contents && contents.length>0){
            setFeaturedProducts(contents[0].goodList)
        }
    }

    const getTimeCountdown = () => {
        const newTime = new Date().getTime()
        if (endTime - newTime > 0) {
            const time = (endTime - newTime) / 1000
            //倒计时天、时、分、秒
            const day = parseInt(time / (60 * 60 * 24))
            const hou = parseInt((time % (60 * 60 * 24)) / 3600)
            const min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60)
            const sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60)
            setMinutes(timeFormat(min))
            setSeconds(timeFormat(sec))
        } else {
            clearInterval(interval.current)
            // navigation.goBack();
            tools.alert(
                '订单超时取消，请重新下单',
                '温馨提示',
                [
                    {
                        text: '重新下单',
                        onPress: () => {
                            goBack()
                        },
                    },
                ],
                {},
                '',
                false,
            )
            // 待付款已结束，全部设置为'00'
            setMinutes('00')
            setSeconds('00')
        }
    }

    const timeFormat = (param) => {
        return param < 10 ? `0${param}` : param
    }


    function buildPointCoupons() {
        return (<Card type="clear" style={styles.pointCard}>
                <View style={{paddingVertical: 10}}>
                    <Text bold style={{fontSize: 15, color: '#000000'}}>积分兑换更多优惠券<Text
                        style={{fontSize: 13, color: '#8e8e8e'}}>（当前可用积分0）</Text></Text>
                </View>
                {
                    pointCoupons.map((item, index) => {
                        return (
                            <View key={index} style={styles.point}>
                                <View style={{flex: 1, paddingLeft: 15}}>
                                    <Text style={styles.cpnTxt}>{item.cpnNm}</Text>
                                    <Text style={styles.pointTxt}>需{item.point}积分</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={async () => {
                                        tools.Toast.toast('兑换成功！', 1)
                                    }}
                                    style={styles.pointConvert}>
                                    <Text style={{color: '#fff', fontSize: 12}}>确认兑换</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
                <View style={styles.pointTip}>
                    <Text style={styles.pointTipTxt}> 提示：每个座位可选一张，兑换更多优惠券请前往积分商城 </Text>
                </View>
            </Card>
        );
    }

    return (
        <View style={styles.container}>
            <TopMessageContainer minutes={minutes} seconds={seconds}/>
            <ScrollView style={{flex:1}}>
                <TicketSummaryContainer data={route.params}/>
                <VoucherContainer data={route.params}/>
                {buildPointCoupons()}
                <TicketTotalContainer data={route.params}/>
                <PaymentBannerContainer
                    seeMore={() => navigation.navigate('FriendCardListScreen')}/>
                <ShopContainer items={featuredProducts}/>
                <ShopCouponContainer/>
                <CGVPaymentMethodContainer list={payStatusList}/>
                <ThirdPaymentContainer/>
                <View style={{height: 60}}/>
            </ScrollView>
            <PayBottomContainer data={route.params}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDEDED',
    },
    row: {
        flexDirection: 'row',
    },
    pointCard: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 3,
    },
    point: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        height: 60,
        marginTop: 15,
        borderWidth: 1 / 2,
        borderColor: '#e5e5e5',
        borderRadius: 5,
    },
    pointConvert: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        paddingHorizontal: 7,
        paddingVertical: 4,
        borderRadius: 20,
        backgroundColor: '#fc5869'
    },
    cpnTxt: {
        color: '#fc5869',
        fontSize: 14
    },
    pointTxt: {
        color: '#8e8e8e',
        marginTop: 7
    },
    pointTip: {
        marginTop: 25,
        height: 40,
        borderTopWidth: 1,
        borderTopColor: '#e5e5e5',
        justifyContent: 'center',
        paddingLeft: 10
    },
    pointTipTxt: {
        color: '#fc5869',
        fontSize: 13
    },
    input: {
        borderColor: '#EBEBEB',
        borderRadius: 4,
        width: '100%',
        paddingHorizontal: 10,
        borderWidth: 1,
        marginTop: 8,
        height: 40,
        textAlign: 'left',
    },
})

export default PaymentScreen;
