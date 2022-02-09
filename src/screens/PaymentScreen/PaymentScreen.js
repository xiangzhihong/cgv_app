import React, {useEffect, useRef, useState} from 'react'
import {
    BackHandler,
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import Card from '../../common/Card/Card'
import Status from '../../bizstream/Status'
import {aliPay, UPPay, Wxpay} from '../../nativeBridge/pay'
import {
    CGVPaymentMethodContainer,
    PaymentBannerContainer,
    ShopCartContainer,
    ShopContainer,
    ShopCouponContainer,
    ShopTotalContainer,
    ThirdPartyPaymentMethodContainer,
    TicketSummaryContainer,
    TicketTotalContainer,
    TopMessageContainer,
    VoucherContainer,
} from './containers'
import {PaymentBottomBtn} from './components'
import {bizstream} from '../../bizstream'
import {AESUtils, navigate, tools} from '../../utils'
import {goBack} from '../../utils/rootNavigation'

const {width, height} = Dimensions.get('window')

const PaymentScreen = ({
                           route,
                           current,
                           payType,
                           selectedCinema,
                           currentRouteName,
                           userInfo,
                           ticketOrderStatus,
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
                           featuredProducts,
                           updateUserInfoInRedux: _updateUserInfoInRedux
                       }) => {
    const {goBackRefresh, type, orderId} = route.params
    const [pointCoupons, setPointCoupons] = React.useState([])
    const [minutes, setMinutes] = useState('14')
    const [seconds, setSeconds] = useState('59')
    const [payStatusList, setPayStatusList] = useState([]);
    global.type = 'movie'

    let interval = useRef()
    let clickflag = false;

    const clearTimer = () => interval.current && clearInterval(interval.current)

    useEffect(() => {
        payAttrFun()
        getGoodList()
        getCouponByPoint()
        getCounpons()
        if (!type) {
            baseFun()
        }
        if (type) {
            getAvailableCoupons()
        }

    }, [])

    useEffect(() => {
        interval.current = setInterval(function () {
            getAcquisitionCountdown()
        }, 1000)
        return clearTimer
    }, [])

    useEffect(() => {
        initializationBackHandler()
        return comWillUnmount
    }, [type])

    const baseFun = (coupons = [], obj) => {
        let prodcutList = []
        current.productOrder.product.products.map((data) => {
            let o = {};
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
                        };
                    }),
                };
            } else {
                o = {
                    id: data.productCd,
                    prodCd: data.productId,
                    qty: data.quantity,
                };
            }
            for (let i = data.quantity; i > 0; i--) {
                prodcutList.push(o);
            }
        });
        _getDscResult({
            orderChnl: '07',
            pointUseYn: '0',
            orderId: current.onlineOrderNo,
            prods: prodcutList,
            coupons,
            vouchers: [],
            ...obj
        });
    }

    const initializationBackHandler = () => {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', cancelFunC)
        }
    }

    const payAttrFun = async () => {
        const data = await bizstream.customer.payAttr(selectedCinema?.facilityId)
        setPayStatusList(data)
    }

    const getCouponByPoint = async () => {
        try {
            const data = await bizstream.customer.getCouponByPoint()
            setPointCoupons(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const initData = async () => {
        try {
            const data = await bizstream.customer.getUserInfo()
            _updateUserInfoInRedux(data)
        } catch (error) {
            console.log(error)
        }
    }

    const cancelFunC = () => {
        if (currentRouteName === 'PaymentScreen') {
            clearInterval(interval.current)
            cancelOrder()
            goBackRefresh(2, orderId)
            navigation.goBack();
            return true
        }
    }

    const comWillUnmount = () => {
        BackHandler.removeEventListener('hardwareBackPress', cancelFunC)
    }

    const getAcquisitionCountdown = () => {
        const endTime_ = current?.autoCancelDatetime
        const newTime = new Date().getTime()
        const endTime = new Date(endTime_?.replace(/-/g, '/')).getTime()
        if (endTime - newTime > 0) {
            const time = (endTime - newTime) / 1000
            // 获取天、时、分、秒
            const day = parseInt(time / (60 * 60 * 24))
            const hou = parseInt((time % (60 * 60 * 24)) / 3600)
            const min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60)
            const sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60)
            setMinutes(timeFormat(min))
            setSeconds(timeFormat(sec))
        } else {
            // 待付款已结束，全部设置为'00'
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
                            cancelOrder()
                            if (currentRouteName !== 'PaymentScreen') {
                                navigation.popToTop()
                            } else {
                                if (type) {
                                    goBackRefresh()
                                }
                                navigation.goBack()
                            }
                        },
                    },
                ],
                {},
                '',
                false,
            )
            setMinutes('00')
            setSeconds('00')
        }
    }

    const cancelOrder = async () => {
        try {
            await bizstream.customer.cancelOrder(orderId)
        } catch (error) {
            console.log(error)
        }
    }

    const timeFormat = (param) => {
        return param < 10 ? `0${param}` : param
    }

    const placeOrder = async () => {
        if (clickflag) {
            console.log("订单已经提交！")
            return;
        }
        clickflag = true;
        clearTimer()
        clearInterval(interval.current)
        // goBack()
        let seats = []
        seats =
            current.ticketOrder &&
            current.ticketOrder.ticket &&
            current.ticketOrder.ticket.seats &&
            current.ticketOrder.ticket.seats.length > 0 &&
            current.ticketOrder.ticket.seats.map((item) => {
                item.ibkSeatCd = item.posSeatCode
                item.seatNm = item.seatName
                item.seatGrdCd = item.seatGrade
                return item
            })

        const arr = []
        current.productOrder &&
        current.productOrder.product &&
        current.productOrder.product.products &&
        current.productOrder.product.products.length > 0 &&
        current.productOrder.product.products.map((item) => {
            const o =
                item.subProduct && item.subProduct.length
                    ? {
                        id: item.productCd,
                        prodCd: item.productId,
                        qty: item.quantity,
                        subprods: item.subProduct.map((ite) => {
                            return {
                                id: ite.productCd,
                                prodCd: ite.productId,
                                productAssocCd: ite.productAssocCd,
                                qty: ite.quantity,
                            }
                        }),
                    }
                    : {
                        id: item.productCd,
                        prodCd: item.productId,
                        qty: item.quantity,
                    }
            arr.push(o)
        })
        let paymentInformation = {}
        if (type) {
            paymentInformation = {
                platform: Platform.OS === 'ios' ? '01' : '02',
                orderId: current.onlineOrderNo,
                payType: current?.totalAmount === 0 ? null : Math.min(payType, 3),
                thatCd: current.cinema.hqCode, // 本部影院代码（例如：'1011'）
                sarftThatCd: current.cinema.sarftCode, // 广电总局影院代码（例如：'31182201'）
                thatId: selectedCinema.facilityId, // 线上系统影院代码（例如：28）
                thatParty: current.cinema.partyId, // 影院party代码（例如：481）
                srmCd: current.cinema.srmCode, // 本部渠道代码（例如：'1096')
                thatName: current.cinema.name, // 影院名称（例如：'上海安亭'）
                thatAddr: current.cinema.address, // 影院地址
                activityId: '', // 活动id
                ordChn: 1, // 订单渠道 2小程序
                openId: '', // 微信的openid
                isMiniProgram: false, // 是否小程序
                disSale: 'N', // 卖品是否开启促销
                formId: '', // 小程序提交订单的formid
                /**
                 * 购票
                 */
                screenCd: current.ticketOrder.screen.hqCode, // 本部影厅代码（例如：'0006'）
                screenName: current.ticketOrder.screen.name, // 影厅名称
                scnSchSeq: current.ticketOrder.ticket.schedule.code, // 排期号（例如：14561823）
                movCd: current.ticketOrder.ticket.movie.hqCode, // 本部电影代码（例如：'10003626'）
                movId: current.ticketOrder.ticket.movie.onlineId, // 线上系统电影（例如：3618）
                sarftMovCd: current.ticketOrder.ticket.movie.sarftCode, // 广电总局电影代码（例如：''）. brandname
                movName: current.ticketOrder.ticket.movie.title, // 电影名称（例如：'南方车站的聚会'）
                movUrl: current.ticketOrder.ticket.movie.image, // 电影图片地址（例如：'/aaa.jpg'）
                movFmt: current.ticketOrder.ticket.movie.format, // timer.type.split('/')[1], //电影制式名称（例如：'2D'）
                lang: current.ticketOrder.ticket.movie.language, // timer.type.split('/')[0], //电影的语言（例如：'中文'）
                seats,
                coupons: [...current.ticketOrder.ticketCoupons],
                orderChnl: '07',
                vouchers: current.ticketOrder.vouchers,
                gftCardNm: current.paymentMethod.memberCard.cardName,
                gftCertNo: current.paymentMethod.memberCard.cardNo,
                gftAuthNo: current.paymentMethod.memberCard.cardType,
                gftCertPrice: current.paymentMethod.memberCard.paymentAmount,
                pointUseYn: current.paymentMethod.point.useYn,
                mbrNm: current.ticketOrder.memberCard.memberCardName,
                mbrCardNo: current.ticketOrder.memberCard.memberCardNo,
                mbrCardPrice: current.ticketOrder.memberCard.memberCardAmount,
                mbrCardType: current.ticketOrder.memberCard.memberCardType,
                mbrCardPwd: current.ticketOrder.memberCard.memberCardPassword,
                /**
                 * 卖品
                 */
                prods: arr,
                mobile: AESUtils.AES(current.mobileNo),
            }

        } else {
            paymentInformation = {
                platform: Platform.OS === 'ios' ? '01' : '02',
                orderId: current.onlineOrderNo,
                payType: current?.totalAmount === 0 ? null : Math.min(payType, 3),
                ordChn: 1, // 订单渠道 2小程序
                coupons: [...current.ticketOrder.ticketCoupons],
                orderChnl: '07',
                mobile: AESUtils.AES(current.mobileNo),
                gftCardNm: current.paymentMethod.memberCard.cardName,
                gftCertNo: current.paymentMethod.memberCard.cardNo,
                gftAuthNo: current.paymentMethod.memberCard.cardType,
                gftCertPrice: current.paymentMethod.memberCard.paymentAmount,
                pointUseYn: current.paymentMethod.point.useYn,
                mbrNm: current.ticketOrder.memberCard.memberCardName,
                mbrCardNo: current.ticketOrder.memberCard.memberCardNo,
                mbrCardPrice: current.ticketOrder.memberCard.memberCardAmount,
                mbrCardType: current.ticketOrder.memberCard.memberCardType,
                mbrCardPwd: current.ticketOrder.memberCard.memberCardPassword,
            }
        }
        try {
            const data = await bizstream.customer.createPayment(paymentInformation)
            clickflag = false;
            if (data.RS_CD === '00') {
                paymentInformation.pointUseYn === '1' ? initData() : null
                if (current.totalAmount) {
                    if (payType === 1) {
                        const isSupported = await Wxpay.isSupported()
                        if (isSupported) {
                            const param = {
                                appId: data.sub_appid,
                                partnerId: data.sub_mch_id,
                                prepayId: data.prepayid,
                                nonceStr: data.noncestr,
                                timeStamp: data.timestamp,
                                package: data.package1,
                                sign: data.an_sign,
                            }
                            const result = await Wxpay.pay(
                                Platform.OS === 'ios' ? param : JSON.stringify(param),
                            )
                            if (result.errCode === 0) {
                                clearInterval(interval.current)
                                navigate('PaySuccessScreen', {
                                    title: '支付成功',
                                    id: paymentInformation.orderId,
                                    goBackStatus: true,
                                    type,
                                })
                            } else {
                                tools.Toast.toast('订单支付失败', 1)
                            }
                        } else {
                            tools.Toast.toast('请安装微信', 1)
                        }
                    } else if (payType === 2) {
                        const response = await aliPay.pay(data.body)
                        if (response?.code === '9000' || response?.[0].resultStatus === '9000') {
                            clearInterval(interval.current)
                            setMinutes('00')
                            setSeconds('00')
                            navigate('PaySuccessScreen', {
                                title: '支付成功',
                                id: paymentInformation.orderId,
                                goBackStatus: true,
                                type,
                            })
                        } else {
                            tools.Toast.toast('订单支付失败', 1)
                        }
                    } else if (payType === 3) {
                        UPPay.pay(data.TN, true, '')
                            .then((resp) => {
                                clearInterval(interval.current)

                                navigate('PaySuccessScreen', {
                                    title: '支付成功',
                                    id: paymentInformation.orderId,
                                    goBackStatus: true,
                                    type,
                                })
                            })
                            .catch((err) => {
                                tools.Toast.toast('订单支付失败', 1)
                            })
                    } else if (payType === 4) {
                        UPPay.pay(data.TN, true, 'merchant.cn.com.cgv.m1011')
                            .then((resp) => {
                                clearInterval(interval.current)
                                navigate('PaySuccessScreen', {
                                    title: '支付成功',
                                    id: paymentInformation.orderId,
                                    goBackStatus: true,
                                    type,
                                })
                            })
                            .catch(({code, message, ...rest}) => {
                                tools.Toast.toast('订单支付失败', 1)
                            })
                    } else if (payType) {
                        UPPay.pay(data.TN, true, `${payType}`.substr(2, 2)).then(
                            (resp) => {
                                clearInterval(interval.current)
                                navigate('PaySuccessScreen', {
                                    title: '支付成功',
                                    id: paymentInformation.orderId,
                                    goBackStatus: true,
                                    type,
                                })
                            },
                            (err) => {
                                tools.Toast.toast('订单支付失败', 1)
                            },
                        )
                    }
                } else {
                    clearInterval(interval.current)
                    navigate('PaySuccessScreen', {
                        title: '支付成功',
                        id: paymentInformation.orderId,
                        goBackStatus: true,
                        type,
                    })
                }
            } else {
                tools.Toast.toast('订单支付失败', 1)
            }
        } catch (e) {
            // tools.Toast.toast('订单支付失败',1)
        }
    }

    /**
      * TODO：获取优惠券
      * */
    const getCounpons = () => {
        if (!type) {
            _getUsableCouponsAndCardsForSchedule({thatCd: selectedCinema.thatCd, srmCd: selectedCinema.srmCd})
        } else {
            _getUsableCouponsAndCardsForSchedule({
                scnDay: current.ticketOrder.ticket.schedule.displayName,
                thatCd: selectedCinema.thatCd, // 本部影院代码（例如：'1011'）
                srmCd: selectedCinema.srmCd, // 本部渠道代码（例如：'1096')
                scnSchSeq: current.ticketOrder.ticket.schedule.code, // 排期号（例如：14561823）
                screenCd: current.ticketOrder.screen.hqCode, // 本部影厅代码（例如：'0006'）
                seats: current.ticketOrder.ticket.seats,
                movCd: current.ticketOrder.ticket.movie.hqCode,
            })
        }
        /*
         * TODO：星意卡
         * */
        _getGiftCards(selectedCinema.thatCd)
        /*
         * TODO：积分
         * */
        _getCustomerPoint()
    }

    const getAvailableCoupons = async () => {
        if (current?.ticketOrder?.ticket?.movie?.activity === "1") {
            getPreActive()
        } else {
            try {
                const res = await bizstream.customer.getUsableCouponsAndCardsForSchedule({
                    scnDay: current.ticketOrder.ticket.schedule.displayName,
                    thatCd: selectedCinema.thatCd, // 本部影院代码（例如：'1011'）
                    srmCd: selectedCinema.srmCd, // 本部渠道代码（例如：'1096')
                    scnSchSeq: current.ticketOrder.ticket.schedule.code, // 排期号（例如：14561823）
                    screenCd: current.ticketOrder.screen.hqCode, // 本部影厅代码（例如：'0006'）
                    seats: current.ticketOrder.ticket.seats,
                    movCd: current.ticketOrder.ticket.movie.hqCode,
                })

                const enctryptedSeat = []

                current.ticketOrder.ticket &&
                current.ticketOrder.ticket.seats &&
                current.ticketOrder.ticket.seats.length > 0 &&
                current.ticketOrder.ticket.seats.map((item) => {
                    const seat = {
                        ...item,
                        seatNo: item.seatNo,
                        seatGrdCd: item.seatGrdCd
                    }
                    enctryptedSeat.push(seat)
                })

                const getBestDiscRequest = {
                    /**
                     * 订单共同
                     */
                    thatCd: selectedCinema.thatCd, // 本部影院代码（例如：'1011'）
                    srmCd: selectedCinema.srmCd, // 本部渠道代码（例如：'1096')
                    scnSchSeq: current.ticketOrder.ticket.schedule.code, // 排期号（例如：14561823）
                    screenCd: current.ticketOrder.screen.hqCode, // 本部影厅代码（例如：'0006'）
                    movCd: current.ticketOrder.ticket.movie.hqCode, // 本部电影代码（例如：'10003626'）
                    seats: enctryptedSeat,
                }
                let coupons = []
                let obj = {}
                if (res.RS_CD === '00') {
                    const res2 = await bizstream.customer.getBestDisc(getBestDiscRequest)
                    if (res2.RS_CD === '00') {
                        res2?.LIST_COM_SALEDSC?.map(item => {
                            res?.LIST_COUPON?.map(ite => {
                                if (item.DSC_AUTH_NO === ite.CPN_NO) {
                                    let obj = {
                                        cardNo: AESUtils.AES(ite.CPN_NO),
                                        typeCd: AESUtils.AES(ite.DSC_TYP_CD),
                                        lijianYn: AESUtils.AES(ite.LIJIAN_YN),
                                        ...ite,
                                    }
                                    coupons.push(obj)
                                }
                            })
                            res?.LIST_COUPON_ALL?.map(ite => {
                                if (item.DSC_AUTH_NO === ite.MBR_CRD_NO) {
                                    obj = ite
                                }
                            })
                        })
                        let data = {
                            mbrCardNo: obj ? AESUtils.AES(obj.MBR_CRD_NO) : null,
                            mbrCardPrice: obj?.USE_ABL_RAMT,
                            mbrCardType: obj ? AESUtils.AES(obj.MBR_CRD_TYP_CD) : null,
                            mbrNm: obj?.MBR_CRD,
                            mbrCardPwd: obj ? AESUtils.AES(obj.PWD_UPD_YN) : null,
                        }
                        baseFun(coupons, data)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }

        /**
         * 获取代金券
         */
        _setTicketVoucher()
    }

    const getGoodList = () => {
        _getFeaturedProducts(selectedCinema.facilityId)
    }

    /**
     * 查询特惠活动
     */
    const getPreActive = async () => {
        const obj = {
            thatCd: current.cinema.hqCode,
            scnSchSeq: current.ticketOrder.ticket.schedule.code,
            chnlNo: '05',
        }
        _getAvailablePromotions(obj)
    }

    const viewCont = () => {
        return (
            <View>
                <Text style={{color: '#181818', fontSize: 14, marginBottom: 10}}>
                    {current.cinema.name}CGV影城
                </Text>
                <Text style={{color: '#9e9e9e'}}>{current.cinema.address}</Text>
            </View>
        )
    }

    const renderButton = () => (
        <PaymentBottomBtn
            placeOrder={() =>
                tools.alert(viewCont, '请确认您的购买影城', [
                    {text: '确认支付', onPress: () => placeOrder()},
                ])
            }
        />
    )

    return (
        <View footer={renderButton()}
            style={styles.containerMain}>
            <TopMessageContainer minutes={minutes} seconds={seconds}/>
            <ScrollView>
                {ticketOrderStatus !== Status.DEFAULT && (
                    <>
                        <TicketSummaryContainer/>
                        <VoucherContainer/>
                        {pointCoupons && pointCoupons.length > 0 ?
                            <Card type="clear" style={[styles.container, {marginHorizontal: 10, padding: 10,}]}>
                                <View style={{paddingVertical: 10}}>
                                    <Text bold style={{fontSize: 15, color: '#000000'}}>积分兑换更多优惠券<Text
                                        style={{fontSize: 13, color: '#8e8e8e'}}>（当前可用积分{userInfo.point}）</Text></Text>
                                </View>
                                {
                                    pointCoupons.map((item, index) => {
                                        return (
                                            <View key={index} style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginHorizontal: 10,
                                                height: 60,
                                                marginTop: 15,
                                                borderWidth: 1 / 2,
                                                borderColor: '#e5e5e5',
                                                borderRadius: 5,
                                                // padding: 20
                                            }}>
                                                <View style={{
                                                    width: width - 60,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                }}>
                                                    <Text bold style={{
                                                        width: (width - 70) / 4,
                                                        textAlign: 'center',
                                                        fontSize: 25,
                                                        color: '#e5e5e5'
                                                    }}>券</Text>
                                                    <View style={{
                                                        width: (width - 60) * 3 / 5.2,
                                                        paddingLeft: width * 0.075
                                                    }}>
                                                        <Text
                                                            style={{color: '#fc5869', fontSize: 14}}>{item.cpnNm}</Text>
                                                        <Text style={{
                                                            color: '#8e8e8e',
                                                            marginTop: 7
                                                        }}>需{item.point}积分</Text>
                                                    </View>
                                                </View>
                                                <TouchableOpacity
                                                    onPress={async () => {
                                                        if (current?.ticketOrder?.ticket?.movie?.activity === "1") {
                                                            tools.alert('此兑换券该场次不可用，是否兑换？', '温馨提示', [{
                                                                text: '否',
                                                                onPress: null,
                                                                style: 'cancel'
                                                            }, {
                                                                text: '是', onPress: async () => {
                                                                    try {
                                                                        const data = await bizstream.customer.changePointToCoupon(item.id, current?.cinema?.hqCode)
                                                                        if (data.code === 200) {
                                                                            tools.Toast.toast('兑换成功，请去优惠券中选择使用', 1)
                                                                            getCounpons()
                                                                            initData()
                                                                        } else {
                                                                            tools.Toast.toast(data.message, 1)
                                                                        }
                                                                    } catch (error) {
                                                                        console.log(error)
                                                                    }
                                                                    goBack()
                                                                },
                                                            }])
                                                        } else {
                                                            try {
                                                                const data = await bizstream.customer.changePointToCoupon(item.id, current?.cinema?.hqCode)
                                                                if (data.code === 200) {
                                                                    tools.Toast.toast('兑换成功，请去优惠券中选择使用', 1)
                                                                    getCounpons()
                                                                    initData()
                                                                } else {
                                                                    tools.Toast.toast(data.message, 1)
                                                                }
                                                            } catch (error) {
                                                                console.log(error)
                                                            }
                                                        }
                                                    }}
                                                    style={{
                                                        position: 'absolute',
                                                        bottom: Platform.OS === 'ios' ? 10 : 10,
                                                        right: 10,
                                                        paddingHorizontal: 7,
                                                        paddingVertical: 4,
                                                        borderRadius: 20,
                                                        backgroundColor: '#fc5869'
                                                    }}>
                                                    <Text style={{color: '#ffffff'}}>确认兑换</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })
                                }
                                <View style={{
                                    marginTop: 25,
                                    height: 40,
                                    borderTopWidth: 1,
                                    borderTopColor: '#e5e5e5',
                                    justifyContent: 'center'
                                }}>
                                    <Text
                                        style={{color: '#fc5869', paddingLeft: 10}}> 提示：每个座位可选一张，兑换更多优惠券请前往积分商城 </Text>
                                </View>
                            </Card> : null}
                        <TicketTotalContainer/>
                        <PaymentBannerContainer
                            seeMore={() => navigation.navigate('FriendCardListScreen')}
                        />
                        <ShopContainer items={featuredProducts}/>
                    </>
                )}
                {ticketOrderStatus === Status.DEFAULT && (
                    <View
                        style={{
                            marginHorizontal: 12,
                            borderRadius: 3,
                            padding: 10,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 10,
                            height: 45,
                            flexDirection: 'row',
                            backgroundColor: '#fff',
                        }}>
                        <Text style={{color: '#181818', fontSize: 14}}>当前提货影城</Text>
                        <Text style={{color: '#fc5869', fontSize: 14, fontWeight: 'bold'}}>
                            {current.cinema.name}
                        </Text>
                    </View>
                )}
                {current?.productOrder?.product?.products?.length > 0 && (
                    <ShopCartContainer/>
                )}
                {current?.productOrder?.product?.products?.length > 0 && (
                    <ShopCouponContainer/>
                )}
                {ticketOrderStatus === Status.DEFAULT && pointCoupons && pointCoupons.length > 0 ?
                    <Card type="clear" style={[styles.container, {marginHorizontal: 10, padding: 10,}]}>
                        <View style={{paddingVertical: 10}}>
                            <Text bold style={{fontSize: 15, color: '#000000'}}>积分兑换更多优惠券<Text
                                style={{fontSize: 13, color: '#8e8e8e'}}>（当前可用积分{userInfo.point}）</Text></Text>
                        </View>
                        {
                            pointCoupons.map((item, index) => {
                                return (
                                    <View key={index} style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginHorizontal: 10,
                                        height: 60,
                                        marginTop: 15,
                                        borderWidth: 1 / 2,
                                        borderColor: '#e5e5e5',
                                        borderRadius: 5,
                                        // padding: 20
                                    }}>
                                        <View style={{width: width - 60, flexDirection: 'row', alignItems: 'center',}}>
                                            <Text bold style={{
                                                width: (width - 70) / 4,
                                                textAlign: 'center',
                                                fontSize: 25,
                                                color: '#e5e5e5'
                                            }}>券</Text>
                                            <View style={{width: (width - 60) * 3 / 5.2, paddingLeft: width * 0.075}}>
                                                <Text style={{color: '#fc5869', fontSize: 14}}>{item.cpnNm}</Text>
                                                <Text style={{color: '#8e8e8e', marginTop: 7}}>需{item.point}积分</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity
                                            onPress={async () => {
                                                try {
                                                    const data = await bizstream.customer.changePointToCoupon(item.id, current?.cinema?.hqCode)
                                                    if (data.code === 200) {
                                                        tools.Toast.toast('兑换成功！', 1)
                                                        getCounpons()
                                                        initData()
                                                    } else {
                                                        tools.Toast.toast(data.message, 1)
                                                    }
                                                } catch (error) {
                                                    console.log(error)
                                                }
                                            }}
                                            style={{
                                                position: 'absolute',
                                                bottom: Platform.OS === 'ios' ? 10 : 10,
                                                right: 10,
                                                paddingHorizontal: 7,
                                                paddingVertical: 4,
                                                borderRadius: 20,
                                                backgroundColor: '#fc5869'
                                            }}>
                                            <Text style={{color: '#ffffff'}}>确认兑换</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }
                        <View style={{
                            marginTop: 25,
                            height: 40,
                            borderTopWidth: 1,
                            borderTopColor: '#e5e5e5',
                            justifyContent: 'center'
                        }}>
                            <Text style={{color: '#fc5869', paddingLeft: 10}}> 提示：每个座位可选一张，兑换更多优惠券请前往积分商城 </Text>
                        </View>
                    </Card> : null}
                {current?.productOrder?.product?.products?.length > 0 && (
                    <ShopTotalContainer/>
                )}
                <CGVPaymentMethodContainer list={payStatusList}/>
                <ThirdPartyPaymentMethodContainer/>
                <View style={{height: 60}}/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
        backgroundColor: '#EDEDED',
    },
    row: {
        flexDirection: 'row',
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
