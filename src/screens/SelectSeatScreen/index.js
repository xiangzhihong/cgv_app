import React, {useState, useEffect, useRef} from 'react'
import {View, StyleSheet, ScrollView, Dimensions, Animated, Easing, Text, Button} from 'react-native'
import Tip from '../../common/Tip'
import ListItem from '../../common/ListItem'
import SelectTimeContainers from './containers/SelectTimeContainers'
import SeatTopItem from './components/SeatTopItem'
import seats from '../../assets/images/seat'
import {AESUtils, tools} from '../../utils'
import date from '../../utils/date'
import Seat from './containers/SeatContainer'
import BottomSelected from './containers/BottomSelect'
import {canSelect} from '../../utils/seat'
import {goBack} from '../../utils/rootNavigation'
import apiRequest from "../../api";
import httpConfig from "../../api/httpConfig";

const Left = new Animated.Value(0)
const {width} = Dimensions.get('window')

const SelectSeatScreen = ({
                              navigation,
                              route,
                              selectedCinema,
                              createTicketOrder: _createTicketOrder,
                              resetCheckoutProductState: _resetCheckoutProductState,
                          }) => {
    const {params = {}} = route

    const {
        sarftThatCd,
        scnSchSeq,
        screenCd,
        thatCd,
        screenName,
        times = [],
        index,
        schedulDate = {},
        cinema = {},
        movName,
        selected: selectedTime,
        imgUrl,
        movCd,
        movId,
        movLang,
        movType,
        brandName,
    } = params
    const [selected, setSelected] = React.useState([])
    const [activeIndex, setAcitveIndex] = React.useState(index)
    const {scnDyName = '', scnDyDay = '', scnDy} = schedulDate
    const {thatNm, thatId, thatAddr, partyId, srmCd} = cinema
    const [seatList, setSeatList] = React.useState([])
    const [seatGrdPrcs, setSeatGrdPrcs] = React.useState([])
    const [peopleList, setPeopleList] = React.useState([])
    const [seatThumbnailContainer, setSeatThumbnailContainer] = React.useState({})
    const [screenN, setScreenN] = React.useState(screenName)
    const [haveCheckImg, setHaveCheckImg] = React.useState(null)
    const [activity, setActivity] = React.useState(null)
    const [seeMovieStatus, setSeeMovieStatus] = React.useState(null)
    const [price, setPrice] = React.useState(0)
    const [showStatus, setShowStatus] = useState(true);
    const [cardPrice, setCardPrice] = React.useState(0)
    let interval = useRef()
    const clearTimer = () => interval.current && clearInterval(interval.current)

    React.useEffect(() => {
        getSeats(screenCd, scnSchSeq)
        getSeatAdvise()
        // getFacilityTipList()
        getSeenPeo()
    }, [index])

    useEffect(() => {
        interval.current = setTimeout(function () {
            setShowStatus(false)
        }, 2000)
        return clearTimer
    }, [])


    const goBackRefresh = (type, orderId) => {
        if (type) {
            tools.alert(
                '您的订单已取消，请重新选座！',
                undefined,
                [{
                    text: '关闭', onPress: () => {
                        goBack()
                        reloadNew()
                    }
                }],
                {},
                '',
                false,
            )
        } else {
            reloadNew()
        }
    }

    const reloadNew = () => {
        setCardPrice(0)
        setPrice(0)
        setSelected([])
        getSeats(screenCd, scnSchSeq)
        getSeatAdvise()
        getFacilityTipList()
    }

    async function getSeenPeo() {
        let baseUrl = '/party/api/getPropertyGetByPropertyId?resourceId=real.name.system&propertyId=real.name.system'
        const data = await apiRequest.get()(baseUrl)
        setSeeMovieStatus(data.systemPropertyValue)
    }

    async function getFacilityTipList() {
        let baseUrl = '/facility/api/facility/content/list'
        let param = {
            id: scnSchSeq
        };
        const data = await apiRequest.post(baseUrl, param)
        data && data.length > 0 && tools.alert(
            <View>
                {data.map((item, index) => (
                    <Text style={styles.textStyle} key={index}>
                        {item.tiptitle}：{item.tipcontent}
                    </Text>
                ))}
            </View>,
        )
    }

    async function getSeats(screenId, scnSchSeq) {
        let baseUrl = '/order/seats'
        let param = {
            prScreenCd: screenId,
            prThatCd: thatCd,
            prSarftThatCd: sarftThatCd,
            scnSchSeq: scnSchSeq,
        };
        const res = await apiRequest.post(baseUrl, param)
        setSeatList(res.otp_seat)
        setSeatGrdPrcs(res.seatGrdPrcs)
    }

    async function getSeatAdvise() {
        let baseUrl = '/content/api/advert/query?channel=APP&advertType=APP_SEAT_AD&thatCd=' + thatCd
        const data = await apiRequest.get(baseUrl)
        if (data != null && data.length > 0) {
            setHaveCheckImg(data[0].advertImg)
        }
    }

    const show = (cb) => {
        Animated.timing(Left, {
            duration: 200,
            toValue: 1,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start(() => cb && cb())
    }

    const close = () => {
        setTimeout(() => {
            Animated.timing(Left, {
                duration: 120,
                toValue: 0,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }).start()
        }, 500)
    }

    const selectSeat = (row, column, rowData = []) => {
        let objcouple;
        let i;
        const isSet = selected.findIndex(
            (item) => item.row === row && item.column === column,
        )
        if (isSet < 0) {
            if (selected.length === 6) {
                tools.Toast.toast('最多只能购买6张票', 1)
                return null
            }
        }
        let iscouple = false
        let iscouplecolumn = []
        const itemgroupcode = rowData[column].groupCode
        const itemRowCol = rowData[column].logicColId + rowData[column].logicRowId
        for (let i = 0; i < rowData.length; i++) {
            if (rowData[i] != null) {
                const targetgroupcode = rowData[i].groupCode
                const targetRowCol = rowData[i].logicColId + rowData[i].logicRowId
                if (itemgroupcode === targetgroupcode && itemRowCol !== targetRowCol) {
                    iscouple = true
                    iscouplecolumn.push(i)
                }
            }
        }
        let res = null
        if (iscouple) {
            if (selected.length >= 5 && isSet < 0) {
                tools.Toast.toast('您已经选择了5个座位，不能选择情侣座位', 1)
                return
            }
            res = true
        } else {
            res = canSelect({row, column}, rowData, selected, isSet >= 0)
        }

        if (isSet >= 0) {
            if (res) {
                if (iscouple) {
                    selected.splice(isSet, 1)
                    if (iscouplecolumn != null) {
                        for (i = 0; i < iscouplecolumn.length; i++) {
                            let iscoupleSet = selected.findIndex(
                                (item) => item.row === row && item.column === iscouplecolumn[i],
                            )
                            selected.splice(iscoupleSet, 1)
                        }
                    }
                } else {
                    selected.splice(isSet, 1)
                }
                setSelected([...selected])
                show(close)
                getPrice(selected)
            } else {
                tools.Toast.toast('请依次取消座位', 1)
            }
        } else if (res) {
            if (selected.length === 0) {
                const newArr = []
                const obj = {
                    row,
                    column,
                    phyRowId: rowData[column].phyRowId,
                    phyColId: rowData[column].phyColId,
                }
                newArr.push(obj)
                if (iscouple) {
                    if (iscouplecolumn != null) {
                        for (i = 0; i < iscouplecolumn.length; i++) {
                            objcouple = {
                                row,
                                column: iscouplecolumn[i],
                                phyRowId: rowData[iscouplecolumn[i]].phyRowId,
                                phyColId: rowData[iscouplecolumn[i]].phyColId,
                            };
                            newArr.push(objcouple)
                        }
                    }

                    setSelected(newArr)
                    getPrice(newArr)
                } else {
                    setSelected([obj])
                    getPrice([obj])
                }

                show(() => close())
            } else {
                const newArr = [...selected]
                const obj = {
                    row,
                    column,
                    phyRowId: rowData[column].phyRowId,
                    phyColId: rowData[column].phyColId,
                }
                if (iscouple) {
                    if (iscouplecolumn != null) {
                        for (i = 0; i < iscouplecolumn.length; i++) {
                            objcouple = {
                                row,
                                column: iscouplecolumn[i],
                                phyRowId: rowData[iscouplecolumn[i]].phyRowId,
                                phyColId: rowData[iscouplecolumn[i]].phyColId,
                            };
                            newArr.push(objcouple)
                        }
                    }
                    newArr.push(obj)
                } else {
                    newArr.push(obj)
                }
                setSelected(newArr)
                show(() => close())
                getPrice(newArr)
            }
        } else {
            tools.Toast.toast('位置不能留空', 1)
        }
    }

    const getPrice = (selectedSeat) => {
        const currentTime = times[activeIndex]
        const {activity} = currentTime
        setActivity(activity)
        let bktAmtPrices = 0
        let noCardDscAmtPrices = 0
        console.log(selectedSeat, bktAmtPrices, noCardDscAmtPrices)
        selectedSeat.map((item) => {
            const data = seatList[item.row][item.column]
            const {bktAmt, minDscAmt, mbrCrdPrc, noCardDscAmt} = data

            if (noCardDscAmt > 0 && noCardDscAmt < bktAmt) {
                bktAmtPrices += noCardDscAmt
            } else {
                bktAmtPrices += bktAmt
            }
            noCardDscAmtPrices += mbrCrdPrc
        })
        setPrice(bktAmtPrices)
        setCardPrice(noCardDscAmtPrices)
    }

    const onSubmit = async () => {
        const resList = selected.map((item) => {
            const {row, column} = item
            const pre = seatList[row][column]
            pre.row = row
            pre.column = column
            return pre
        })
        const seatsLists = resList.map((item) => {
            const obj = {}
            obj.ibkSeatCd = item.seatCode
            obj.seatNo = item.seatLocNo
            obj.seatNm = `${item.phyRowId}排${item.phyColId}座`
            obj.seatGrdCd = AESUtils.AES(item.seatGrdCd)
            return obj
        })
        const orderParams = {
            cinema: {
                hqCode: thatCd, // 本部影院代码（例如：'1011'）
                sarftCode: sarftThatCd, // 广电总局影院代码（例如：'31182201'）
                onlineCode: thatId, // 线上系统影院代码（例如：28）
                srmCode: srmCd, // 本部渠道代码（例如：'1096')
                partyId, // 影院party代码（例如：481）
                name: thatNm, // 影院名称（例如：'上海安亭'）
                address: thatAddr, // 影院地址
                money: {price, cardPrice},
            },
            scnSchSeq,
            thatCd,
            sarftThatCd,
            screenCd,
            thatId: thatId,
            movName,
            sarftMovCd: brandName,
            thatName: thatNm,
            srmCd,
            thatParty: partyId,
            movCd,
            movId,
            screenName,
            thatAddr,
            activity,
            movUrl: imgUrl,
            movFmt: movType,
            lang: movLang,
            activityId: '',
            ordChn: 1,
            openId: '',
            isMiniProgram: false,
            disSale: 'N',
            formId: '',
            seats: seatsLists,
            type: 'movie',
        }
        if (seatsLists && seatsLists.length === 0) {
            tools.Toast.toast('请选择座位', 1)
            return
        }
        navigation.navigate('PaymentScreen',orderParams)
    }

    const refreshData= (data) => {
        setPeopleList(data)
    }

    const onTimePress = (item, _index) => {
        if (activeIndex === _index) return null
        setSelected([])
        setPrice(0)
        setCardPrice(0)
        setAcitveIndex(_index)
        const {
            screenCd: _screenCd,
            scnSchSeq: _scnSchSeq,
            screenName: _screenName,
        } = item
        setScreenN(_screenName)
        getSeats(_screenCd, _scnSchSeq)
    }

    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={{flex: 1, backgroundColor: '#F3F4F5'}}>
                <ScrollView>
                    {showStatus ? <Tip
                        contentStyle={{color: '#fff'}}
                        titleStyle={{color: '#fff'}}
                        contentLeft="您购买的是"
                        title={` ${thatNm} ${scnDyName} ${date.getMonth(
                            scnDy,
                        )}月${scnDyDay}日 `}
                        contentRight="的场次，请核对后购买~"
                        style={{backgroundColor: '#F1A23D'}}
                    /> : null}
                    {!showStatus ? <MovieHeader
                        activeIndex={activeIndex}
                        movName={movName}
                        scnDyDay={scnDyDay}
                        scnDyName={scnDyName}
                        times={times}
                    /> : null}
                    <SelectTimeContainers
                        times={times}
                        activeIndex={activeIndex}
                        onPress={onTimePress}
                    />
                    <Tip contentStyle={{color: '#777'}} contentType="label" contentLeft="温馨提示：如果3D版本电影，可免费使用经过消毒的3D眼镜"
                         style={{backgroundColor: '#FEF7EC'}}/>
                    <View
                        style={styles.seatItem}>
                        <SeatTopItem
                            icon={seats.common}
                            text="可选"
                            style={{width: width / 5}}
                        />
                        <SeatTopItem
                            icon={
                                haveCheckImg
                                    ? httpConfig.mediaUrl + haveCheckImg
                                    : seats.common05
                            }
                            text="已选"
                            style={{width: width / 5}}
                        />
                        <SeatTopItem
                            icon={seats.common06}
                            text="已售"
                            style={{width: width / 5}}
                        />
                        <SeatTopItem
                            icon={seats.common01_Yellow}
                            text="线上优选"
                            style={{width: width / 5}}
                        />
                        <SeatTopItem
                            icon={seats.corona}
                            text="停售"
                            style={{width: width / 5}}
                        />
                        {
                            seatGrdPrcs?.findIndex(ite => ite.typeNm === 'lovers') > -1 ?
                                <SeatTopItem
                                    icon={seats.lovers}
                                    text="情侣座"
                                    style={{width: width / 5}}
                                />
                                : null
                        }
                        {
                            seatGrdPrcs?.findIndex(ite => ite.typeNm === '4d') > -1 ?
                                <SeatTopItem
                                    icon={seats['4d']}
                                    text="4DX"
                                    style={{width: width / 5}}
                                />
                                : null
                        }
                        {
                            seatGrdPrcs?.findIndex(ite => ite.typeNm === 'gold') > -1 ?
                                <SeatTopItem
                                    icon={seats.gold}
                                    text="GOLD"
                                    style={{width: width / 5}}
                                />
                                : null
                        }
                        {
                            seatGrdPrcs?.findIndex(ite => ite.typeNm === 'widebox') > -1 ?
                                <SeatTopItem
                                    icon={seats.widebox}
                                    text="宽座"
                                    style={{width: width / 5}}
                                />
                                : null
                        }
                    </View>
                    {seatList && seatList.length > 0 ? (
                        <Seat
                            seatList={seatList}
                            selectSeat={selectSeat}
                            selected={selected}
                            screenName={screenN}
                            animateLeft={Left}
                            haveCheckImg={haveCheckImg}
                            seatThumbnailContainer={seatThumbnailContainer}
                            setSeatThumbnailContainer={setSeatThumbnailContainer}/>
                    ) : null}
                </ScrollView>
            </View>
            <BottomSelected
                currentTime={times[activeIndex]}
                seatList={seatList}
                selected={selected}
                selectSeat={selectSeat}
            />
            <ListItem
                renderRight={() => (
                    <View style={{flexDirection: 'row'}}>
                        {price > cardPrice && cardPrice > 0 ? (
                            <View
                                style={[styles.infoContainer, {borderColor: '#F1A23D'}]}>
                                <View style={[styles.info, {backgroundColor: '#F1A23D'}]}>
                                    <Text style={{color: '#fff'}}>E优卡</Text>
                                </View>
                                <View style={styles.info}>
                                    <Text style={{color: '#F1A23D'}}>￥{cardPrice}</Text>
                                </View>
                            </View>
                        ) : null}
                        <Text bold style={{color: '#FC5869'}}>
                            ￥
                            <Text type="heading" bold style={{color: '#FC5869'}}>
                                {price.toFixed(1)}
                            </Text>
                        </Text>
                    </View>
                )}
                text="一次最多可选择6个座位"/>
            <Button
                color={'#FC5869'}
                title={selected.length === 0 ? '选择座位' : '确认选座'}
                onPress={onSubmit}
            />
        </View>
    )
}

const MovieHeader = ({
                         movName,
                         scnDyName,
                         scnDyDay,
                         times = [],
                         activeIndex = 0,
                     }) => {
    const {scnFrTime, scnDy} = times[activeIndex]
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 15,
                paddingTop: 15,
                backgroundColor: '#fff',
                paddingBottom: 9,
            }}>
            <Text bold type="subheading">
                {movName}
            </Text>
            <Text type="label">{`${scnDyName} ${date.getMonth(
                scnDy,
            )}月${scnDyDay}日 ${scnFrTime}`}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        width: width / 2,
        borderBottomLeftRadius: width / 4,
        borderBottomRightRadius: width / 4,
        backgroundColor: '#DCDCDC',
        overflow: 'hidden',
        paddingVertical: 3,
        paddingHorizontal: 10,
    },
    seatItem: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingBottom: 10,
    },
    row: {
        width: 20,
        height: 20,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 2,
        marginRight: 6,
    },
    info: {
        paddingHorizontal: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        color: '#181818',
        fontSize: 13,
        lineHeight: 25
    },
})

export default SelectSeatScreen
