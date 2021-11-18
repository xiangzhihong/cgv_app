import React, {useContext, useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, FlatList} from 'react-native'
import moment from 'moment'
import CommentItem from '../../common/CommentItem'
import {tools} from '../../utils'
import apiRequest from "../../api";

const AllCommentScreen = ({route, navigation, commentPage = 1}) => {

    const {params = {}} = route
    const {movieId = {}, images, title, detail, status} = params
    console.log(detail)
    const [loading, setLoading] = React.useState(false)
    const [movieComments, setMovieComments] = React.useState([])
    const [totalMovieComments, setTotalMovieComments] = React.useState(0)

    React.useEffect(() => {
        getMovieCommentList(movieId, 1)
    }, [])

    //获取电影评论
    async function getMovieCommentList(movieId, number) {
        let baseUrl = '/product/product-reviews/ext/productReviewList'
        let param = {
            postedAnonymous: '1',
            productId: movieId,
            pageNumber: number,
        };
        const res = await apiRequest.post(baseUrl, param)
        console.log('getMovieCommentList: ' + res)
        if (number <= 1) {
            setMovieComments(res.content)
        } else {
            setMovieComments(movieComments,res.content)
        }
        setTotalMovieComments(res.totalElements)
    }

    const refresh = () => {
        setLoading(true)
        getMovieCommentList(movieId, 1)
        setLoading(false)
    }

    const loadMore = () => {
        if (movieComments.length === 0) return null
        getMovieCommentList(movieId, commentPage + 1)
    }

    const goDetail = (item) => {
        navigation.navigate('PersonalCommentScreen', {title, ...item, images})
    }

    //点赞、取消点赞
    const onPraisePress = async (data) => {

    }

    const renderItem = ({item, index}) => {
        const {nickname = '', productReview = '', postedDateTime, replyCnt = 0, likeCnt = 0, myLike = {}} = item
        const date = moment(postedDateTime).format('YYYY-MM-DD')
        const {productLike = '0'} = myLike || {}
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => goDetail(item)}>
                <CommentItem
                    isLast={index === movieComments.length - 1}
                    contentStyle={{marginTop: 10}}
                    style={{marginTop: 0, paddingTop: 18, paddingLeft: 15}}
                    avatarStyle={{marginRight: 10}}
                    name={nickname}
                    showPraise
                    isPraised={productLike === '1'}
                    onPraisePress={status === 1 ? onPraisePress : null}
                    praiseNumber={likeCnt}
                    date={date}
                    data={item}
                    commentNumber={replyCnt}
                    avatar={tools.getImage(item.pic)}
                    content={productReview}
                    productRating={item.productRating}
                    isShowProductRating={true}
                />
            </TouchableOpacity>
        )
    }

    return (<View style={{backgroundColor: '#fff'}}>
            <FlatList
                onEndReached={loadMore}
                onEndReachedThreshold={0.1}
                refreshing={loading}
                ListHeaderComponent={() => <ListHeader total={totalMovieComments}/>}
                data={movieComments}
                onRefresh={refresh}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
        </View>
    )
}

const ListHeader = ({total}) => {
    return (
        <View style={{paddingTop: 15, paddingLeft: 15}}>
            <Text type="subheading" bold>全部评论（{total}）</Text>
        </View>
    )
}

export default AllCommentScreen
