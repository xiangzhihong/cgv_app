import React, {useState, useEffect, useRef} from 'react'
import {StyleSheet, SectionList, FlatList, View} from 'react-native'
import AdvertisingBanner from '../../common/AdvertisingBanner/AdvertisingBanner'
import ShoppingCartBar from './components/ShoppingCartBar'
import GoodItem from '../../common/GoodItem/GoodItem'
import HotTitle from './components/HotTitle'
import Menu from './components/Menu'
import {AD_BANNER_TYPES} from '../../constants'
import {AESUtils, tools} from '../../utils'
import apiRequest from "../../api";

const GoodListScreen = ({
                            state,
                            current,
                            route,
                            navigation: {navigate, goBack},
                            createTicketOrder: _createTicketOrder,
                            getDscResult: _getDscResult,
                            isLoggedIn,
                            items,
                            addToCart: _addToCart,
                            cartTotalQuantity,
                            cartTotalAmount,
                        }) => {
    let currentCategoryName
    const sectionListEle = useRef(null)
    const {params} = route
    const {update, type} = params
    // const {selectedCinema} = state

    const [goods, setGoods] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0)

    const select = (index) => {
        if (selectedIndex !== index) {
            setSelectedIndex(index)
            scrollTo(index)
        }
    }

    useEffect(() => {
        return getFun
    }, [])

    const getFun = () => {
        if (type === 'movie') {
            getResult()
        }
    }

    useEffect(() => {
        getGoodCategory()
    }, [])

    async function getGoodCategory() {
        let url = '/product/good/list-all'
        //facilityCd: selectedCinema?.facilityId
        let param = {
            facilityCd: 188,
            prodCatalogCd: 1201,
            showInSelect: '1',
        };
        const data = await apiRequest.post(url,param)
        console.log('getCinemaDetail: ' + data)
        // setGoods(
        //     (data.content).map(({goodList, ...res}, index) => ({
        //         ...res,
        //         isHot: index === 0,
        //         data: goodList,
        //     })),
        // )
        setGoods(data.content)
        console.log('getCinemaDetail: ' + goods.toString())
    }

    const scrollTo = (index) => {
        sectionListEle.current.scrollToLocation({
            animated: false,
            itemIndex: 0,
            sectionIndex: index,
            viewPosition: 0,
        })
    }

    const onViewableItemsChanged = (info) => {
        const fisrtViewableItem = info.viewableItems[0]
        if (fisrtViewableItem) {
            const {categoryName} = fisrtViewableItem.item
            if (categoryName !== currentCategoryName) {
                const index = goods.findIndex((c) => c.categoryName === categoryName)
                setSelectedIndex(index)
                currentCategoryName = categoryName
            }
        }
    }

    const createGoodOrder = async () => {
        let prodcutList = []
        items.map((data) => {
            let o = {}
            if (data.subProduct && data.subProduct.length > 0) {
                o = {
                    id: data.productCd,
                    prodCd: data.productId,
                    qty: data.quantity,
                    subprods: data.subProduct.map((ite) => {
                        const oo = {
                            id: ite.productCd,
                            prodCd: ite.productId,
                            productAssocCd: ite.productAssocCd,
                            qty: ite.quantity,
                        }
                        return oo
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

        // const obj = {
        //     buyOrderStatus: true,
        //     disSale: 'N',
        //     isMiniProgram: false,
        //     ordChn: 1,
        //     prods: prodcutList,
        //     sarftThatCd: selectedCinema.sarftThatCd,
        //     srmCd: selectedCinema.srmCd,
        //     thatAddr: selectedCinema.thatAddr,
        //     thatCd: selectedCinema.thatCd,
        //     thatId: selectedCinema.facilityId,
        //     thatName: selectedCinema.thatNm,
        //     thatParty: selectedCinema.partyId,
        //     cinema: {
        //         hqCode: selectedCinema.thatCd, // 本部影院代码
        //         sarftCode: selectedCinema.sarftThatCd, // 广电总局影院代码
        //         onlineCode: selectedCinema.facilityId, // 线上系统影院代码
        //         srmCode: selectedCinema.srmCd, // 本部渠道代码
        //         partyId: selectedCinema.partyId, // 影院party代码
        //         name: selectedCinema.thatNm, // 影院名称
        //         address: selectedCinema.thatAddr, // 影院地址
        //     },
        // }

        if (items.length < 1) {
            tools.alert('购物车不能为空！', '', [
                {
                    text: '确定',
                    onPress: () => {
                        goBack()
                        // global.siblingAlert.destroy()
                    },
                },
            ])
        } else {
            tools.loading()
            // _createTicketOrder(obj)
        }
    }

    const getResult = () => {
        let prodcutList = []
        items.map((data) => {
            let o = {}
            if (data.subProduct && data.subProduct.length > 0) {
                o = {
                    id: data.productCd,
                    prodCd: data.productId,
                    qty: data.quantity,
                    subprods: data.subProduct.map((ite) => {
                        const oo = {
                            id: ite.productCd,
                            prodCd: ite.productId,
                            qty: ite.quantity,
                            productAssocCd: ite.productAssocCd,
                        }
                        return oo
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
        _getDscResult({
            orderChnl: '07',
            pointUseYn: current.paymentMethod.point.useYn,
            orderId: current.onlineOrderNo,
            coupons: [...current.ticketOrder.ticketCoupons],
            prods: prodcutList,
            mbrNm: current.ticketOrder.memberCard.memberCardName,
            mbrCardNo: current.ticketOrder.memberCard.memberCardNo,
            mbrCardPrice: current.ticketOrder.memberCard.memberCardAmount,
            mbrCardType: current.ticketOrder.memberCard.memberCardType,
            mbrCardPwd: current.ticketOrder.memberCard.memberCardPassword,
            gftCardNm: current.paymentMethod.memberCard.cardName,
            gftCertNo: current.paymentMethod.memberCard.cardNo,
            gftAuthNo: current.paymentMethod.memberCard.cardType,
            gftCertPrice: current.paymentMethod.memberCard.paymentAmount,
            vouchers: current.ticketOrder.vouchers,
            eventNo: current?.ticketOrder?.specialPromo?.promoId,
            eventType: current?.ticketOrder?.specialPromo?.promoUseSeatNo,
        })
    }

    return (
        <View style={{flexDirection:'column'}}>
            {/*<AdvertisingBanner type={AD_BANNER_TYPES.GOOD_LIST}/>*/}
            <View style={styles.body}>
                <View style={styles.leftList}>
                    <FlatList
                        data={goods}
                        renderItem={({item, index}) => (
                            <Menu
                                item={item}
                                isHot={index === 0}
                                isSelected={index === selectedIndex}
                                select={() => select(index)}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
                <SectionList
                    style={styles.rightList}
                    ref={sectionListEle}
                    onScrollToIndexFailed={() => ({
                        index: selectedIndex,
                        highestMeasuredFrameIndex: 0,
                        averageItemLength: 100,
                    })}
                    renderSectionHeader={({section: {description, isHot}}) => (
                        <View style={styles.title}>
                            <HotTitle title={description} isHot={isHot}/>
                        </View>
                    )}
                    sections={goods}
                    renderItem={({item}) => (
                        <GoodItem addOrder={() => {
                        }} type={type} goBackRefresh={() => getGoodCategory()} item={item}/>
                    )}
                    keyExtractor={(item) => item.id}
                    onViewableItemsChanged={onViewableItemsChanged}
                />
            </View>
            <ShoppingCartBar
                amount={cartTotalAmount}
                num={cartTotalQuantity}
                onPressLeft={() => navigate('MyModal', {screen: 'ShopingCartScreen'})}
                onPressRight={() => {
                    if (type === 'movie') {
                        getResult()
                        goBack()
                    } else {
                        createGoodOrder()
                    }
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    body: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'green'
    },
    leftList: {
        width: 72,
        backgroundColor: '#FBF8FB',
    },
    rightList: {
        flex: 1,
    },
    title: {
        backgroundColor: '#fff',
        padding: 5,
    },
})

export default GoodListScreen;
