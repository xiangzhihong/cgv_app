import React from 'react'
import {View, StyleSheet, Text, Platform, Keyboard, FlatList, Animated, Easing} from 'react-native'
import moment from 'moment'
import CommentItem from '../../common/CommentItem'
import Empty from '../../common/Empty'
import InputBar from '../../common/InputBar'
import {bizstream} from '../../bizstream'
import {tools} from '../../utils'

const animate = new Animated.Value(0)
let inputRef
let inputValue = ''
const PersonalCommentScreen = ({
        route,
        navigation,
        movieComments,
        totalMovieComments,
        commentPage,
        isLogin,
    },
) => {
    let keyboardWillShowListener = null
    let keyboardWillHideListener = null
    const {params = {}} = route
    const {productId, id} = params
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
        getCommentDetail(0)
        return () => {
            Platform.OS === 'ios' && willRemove()
        }
    }, [])


    const willShow = () => {
        keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', (e) => {
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
        try {
            if (!loadMores) {
                setLoading(true)
            }
            const res = await bizstream.customer.getCommentDetail(id, productId, pageNumber)
            if (res.code === 200) {
                const {data = {}} = res
                setDetail(data)
                const {productReplyEntitys = {}} = data
                const {content = []} = productReplyEntitys
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
        } catch (e) {
            console.log(e)
        } finally {
            setStatus('SUCCESS')
            setLoading(false)
        }
    }

    const loadMore = () => {
        if (loading || reply.length === 0) return null
        if (!hasMore) return null
        getCommentDetail(page, true)
    }

    const onPraisePress = async (e) => {
        //点赞
    }

    const onSubmit = async () => {
        if (!isLogin) {
            return navigation.navigate('MyModal', {screen: 'LoginScreen'})
        }
        if (!inputValue.trim()) {
            tools.Toast.toast('发表内容不能为空', 1)
            return null
        }
        if (inputValue.trim().length > 50) {
            tools.Toast.toast('发表内容不能大于50个字', 1)
            return null
        }
        // console.log(inputValue, inputRef, id)
        //setLoading(true)
        setPublishing(false)
    }

    const renderItem = ({item, index}) => {
        const targetDate = moment(item.postedDateTime).format('YYYY-MM-DD')
        return (
            <View style={{paddingHorizontal: 15}}>
                <CommentItem
                    contentStyle={{marginTop: 10}}
                    style={{marginTop: 0, paddingTop: 18, paddingLeft: 15}}
                    avatarStyle={{marginRight: 10}}
                    name={item.nickname}
                    likeCnt={item.likeCnt}
                    date={targetDate}
                    showComment={false}
                    avatar={tools.getImage(item.pic)}
                    content={item.replyText}
                />
            </View>
        )
    }

    return (
        <View style={{flex: 1}}>
            <FlatList
                renderItem={renderItem}
                onEndReachedThreshold={0.1}
                onEndReached={loadMore}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={() => reply.length === 0 ?
                    <View style={{height: 300}}><Empty title="暂无留言~"/></View> : null}
                ListHeaderComponent={() => {
                    const {myLike = {}} = detail
                    const {productLike = '0'} = myLike || {}
                    return (
                        <ListHeader
                            detail={detail}
                            onPraisePress={onPraisePress}
                            likeCnt={detail?.likeCnt}
                            avatar={detail?.pic}
                            isPraised={productLike === '1'}
                            total={detail?.productReplyEntitys?.totalElements}
                            name={detail?.nickname}
                            date={detail?.postedDateTime}
                            content={detail?.productReview}
                        />
                    )
                }

                }
                data={reply}
            />
            <InputBar
                loading={publishing}
                buttonText="留言"
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

const ListHeader = ({
                        name,
                        date,
                        content,
                        avatar,
                        likeCnt,
                        total = 0,
                        isPraised,
                        detail,
                        onPraisePress
                    },
) => {

    const targetDate = moment(date).format('YYYY-MM-DD')
    return (
        <View>
            <CommentItem
                style={{backgroundColor: '#fff', marginTop: 0, paddingTop: 18, paddingLeft: 15}}
                isLast
                contentStyle={{marginTop: 10}}
                avatarStyle={{marginRight: 10}}
                name={name}
                date={targetDate}
                showPraise
                showReport
                isPraised={isPraised}
                onPraisePress={onPraisePress}
                showComment={false}
                praiseNumber={likeCnt}
                showTriangle
                data={detail}
                avatar={tools.getImage(avatar)}
                content={content}
                onReportPress={report}
                productRating={detail?.productRating}
                isShowProductRating={true}
            />
            <View style={{paddingLeft: 15, marginTop: 15}}>
                <Text type="subheading" bold>最新留言（{total}）</Text>
            </View>
        </View>
    )
}

const report = async (data) => {

}

export default PersonalCommentScreen
