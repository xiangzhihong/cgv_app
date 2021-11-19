import React from 'react'
import {View, StyleSheet, Text, ScrollView, Image, FlatList, Animated, Platform, Keyboard, Easing} from 'react-native'
import moment from 'moment'
import InputBar from '../../common/InputBar'
import CommentItem from '../../common/CommentItem'
import Empty from '../../common/Empty'
import {tools} from '../../utils'
import apiRequest from "../../api";

const animate = new Animated.Value(0)
let inputRef
let inputValue = ''

const PersonalTopicScreen = ({route,movieTopics, navigation}) => {
    let keyboardWillShowListener = null
    let keyboardWillHideListener = null
    const {params = {}} = route
    const {productId, movieId, id} = params
    const [page, setPage] = React.useState(0)
    const [reply, setReply] = React.useState([])
    const [detail, setDetail] = React.useState({})
    const [loading, setLoading] = React.useState(false)
    const [status, setStatus] = React.useState('LOADING')
    const [hasMore, setHasMore] = React.useState(false)
    const [keyboardHeight, setKeyBoardHeight] = React.useState(0)
    const [publishing, setPublishing] = React.useState(false)

    React.useEffect(() => {
        Platform.OS === 'ios' && willShow()
        Platform.OS === 'ios' && willHide()
        getCommentDetail()
        return () => {
            Platform.OS === 'ios' && willRemove()
        }
    }, [])


    const willShow = () => {
        keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', (e) => {
            console.log(e)
            setKeyBoardHeight(e.endCoordinates.height)
            Animated.timing(animate, {
                duration: e.duration,
                toValue: 1,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease),
            }).start()
        })
    }

    const willHide = () => {
        keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', (e) => {
            console.log(e)
            Animated.timing(animate, {
                duration: e.duration,
                toValue: 0,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease),
            }).start()
        })
    }


    const willRemove = () => {
        keyboardWillShowListener && keyboardWillShowListener.remove()
        keyboardWillHideListener && keyboardWillHideListener.remove()
    }

    const getCommentDetail = async (pageNumber, loadMores = false) => {
        if (!loadMores) {
            setLoading(true)
        }
        let baseUrl = '/product/surveys/ext/getTopicInfo'
        let param = {
            id: id,
            pageNumber: pageNumber,
            pageSize: 10,
        };
        const res = await apiRequest.post(baseUrl, param)
        if (res != null) {
            setDetail(res)
            const {surveyResponses = {}} = res
            if (surveyResponses) {
                const {content = []} = surveyResponses
                setHasMore(content.length === 10)
                if (content.length === 10) {
                    setPage(page + 1)
                }
                if (loadMores) {
                    setReply(reply.concat(content))
                } else {
                    setReply(content)
                }
            }
        } else {
            tools.Toast.toast('获取评论失败，请稍后再试！', 1)
        }
    }

    const loadMore = () => {
        if (loading || reply.length === 0) return null
        if (!hasMore) return null
        getCommentDetail(page, true)
    }

    const onPraisePress = async (e) => {
        //点赞、取消点赞
    }

    const onSubmit = async () => {
        if (!inputValue.trim()) return null
        setPublishing(true)
        tools.Toast.toast('发表成功', 1)
        setPublishing(false)
    }

    const renderItem = ({item}) => {
        const targetDate = moment(item.responseDate).format('YYYY-MM-DD')
        const {myLike = {}, likeCnt} = item
        const {productLike = '0'} = myLike || {}
        return (
            <View>
                <CommentItem
                    contentStyle={{marginTop: 10}}
                    style={{marginTop: 0, paddingTop: 18, paddingLeft: 15}}
                    avatarStyle={{marginRight: 10}}
                    name={item.nickname}
                    date={targetDate}
                    showPraise
                    showReport
                    onReportPress={report}
                    data={item}
                    praiseNumber={likeCnt}
                    isPraised={productLike === '1'}
                    onPraisePress={onPraisePress}
                    likeCnt={item?.likeCnt}
                    showComment={false}
                    avatar={tools.getImage(item?.pic)}
                    content={item.generalFeedback}
                />
            </View>

        )
    }

    return (
        <View>
            <View style={{flex: 1}}>
                <FlatList
                    onEndReachedThreshold={0.1}
                    onEndReached={loadMore}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={() => reply.length === 0 ?
                        <View style={{height: 300}}><Empty title="暂无话题留言~"/></View> : null}
                    ListHeaderComponent={() => {
                        return (
                            <ListHeader
                                detail={detail}
                                shareImg={detail?.shareImage}
                                avatar={detail?.pic}
                                name={detail?.surveyName}
                                date={detail?.postedDateTime}
                                description={detail?.description}
                                total={detail?.surveyResponses?.totalElements}
                            />
                        )
                    }
                    }
                    data={reply}
                />
            </View>
            <InputBar
                returnKeyType='send'
                assignRef={e => inputRef = e}
                onSubmit={onSubmit}
                animatedValue={animate}
                onChangeText={(e) => inputValue = e}
                keyboardHeight={keyboardHeight}
            />
        </View>
    )
}

const ListHeader = (
    {
        avatar,
        shareImg,
        description,
        name,
        total = 0,
        date,
    },
) => {
    const targetDate = moment(date).format('YYYY-MM-DD')
    console.log(shareImg.split(','))

    return (
        <View>
            <CommentItem
                style={{backgroundColor: '#fff', marginTop: 0, paddingTop: 18, paddingLeft: 15}}
                isLast
                titleBold
                contentStyle={{marginTop: 10}}
                avatarStyle={{marginRight: 10}}
                title={name}
                date={targetDate}
                isReverse
                showComment={false}
                showTriangle
                renderOther={() => {
                    return (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{flexDirection: 'row'}}>
                                {
                                    shareImg.split(',').map((item, index) =>
                                        <View style={styles.still}>
                                            <Image
                                                key={index.toString()}
                                                source={{uri: tools.getImage(item, false)}}
                                                style={{
                                                    marginRight: 8,
                                                    width: 150,
                                                    height: 90
                                                }}/>
                                        </View>
                                    )
                                }
                            </View>
                        </ScrollView>
                    )
                }}
                avatar={tools.getImage(avatar)}
                content={description}
            />
            <View style={{paddingLeft: 15, marginTop: 15}}>
                <Text type="subheading" bold>全部评论（{total}）</Text>
            </View>
        </View>
    )
}

const report = async (data) => {

}

const styles = StyleSheet.create({
    still: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
})


export default PersonalTopicScreen
