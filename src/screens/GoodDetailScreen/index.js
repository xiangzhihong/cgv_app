import React, {useEffect, useState} from 'react'
import {ScrollView, View} from 'react-native'
import CartBar from './components/CartBar'
import Main from './components/Main'
import Switcher from './components/Switcher'
import Pictures from './components/Pictures'
import Comments from './components/Comments'
import {tools} from '../../utils'
import apiRequest from "../../api";

const GoodDetailScreen = ({navigation: {navigate}, route}) => {
    const {update, type, item} = route.params || {}
    const [detail, setDetail] = useState(item)
    const [pics, setPics] = useState([])
    const [comments, setComments] = useState([])

    const POP_TYPES = {
        CHANGES: 'changes',
        MORES: 'mores',
    }

    useEffect(() => {
        getGoodDetail()
        getGoodComments()
    }, [])


    const getGoodComments = async () => {
        let url = '/product/product-reviews/ext/productReviewList'
        const param = {
            postedAnonymous: '2',
            productId: detail.productCd,
        };
        const data = await apiRequest.post(url, param)
        setComments(data.content || [])
    }

    const getGoodDetail = async () => {
        let url = '/product/good/set/info-new'
        let param = {
            facilityCd: detail.facilityCd,
            productCategoryCd: detail.productCategoryCd,
            productCd: detail.productCd,
        };
        const data = await apiRequest.post(url, param)
        setDetail(data)
        // setPics(data.detailImageUrl.split(',') || [])
    }

    const onPressChangeOrMore = async (type, targetIndex) => {

    }

    const selectOk = () => {
        tools.alert('购物车', '加入购物车')
    }

    function goCommentDetail() {
        navigate('AllCommentScreen', {
            detail,
            title: '商品评论',
            status: 2
        })
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
                          gotoAllComments={() => goCommentDetail()}/>
            </ScrollView>
            <CartBar num={0}
                     onPressLeft={() => type === 'movie' ? null : navigate('MyModal', {screen: 'ShopingCartScreen'})}
                     onPressRight={selectOk}/>
        </View>
    )
}

export default GoodDetailScreen
