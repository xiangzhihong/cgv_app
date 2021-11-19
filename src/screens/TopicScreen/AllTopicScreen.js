import React from 'react'
import {View, TouchableOpacity, FlatList, Text} from 'react-native'
import moment from 'moment'
import CommentItem from '../../common/CommentItem'
import apiRequest from "../../api";

const AllTopicScreen = ({navigation, route},) => {

    const {params = {}} = route
    const {movieId = {}, title, images} = params
    const [loading, setLoading] = React.useState(false)
    const [movieTopics, setMovieTopics] = React.useState([])
    const [totalTopics, setTotalTopics] = React.useState(0)
    const [topicPage, setTotalPage] = React.useState(0)

    React.useEffect(() => {
        getMovieTopicsList(movieId, 0)
    }, [])

    //获取电影话题
    async function getMovieTopicsList(movieId, number) {
        let baseUrl = '/product/surveys/ext/topiclist'
        let param = {
            productId: movieId,
            pageNumber: number,
            pageSize: 10
        };
        const res = await apiRequest.post(baseUrl, param)
        setMovieTopics(res.content)
        setTotalTopics(res.totalElements)
        setTotalPage(res.totalPages)
    }

    const refresh = () => {
        setLoading(true)
        getMovieTopicsList(movieId, 0)
        setLoading(false)
    }

    const loadMore = () => {
        if (movieTopics.length === 0 || loading) return null
        if (movieTopics.length % ((topicPage + 1) * 10) > 0) return null
        getMovieTopicsList(movieId, topicPage + 1)
    }

    const goDetail = (item) => {
        navigation.navigate('PersonalTopicScreen', {title, ...item, images})
    }

    const renderItem = ({item, index}) => {
        const isLast = movieTopics.length - 1 === index
        const {nickname = '', productReview = '', postedDateTime} = item
        const date = moment(postedDateTime).format('YYYY-MM-DD')
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => goDetail(item)} key={index}>
                <CommentItem
                    style={{paddingLeft: 15}}
                    isLast={isLast}
                    key={index.toString()}
                    date={date}
                    showComment
                    commentNumber={item.responseCnt}
                    title={item.surveyName}
                />
            </TouchableOpacity>
        )
    }

    return (
        <View style={{backgroundColor: '#fff'}}>
            <FlatList
                onEndReached={loadMore}
                onEndReachedThreshold={0.1}
                refreshing={loading}
                onRefresh={refresh}
                ListHeaderComponent={() => <ListHeader total={totalTopics}/>}
                data={movieTopics}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}/>
        </View>
    )
}

const ListHeader = ({total}) => {
    return (
        <View style={{paddingTop: 15, paddingLeft: 15}}>
            <Text type="subheading" bold>全部话题（{total}）</Text>
        </View>
    )
}

export default AllTopicScreen;
