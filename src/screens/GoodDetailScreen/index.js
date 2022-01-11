import React, {useEffect, useState} from 'react'
import {ScrollView, TouchableOpacity, View} from 'react-native'
import CartBar from './components/CartBar'
import {bizstream} from '../../bizstream'
import Main from './components/Main'
import Switcher from './components/Switcher'
import Pictures from './components/Pictures'
import Comments from './components/Comments'
import ModalChangeSelection from './components/ModalChangeSelection'
import {tools} from '../../utils'
import apiRequest from "../../api";

const POP_TYPES = {
    CHANGES: 'changes',
    MORES: 'mores',
}

const flattenProduction = (list = []) => {
    const result = []
    list.forEach(production => {
        const target = production.defaultSub || production
        for (let index = 0; index < production.quantity; index++) {
            result.push(target)
        }
    })
    return result
}

const concatSubProduct = item => {
    const {subProductMap: {changes = [], mores = [], singles = []}} = item
    const result = []
    if (singles.length) singles.forEach(p => result.push(p))
    if (changes.length) changes.forEach(p => result.push(p))
    if (mores.length) mores.forEach(p => p.price && result.push(p))
    return result
}

const extractKeyValue = (list, targetKey) => {
    const arr = []
    const obj = list.reduce((prev, next) => {
        prev[next[targetKey]] = (prev[next[targetKey]] + 1) || 1
        return prev
    }, {})
    const entries = Object.entries(obj)
    entries.sort((firstEl, secondEl) => {
        const A = firstEl[0]
        const B = secondEl[0]
        if (A < B) {
            return -1
        }
        if (A > B) {
            return 1
        }
        return 0
    })
    entries.forEach(([key, value]) => arr.push(`${key}*${value}`))
    return arr
}

const concatDetailDescrition = (item = {}) => {
    const {detailScreen, subProduct} = item
    let str = detailScreen
    if (subProduct?.length) {
        const arr = extractKeyValue(subProduct, 'productName')
        str = arr.join(' + ')
    }
    return str
}

const computeTotalPrice = (item = {}) => {
    const {subProduct = []} = item
    let result = 0
    subProduct?.length && subProduct.forEach(p => {
        result += p.scrapFactor || 0
    })
    return result
}

const computeId = (item = {}) => {
    const {id, subProduct} = item
    if (!subProduct || !subProduct.length) {
        return id
    }
    const ids = ['temp', id, ...extractKeyValue(subProduct, 'id')]
    return ids.join('+')
}

const GoodDetailScreen = ({
                              navigation: {navigate, goBack},
                              thatCd,
                              current,
                              items,
                              getDscResult: _getDscResult,
                              route,
                              cartTotalQuantity,
                              addToCart: _addToCart
                          }) => {
    const {update, type, where, item} = route.params || {}
    const [pics, setPics] = useState([])
    const [goodsDetail, setGoodsDetail] = useState(item)
    const [comments, setComments] = useState([])
    const [listPop, setListPop] = useState([])
    const [detail, setDetail] = useState(item)
    const [isLoadingPop, setIsLoadingPop] = useState(false)
    const [showChangeSelection, setShowChangeSelection] = useState(false)
    const [target, setTarget] = useState({})

    useEffect(() => {
        getGoodDetail()
        getGoodComments()
    }, [])

    useEffect(() => {
        return getFun
    }, [])

    const getFun = () => {
        if (update && type === 'movie' && goodsDetail?.isVirtual !== '1') {
            update(detail)
        }
    }

    const getGoodComments = async () => {
        try {
            const res = await bizstream.customer.getGoodComments(detail.productCd)
            if (res.code === 200) {
                setComments(res.data.content || [])
            } else {
                if (res.message != null && res.message !== '') {
                    tools.Toast.toast(res.message, 1)
                } else {
                    tools.Toast.toast('获取失败请稍后再试！', 1)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getGoodDetail = async () => {
        let url = '/product/good/set/info-new'
        let param = {
            facilityCd: detail.facilityCd,
            productCategoryCd: detail.productCategoryCd,
            productCd: detail.productCd,
        };
        const data = await apiRequest.post(url, param)
        console.log(data)
        const {changes, mores, singles} = data.subProductMap
        data.subProductMap.changes = changes ? flattenProduction(changes) : changes
        data.subProductMap.mores = mores ? flattenProduction(mores) : mores
        data.subProductMap.singles = singles ? flattenProduction(singles) : singles
        const newDetail = data;
        //帅选所有的商品编码
        newDetail.subProduct = concatSubProduct(newDetail)
        //计算当前的价格（追加的金额）
        newDetail.scrapFactor = computeTotalPrice(newDetail)
        //没办法先临时用一下
        newDetail.price = newDetail.price + newDetail.scrapFactor;
        //套餐显示套餐内明细
        newDetail.detailScreen = concatDetailDescrition(newDetail)
        //计算所有套餐明细ID
        newDetail.id = computeId(newDetail)
        setDetail(newDetail)
        setPics(newDetail.detailImageUrl.split(',') || [])
    }

    const onPressChangeOrMore = async (type, targetIndex) => {
        const changeTarget = type === POP_TYPES.CHANGES ? detail.subProductMap?.changes[targetIndex] : detail.subProductMap?.mores[targetIndex]
        setTarget({
            type,
            id: changeTarget.id,
            index: targetIndex,
        })
        setShowChangeSelection(true)
        try {
            let url = '/product/good/set/sublist-new'
            let param = {
                facilityCd: thatCd,
                productCd: changeTarget.parentCd,
                prodCatalogCd: 1201,
            };
            const data = await apiRequest.post(url, param)
            setListPop(data)
            setIsLoadingPop(true)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoadingPop(false)
        }
    }

    const selectItem = selectedItem => {
        let oldArr = []
        let key = ''
        if (target.type === POP_TYPES.CHANGES) {
            oldArr = detail.subProductMap.changes
            key = 'changes'
        } else {
            oldArr = detail.subProductMap.mores
            key = 'mores'
        }
        const newArr = [...oldArr]
        newArr[target.index] = selectedItem
        const newDetail = {
            ...detail,
            subProductMap: {
                ...detail.subProductMap,
                [key]: newArr,
            },
        }

        //筛选所有的商品编码
        newDetail.subProduct = concatSubProduct(newDetail)
        //计算当前的价格（追加的金额）
        newDetail.price = newDetail.price - newDetail.scrapFactor;
        newDetail.scrapFactor = computeTotalPrice(newDetail)
        newDetail.price = newDetail.price + newDetail.scrapFactor;
        //套餐显示套餐内明细
        newDetail.detailScreen = concatDetailDescrition(newDetail)
        //计算所有套餐明细ID
        newDetail.id = computeId(newDetail)
        setDetail(newDetail)
        closePop()
    }

    const closePop = () => {
        setTarget({})
        setShowChangeSelection(false)
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

    const selectOk = () => {
        goBack()
        if (type === 'movie' && item.isVirtual !== '1') {
            getResult()
        } else if (type === 'movie' && !where && item.isVirtual === '1') {
            update(detail)
        } else if (type === 'movie' && where === 'detail' && item.isVirtual === '1') {
            _addToCart(detail)
            update(detail)
        } else if (type !== 'movie' && item.isVirtual === '1') {
            _addToCart(detail)
        }
    }

    return (
        <View style={{flex: 1}}>
            <ScrollView>
                <Main addUpdate={(i) => update(i)} item={detail}/>
                <Switcher changes={detail.subProductMap?.changes} more={detail.subProductMap?.mores}
                          singles={detail.subProductMap?.singles}
                          onPressChange={targetIndex => onPressChangeOrMore(POP_TYPES.CHANGES, targetIndex)}
                          onPressMore={targetIndex => onPressChangeOrMore(POP_TYPES.MORES, targetIndex)}/>
                <Pictures list={pics}/>
                <Comments data={detail} canPublish={detail.showReviewBtnYn === 1} list={comments}
                          publishComment={() => navigate('PersonalCommentScreen')}
                          gotoAllComments={() => navigate('AllCommentScreen', {
                              detail,
                              title: detail.productName,
                              status: 2
                          })}/>
                <ModalChangeSelection isLoading={isLoadingPop} visible={showChangeSelection} selectedItemId={target.id}
                                      list={listPop} close={closePop} onChoice={selectItem}/>
            </ScrollView>
            <CartBar num={cartTotalQuantity}
                     onPressLeft={() => type === 'movie' ? null : navigate('MyModal', {screen: 'ShopingCartScreen'})}
                     onPressRight={selectOk}/>
        </View>
    )
}


export default GoodDetailScreen
