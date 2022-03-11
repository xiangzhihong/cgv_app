import React, {useState, useEffect, useRef} from 'react'
import {StyleSheet, SectionList, FlatList, View} from 'react-native'
import ShoppingCartBar from './components/ShoppingCartBar'
import GoodItem from '../../common/GoodItem/GoodItem'
import Menu from './components/Menu'
import {AESUtils, tools} from '../../utils'
import apiRequest from "../../api";

const GoodListScreen = ({
                            current,
                            route,
                            navigation: {navigate, goBack},
                            createTicketOrder: _createTicketOrder,
                            getDscResult: _getDscResult,
                            items,
                            addToCart: _addToCart,
                            cartTotalQuantity,
                            cartTotalAmount,
                        }) => {
    let currentCategoryName
    const sectionListEle = useRef(null)
    const {params} = route
    const [goods, setGoods] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0)

    const select = (index) => {
        if (selectedIndex !== index) {
            setSelectedIndex(index)
            scrollTo(index)
        }
    }

    useEffect(() => {
        getGoodCategory()
    }, [])

    async function getGoodCategory() {
        let url = '/product/good/list-all'
        let param = {
            facilityCd: 188,
            prodCatalogCd: 1201,
            showInSelect: '1',
        };
        const data = await apiRequest.post(url,param)
        setGoods(
            (data.content).map(({goodList, ...res}, index) => ({
                ...res,
                isHot: index === 0,
                data: goodList,
            })),
        )
        // setGoods(data.content)
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

        if (items.length < 1) {
            tools.alert('购物车不能为空！', '', [
                {
                    text: '确定',
                    onPress: () => {
                        goBack()
                    },
                },
            ])
        } else {
            tools.loading()
            // _createTicketOrder(obj)
        }
    }

    function getResult(){
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

    function renderShopCart() {
        return (<ShoppingCartBar
            style={{height:60}}
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
        />);
    }

    function renderLeftList() {
        return (<View style={styles.leftList}>
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
        </View>);
    }

    function renderRightList() {
        return (<SectionList
            style={styles.rightList}
            ref={sectionListEle}
            onScrollToIndexFailed={() => ({
                index: selectedIndex,
                highestMeasuredFrameIndex: 0,
                averageItemLength: 100,
            })}
            sections={goods}
            renderItem={({item}) => (
                <GoodItem  item={item}/>
            )}
            keyExtractor={(item) => item.id}
            onViewableItemsChanged={onViewableItemsChanged}
        />);
    }

    return goods.length>0 && (
        <View style={{flexDirection:'column', flex:1}}>
            <View style={styles.body}>
                {renderLeftList()}
                {renderRightList()}
            </View>
            {renderShopCart()}
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'row',
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
